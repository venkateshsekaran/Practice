const cronJobs = require('cron').CronJob
class  CronJob{
    constructor(){ 
        let jobs = new cronJobs('* * * * * *',async function(){
            await require('./controllers/controllerSqsController').getDataForSqs();
        },null,true,'America/Los_Angeles')
        jobs.start()
    }
}

module.exports = new CronJob();
 