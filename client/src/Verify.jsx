// import { Scanner } from "./Scanner";
import { useState } from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";
import axios from "axios";
import "./Verify.css";

export const Verify = () => {
  let [scan, setScan] = useState(true);
  let [data, setData] = useState("");
  let [name, setName] = useState("");
  let [id, setId] = useState("");
  let [flag, setFlag] = useState("");
  let [mssg, setMssg] = useState("");
  return (
    <div className="div-verify-parent">
      {/* <div className={"main-div ".concat(scan ? "" : "scan-off")}> */}
      <div className="main-div">
        <div className="main-div-overlay">
          {!scan && (
            <button
            className="scan-button-main"
              onClick={() => setScan(true)}
            >
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
                } else {
                  setName(response.data.userData.name);
                  setId(response.data.userData.regno);
                  setFlag(response.data.userData.flag);
                  setMssg(response.data.message || response.data.mssg);
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
                }
              });
          }}
          onError={(error) => console.log(error?.message)}
          constraints={{ facingMode: "environment" }}
        />
      </div>
      <div className="data-div">
        <div>
          <h4>{data}</h4>
          <p>
            <b>Name : </b> {name}
          </p>
          <p>
            <b>Id : </b> {id}
          </p>
          <p>
            <b>Attendance : </b> {flag}
          </p>
          <p>
            <b>Message : </b> {mssg}
          </p>
        </div>
      </div>
    </div>
  );
};
