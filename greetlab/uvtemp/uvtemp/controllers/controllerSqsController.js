const GatewayModel = require('../models/gatewayModel')
const ControllerDataModel = require('../models/controllerDataModel')
const AWS = require('aws-sdk');
const fs = require('fs')
AWS.config.update({
        apiVersion: "2012-11-05",
        accessKeyId: process.env.AWS_ACCESS_KEY,
        accessSecretKey: process.env.AWS_SECRET_KEY,
        region: "ap-south-1"
});
const moment = require('moment')
const sqs = new AWS.SQS({ apiVersion: '2012-11-05'});
class ControllerSqsController {
        async getDataForSqs() {
                try {
                        let sqsUrl = await GatewayModel.find({}).lean()
                        if (sqsUrl) {
                                for (let i = 0; i < sqsUrl.length; i++) {
                                        const sqsData = sqsUrl[i];
                                        for (let i = 0; i < sqsData.sqsStatusUrls.length; i++) {
                                                const sqsUrls = sqsData.sqsStatusUrls[i];
                                                {
                                                        var params = {
                                                                AttributeNames: [
                                                                        "SentTimestamp",
                                                                        "ApproximateFirstReceiveTimestamp",
                                                                        "All"
                                                                ],
                                                                MaxNumberOfMessages: sqsData.controllerIds.length,
                                                                MessageAttributeNames: [
                                                                        "All"
                                                                ],
                                                                QueueUrl: sqsUrls,
                                                                VisibilityTimeout: 20,
                                                                WaitTimeSeconds: 0
                                                        };
                                                        let sqsAllData = []
        
                                                        sqs.receiveMessage(params, async function (err, data) {
                                                                if (err) {
                                                                        // console.log("Receive Error", err);
                                                                }
                                                                else if (data.hasOwnProperty('Messages')) {
                                                                        var deleteParams = {
                                                                                QueueUrl: sqsUrls,
                                                                                ReceiptHandle: data.Messages[0].ReceiptHandle
                                                                        };
                                                                        // sqs.deleteMessage(deleteParams, function (err, data) {
                                                                        //         if (err) {
                                                                        //                 console.log("Delete Error", err);
                                                                        //         } else {
                                                                        //                 //   console.log("Message Deleted", data);
                                                                        //         }
                                                                        // });
                                                                        // console.log(data.Messages.length); 
                                                                        for (const message of data.Messages) {
                                                                                let packets = message.Body.replace("<", "").replace(">", "").split('|').filter((p, i) => [0, 1].indexOf(i) == -1) 
                                                                                // here get the data for sqs packets
                                                                                let sqsObject = {
                                                                                                controllerId: packets[0],
                                                                                                lamps: packets[1],
                                                                                                uvSensorValue: packets[2],
                                                                                                // airSpeedValue: packets[3],
                                                                                                scaleFactor: packets[3],
                                                                                                di: packets[4],
                                                                                                mode: packets[5] == 1 ? 'off' : packets[5] == 2 ? 'manual' : packets[5] == 3 ? 'auto' : '',
                                                                                                createdSqsDate: new Date(packets[6] * 1000)
                                                                                 }
                                                                                // let sqsObject = {
                                                                                //         controllerId: packets[0],
                                                                                //         lamps: packets[1],
                                                                                //         uvSensorValue: packets[2],
                                                                                //         airSpeedValue: packets[3],
                                                                                //         scaleFactor: packets[4],
                                                                                //         di: packets[5],
                                                                                //         mode: packets[6] == 1 ? 'off' : packets[6] == 2 ? 'manual' : packets[6] == 3 ? 'auto' : '',
                                                                                //         createdSqsDate: new Date(packets[7] * 1000)
                                                                                // }
                                                                                sqsAllData.push(sqsObject)
                                                                        }
        
                                                                }      
                                                                sqsAllData = sqsAllData.sort(function (a, b) {
                                                                        return moment(a.createdSqsDate).format('h:mm s').localeCompare(moment(b.createdSqsDate).format('h:mm s'))
                                                                })
                                                                for (const sqsPackets of sqsAllData) {
                                                                        let controllerData = await ControllerDataModel.findOne({ controllerId: sqsPackets.controllerId })
                                                                        if (sqsPackets.lamps) {
                                                                                let number = parseInt(sqsPackets.lamps).toString(2).split("").reverse()
                                                                                for (let index = 0; index <= 8 - number.length; index++) {
                                                                                       number.push('0')
                                                                                }
                                                                                let lamps = []
                                                                                number.forEach((p, i) => {
                                                                                        let lampsData = null;
                                                                                        if (controllerData && controllerData.lamps.length) lampsData = controllerData.lamps.find(p => p.lampName == `lamp ${i + 1}`)
                                                                                        let runningHours = 0
                                                                                        let sqsTime = sqsPackets.createdSqsDate
                                                                                    
                                                                                        if (!lampsData && p == 1) {
                                                                                                runningHours = 1
                                                                                                console.log('first Time', runningHours)
                                                                                        } else if (lampsData && lampsData.runningHours >= 0 && p == 1) {
                                                                                                runningHours = 4 * sqsData.controllerIds.length + lampsData.runningHours
                                                                                                console.log("running hours", runningHours);
                                                                                        } else if (p == 0 && lampsData && lampsData.runningHours > 0) {
                                                                                                runningHours = lampsData.runningHours
                                                                                                console.log('stop  Time stop condition', runningHours)
                                                                                        } else if (lampsData && lampsData.runningHours>0 && p == 1 && lampsData.oFFTimeOfLamp) {
                                                                                                runningHours = lampsData.runningHours + 1
                                                                                                console.log('restart condition lamp', runningHours);
                                                                                        }
                                                                                       
                                                                                        if (!lampsData) {
                                                                                                
                                                                                                let lampsObject ={
                                                                                                                'lampName': `lamp ${i + 1}`,
                                                                                                                'lampStatus': p == 1 ? 'on' : 'off',
                                                                                                                'onTimeOfLamp': p == 1 ? sqsTime : p == 0 ? sqsTime : lampsData.onTimeOfLamp,
                                                                                                                'oFFTimeOfLamp': p == 0 ? sqsTime : null,
                                                                                                                'runningHours': runningHours// here condition manged for running hour.increasing a one second when the lamps connected
                                                                                                }
                                                                                            
                                                                                               if(!controllerData) lamps.push(lampsObject) 
                                                                                               else if(controllerData && controllerData.lamps)   controllerData.lamps.push(lampsObject)
                                                                                              
                                                                                               
                                                                                        } else {
                                                                                               let index = controllerData.lamps.findIndex((element,index) => { if(element.lampName ==`lamp ${i + 1}`) { return true }})
                                                                                               controllerData.lamps[index].lampName = `lamp ${i + 1}`,
                                                                                               controllerData.lamps[index].lampStatus= p == 1 ? 'on' : 'off',
                                                                                               controllerData.lamps[index].onTimeOfLamp=   p == 1 ? sqsTime : p == 0 ? sqsTime : lampsData.onTimeOfLamp,
                                                                                               controllerData.lamps[index].oFFTimeOfLamp =  p == 0 ? sqsTime : lampsData && lampsData.oFFTimeOfLamp ? lampsData.oFFTimeOfLamp:null ,
                                                                                               controllerData.lamps[index].runningHours= runningHours
                                                                                        }
                                                                                  })
                                                                                sqsPackets.lamps = controllerData && controllerData.lamps ? controllerData.lamps : lamps
                                                                        }
                                                                        if (sqsPackets.di) {
                                                                                let number = sqsPackets.di == 0 ? [] : parseInt(sqsPackets.di).toString(2).split("").reverse()
                                                                                let di = []
                                                                                let diData = {}
                                                                                number.forEach((p, i) => {
                                                                                        if (controllerData && controllerData.lamps.length) diData = controllerData.lamps.find(p => p.diName == `di ${i + 1}`)
                                                                                        if(!diData) {
                                                                                                di.push({
                                                                                                        'diName': `di ${i + 1}`,
                                                                                                        'diStatus': p == 1 ? 'on' : 'off',
                                                                                                })
                                                                                                //here stored Di values
                                                                                        }else {
                                                                                                let index = controllerData.di.findIndex((element ,index) => {if(element.diName ===`lamp ${i + 1}`) return index})
                                                                                                controllerData.di[index].diName =  `di ${i + 1}`,
                                                                                                controllerData.di[index].diStatus =  p == 1 ? 'on' : 'off'
                                                                                        }
                                                                                      
                                                                                })
                                                                                sqsPackets.di = controllerData && controllerData.di ? controllerData.di : di
                                                                        }
                                                                        await ControllerDataModel.updateOne({ controllerId: sqsPackets.controllerId }, { $set: sqsPackets }, { upsert: true })
                                                                        await new ControllerSqsController().getRealTimeJSReport(sqsPackets.controllerId)
        
                                                                }
                                                        })
                                                }
                                                 
                                         }
                                       
                                }
                        }

                } catch (error) {
                        console.log(error);
                }
        }

        async getRealTimeJSReport(controllerId) {
                try {
                        let controllerData = await ControllerDataModel.findOne({ controllerId: controllerId })
                        // console.log(controllerData)
                        let readFilePath = './uploads/simreport.html'
                        let writeFilePath = `./uploads/${'simreport' + controllerId}.html`
                //        if(fs.existsSync(writeFilePath) ) {
                //                console.log("hello",writeFilePath);
                //                 fs.unlinkSync(writeFilePath)
                //         } 
                               
                        
                        if (controllerData) {
                                fs.readFile(readFilePath, function (error, line) {
                                        if (error) console.log(error)
                                        line = line.toString()
                                        if (line.includes('text_airflowspeed') && line.includes('Airflow Speed')) {
                                        line = line.replace("value=5", `value=${controllerData.airSpeedValue ?controllerData.airSpeedValue :5}`)
                                        // console.log(line);
                                        } 
                                        if (line.includes('text_scalefactor') && line.includes('Scale Factor')) line = line.replace("value=1.0", `value=${controllerData.scaleFactor}`)
                                        var stream = fs.createWriteStream(writeFilePath, { 'flags': 'a' });
                                        stream.once('open', function (fd) {
                                                stream.write(line + "\r\n");
                                        });
                                })
                        }

                } catch (error) {
                        console.log(error);
                }
        }
        async getRealTimeReportUrlForControllerId(request, response) {
                try {
                        let path = `uploads/${'simreport' + request.body.controllerId}.html`
                        return response.status(200).send({ code: 200, path: path })
                } catch (error) {
                        console.log(error)
                }
        }
        async sendCommandsOfLamps(request, response) {
                try {
                        // request.body.controllerId = 1000
                        let switchOfLamps = request.body.switchOfLamps == true ? 1 : 0
                        // console.log(request.body);
                        let sqsData = await GatewayModel.findOne({ 'controllerIds.controllerId': request.body.controllerId  }, { 'controllerIds.$': 1, sqsCommandUrls: 1,sqsStatusUrls:1 }).lean()
                        let sqsUrl = null
                        sqsData.sqsCommandUrls.forEach(p => {
                                let urls = p.split('/')
                                let queueName = sqsData.controllerIds.find(p=>p.controllerId==request.body.controllerId)
                                if(urls[urls.length-1] == queueName.queueName) {
                                        sqsUrl = p
                                }
                        
                        })
                        let value = request.body.controllerId > 999 ? 11 : request.body.controllerId > 99 ? 10 : request.body.controllerId > 9 ? 9 : 8
                        // if(sqsData && sqsData.length) {
                        let packets = `<${value}|SET|${request.body.controllerId}|${switchOfLamps}>`
                        let params = {
                                // Remove DelaySeconds parameter and value for FIFO queues
                                DelaySeconds: 10,
                                MessageAttributes: {
                                        "Title": {
                                                DataType: "String",
                                                StringValue: "The Whistler"
                                        },
                                        "Author": {
                                                DataType: "String",
                                                StringValue: "John Grisham"
                                        },
                                        "WeeksOn": {
                                                DataType: "Number",
                                                StringValue: "6"
                                        }
                                },
                                MessageBody: packets,
                                // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
                                // MessageGroupId: "Group1",  // Required for FIFO queues
                                QueueUrl: sqsUrl
                        };
                        sqs.sendMessage(params, function (err, data) {
                                if (err) {
                                        console.log("Error", err);
                                } else {
                                        return response.status(200).send({ code: 200, message: `lamp ${request.body.switchOfLamps} successfully` })
                                }
                        });

                        // }

                } catch (error) {
                        console.log(error);
                }
        }

        async resetTheLamps(request, response) {
                try {
                        await ControllerDataModel.findOneAndUpdate({ controllerId: request.body.controllerId, 'lamps.lampName': request.body.lampName },
                                { $set: { 'lamps.$.runningHours': 0 } })
                        return response.status(200).send({ code: 200, message: `${request.body.lampName} reset successfully ` })
                } catch (error) {
                        console.log(error)
                }
        }
        async getLampAndDi(request, response) {
                try {
                        let data = await ControllerDataModel.findOne({ controllerId: request.body.controllerId })
                        return response.status(200).send({ code: 200, responseJson: data ? data : null })
                } catch (error) {
                        console.log(error)
                }
        }

}
module.exports = new ControllerSqsController()


// 
// let path = './uploads/simreport.html'

// const lines =[]
// let line = fs.readFile(path,function(error,line) {
//    line  = line.toString()
//     if(line.includes('text_airflowspeed') && line.includes('Airflow Speed')) line =line.replace("value=5","value=12")
//     if(line.includes('text_scalefactor') && line.includes('Scale Factor')) line =line.replace("value=1","value=7")
//     var stream = fs.createWriteStream("./uploads/test3.html", {'flags': 'a'});
//         stream.once('open', function(fd) {
//           stream.write(line+"\r\n");
//         });
// })
// 
// // Set the region
// AWS.config.update({region: 'REGION'});

// // Create an SQS service object
// 

// var queueURL = "https://sqs.ap-south-1.amazonaws.com/138802260344/Test_Queue_Status";

// var params = {
//  AttributeNames: [
//     "SentTimestamp"
//  ],
//  MaxNumberOfMessages: 10,
//  MessageAttributeNames: [
//     "All"
//  ],
//  QueueUrl: queueURL,
//  VisibilityTimeout: 20,
//  WaitTimeSeconds: 0
// };

// sqs.receiveMessage(params, function(err, data) {
//   if (err) {
//     console.log("Receive Error", err);
//   } 
//   console.log(data);
//        if(data.hasOwnProperty('Messages')) {
//          for (const message of data.Messages) {
//           let packets =  message.Body.replace("<","").replace(">","").split('|').filter((p,i)=> [0,1].indexOf(i) ==-1)
//           if(packets.length) {
        //     let savingObject = {}
        //    for (let i = 0; i < packets.length; i++) {
        //      const element = packets[i];
        //       if(i == 0) savingObject['controllerId'] = element 
        //       if(i == 1)  {

        //       }
        //       if(i == 2) savingObject['sensorValue'] = element
        //       if(i == 3) savingObject['scaleFactor']  = element
        //       if(i == 4) savingObject['Di']  = element
        //       if(i==5) savingObject['mode'] = element == 1 ? 'off' : element == 2 ? 'manual' : element == 3 ? 'auto' : '' 
        //       if(i == 6) savingObject['createdSqsDate'] = new Date(element)          
//            }
//            console.log(savingObject,"hello");
//           }
//          }
//        }

// });
