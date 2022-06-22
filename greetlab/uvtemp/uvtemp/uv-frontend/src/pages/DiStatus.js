import React,{useState,useEffect} from 'react'
import { Card, Button, Form } from "react-bootstrap"
import AppLayout from '../components/AppLayout'
import Axios from "axios"
import config from "../config/config"
const DiStatus = () => {
      const[data,dataUpdate] = useState([{
       username:"",
   }])
   useEffect(() => {
      const url = `${config.BASE_API_URL}client/getClientList`
      const data = {}
      const configs = {headers: { authorization: localStorage.getItem('token')}}
      console.log('form submit', url, data,configs)
      Axios.get(url,configs)
      .then((res) => {
          if(res.data.code == 200) {
              
          dataUpdate(res.data.responseData)
          }
         console.log(res.data.responseData)
      })
      .catch((error) => {
          console.log(error, "err")
      })
    }, [])

    return (
        <AppLayout>
            <h2 className="heading">DiStatus</h2>
              <thead >
            
             <tr>
                 <th className="table">username</th>
             </tr>
             <tr>
                <th className="table">Email</th>
            </tr>
             <tr>
                <th className="table">password</th>
            </tr>
                </thead>
            <tbody>
                {
                    data.length > 0 && data.map((item,index) => {
                      return(
                          <tr key={index}>
                          {/* <td>{item.id}</td> */}
                            {/* <td>{item.clientId}</td> 
                             <td>{item._clientEmail}</td>  
                           <td>{item.clientName}</td>   */}
                            {/* <td>{item.addresses}</td>  */}
                          </tr>
                      )
                    })
                     }
            </tbody>

        </AppLayout>
    )
}
export default DiStatus;