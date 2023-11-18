// import { Scanner } from "./Scanner";
import { useState } from 'react';
import {QrScanner} from '@yudiel/react-qr-scanner';
import axios from "axios"

const markAttendance = (id) =>{
    let responseMain;

    axios.put("/api/markAttnd", {"id":id})
    .then((response) => {
      responseMain = response;
      console.log(response)
      
    }).catch((err)=>{
        //!handle this error
        console.log(err)
    })

    return(responseMain)



    // fetch("/api/markattnd", {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ id }),
    //   })
    //     .then((response) => {
    //         console.log(response)
    //       if (!response.ok) {
    //         throw new Error("Network response was not ok");
    //       }
    //       return response.json();
    //     })
    //     .then((data) => {
    //       return data;
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //       throw error; // Rethrow the error so it can be caught by the caller
    //     });

}

export const Verify = () => {
    let [scan, setScan] = useState(true);
    let [data, setData] = useState('');
    let [name, setName] = useState('');
    let [id, setId] = useState('');
    let [flag, setFlag] = useState('');
    let [mssg, setMssg] = useState('');
    let [err, setErr] = useState('');
    return (
        <div>
        <div style={{'width':'40%' , 'align':'center', 'display':'flex', 'flex-direction':'row'}}>
            {scan && 
            // <Scanner setScan = {setScan}/> 
            <QrScanner
            onDecode={async(result) => {
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
                setErr(response.data.message)
            }
            setScan(false);



            
            }).catch((err)=>{
                //!handle this error
                console.log(err)
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

    <div>
    <h3>{data}</h3>
    <h5>{err}</h5>
    <h5>Name : {name}</h5>
    <h5>Id : {id}</h5>
    <h5>Attendance : {flag}</h5>
    <h5>Message : {mssg}</h5>
    </div>
            
        </div>
        <div style={{'width':'50%', 'display':'flex', 'flex-direction':'row'}}>
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
                    'margin': '30% 100%',
                    'border': 'none', 
                    'background': 'linear-gradient(to right, rgb(230, 30, 77) 0%, rgb(227, 28, 95) 50%, rgb(215, 4, 102) 100%)',
                    'color': '#fff'}
                } onClick={() => setScan(true)}>Start Scan</button>
            }
        
        </div>

        </div>
        
    );
}