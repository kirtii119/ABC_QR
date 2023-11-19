// import { Scanner } from "./Scanner";
import { useState } from 'react';
import {QrScanner} from '@yudiel/react-qr-scanner';
import axios from "axios"

export const Verify = () => {
    let [scan, setScan] = useState(true);
    let [data, setData] = useState('');
    let [name, setName] = useState('');
    let [id, setId] = useState('');
    let [flag, setFlag] = useState('');
    let [mssg, setMssg] = useState('');
    return (
        <div>
        <div style={{'width':'40%' , 'align':'center', 'display':'flex', 'flex-direction':'row', 'height':'40%', 'flexWrap':'nowrap'}}>
            {scan && 
            // <Scanner setScan = {setScan}/> 
            <QrScanner
            onDecode={async(result) => {
            setScan(false);
            setData(result);
            console.log('x', result)

            axios.put("/api/markAttnd", {"id":String(result)})
            .then((response) => {
            console.log(response)
            console.log(response.status)
            if(response.status === 200){
                setName(response.data.userData.name)
                setId(response.data.userData.regno)
                setFlag(response.data.userData.flag)
                setMssg(response.data.mssg)
                
            }
            else {
                setName(response.data.userData.name)
                setId(response.data.userData.regno)
                setFlag(response.data.userData.flag)
                setMssg(response.data.message || response.data.mssg)
            }
            
            }).catch((err)=>{
                //!handle this error
                console.log(err)
                setName('')
                setId('')
                setFlag('')
                if(err.response.data.mssg) {
                    setMssg(err.response.data.mssg)
                }
               

            })




            // let responseData = await markAttendance('XYZ789')
            // console.log(responseData)
            // console.log(responseData.status)
            // if(responseData.status === 200){
            //     setName(responseData.data.userData.name)
            //     setId(responseData.data.userData.regno)
            //     setFlag(responseData.data.userData.flag)
            // }
            // else {
            //     setErr(responseData.data.message)
            // }
            // setScan(false);


           


        }}
          onError={(error) => console.log(error?.message)}
          constraints={ {facingMode: 'environment'}}
  
      />


    }

{
                !scan && <button style={
                   
                    {
                    'display': 'inline-block',
                    'align': 'center',
                    'outline': 'none',
                    'cursor': 'pointer',
                    'font-size': '16px',
                    'line-height': '20px',
                    'font-weight': '600',
                   ' border-radius': '8px',
                    'padding': '14px 24px',
                    // 'margin': '30% 100%',
                    'border': 'none', 
                    'background': 'linear-gradient(to right, rgb(230, 30, 77) 0%, rgb(227, 28, 95) 50%, rgb(215, 4, 102) 100%)',
                    'color': '#fff'}
                } onClick={() => setScan(true)}>Start Scan</button>
            }
            
        </div>
        <div style={{'width':'50%', 'display':'flex', 'flex-direction':'row', 'height':'60%'}}>
        <div>
        <h4>{data}</h4>
        <p><b>Name : </b> {name}</p>
        <p><b>Id : </b> {id}</p>
        <p><b>Attendance : </b> {flag}</p>
        <p><b>Message : </b> {mssg}</p>
        </div>
            
        
        </div>

        </div>
        
    );
}