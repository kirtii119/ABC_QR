// import { Scanner } from "./Scanner";
import { useState } from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";
import axios from "axios";
import "./Verify.css";
import Alert from "@mui/material/Alert";

export const Verify = () => {
  let [scan, setScan] = useState(true);
  let [data, setData] = useState("");
  let [name, setName] = useState("");
  let [id, setId] = useState("");
  let [flag, setFlag] = useState("");
  let [mssg, setMssg] = useState("");
  let [mssgType, setMssgType] = useState("info");
  const [cnt, setCnt] = useState(0);
  return (
    <div className="div-verify-parent">
      <div className="heading-verify-main">ABC Vishwa</div>
      <div className={"main-div ".concat(scan ? "" : "scan-off")}>
        {/* <div className="main-div"> */}
        <div className="main-div-overlay">
          {!scan && (
            <button className="scan-button-main" onClick={() => setScan(true)}>
              Start Scan
            </button>
          )}
        </div>
        <QrScanner
          className="qr-scanner-main"
          videoStyle={{ padding: 0 }}
          onDecode={async (result) => {
            if (!scan) return; // turn off decoding
            setScan(false);
            setTimeout(() => setScan(true), 8000); // turn on decoding after 2 seconds
            setData(result);
            console.log("x", result);

            axios
              .put("/api/markAttnd", { id: String(result) })
              .then((response) => {
                console.log(response);
                console.log(response.status);
                if (response.status === 200) {
                  setName(response.data.userData.name);
                  setId(response.data.userData.regno);
                  setFlag(response.data.userData.flag);
                  setMssg(response.data.mssg);
                  response.data.count && setCnt(response.data.count);
                  setMssgType("success");
                } else {
                  setName(response.data.userData.name);
                  setId(response.data.userData.regno);
                  setFlag(response.data.userData.flag);
                  setMssg(response.data.message || response.data.mssg);
                  setMssgType("error");
                }
              })
              .catch((err) => {
                //!handle this error
                console.log(err);
                setName("");
                setId("");
                setFlag("");
                if (err.response.data.mssg) {
                  setMssg(err.response.data.mssg);
                  setMssgType("error");
                }
              });
          }}
          onError={(error) => console.log(error?.message)}
          constraints={{ facingMode: "environment" }}
        />
      </div>

      <div className="data-div">
        {scan && (
          <h3>
            <center>SCAN QR</center>
          </h3>
        )}
        {!scan && (
          <div>
            <h4>{data}</h4>

            <Alert variant="filled" severity={mssgType}>
              {mssg}
            </Alert>
            <p>{name}</p>
            {/* <p>
           <b>Reg No.: </b> {id}
         </p> */}
            {/* <p>
           <b>Attendance : </b> {flag}
         </p> */}
          </div>
        )}
        <i style={{fontSize:"14px"}}>Total Admitted: {cnt}</i>
      </div>
    </div>
  );
};
