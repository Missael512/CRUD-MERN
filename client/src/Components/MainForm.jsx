import { useState,useEffect } from "react";
import axios, { Axios } from "axios";
export const MainForm = () => {
  const [task, settask] = useState("");
  const [due, setdue] = useState("");
  const [importance, setimportance] = useState("Low");
  
  const clearData = () => {
    settask("");
    setdue("");
    setimportance("Low");
  };
  const validationInfo = ()=>{
    if(task.length != 0 && due.length!=0){
        return true
    }
  }



  const handleSendInfo = () => {
    if(validationInfo()){
        axios
        .post("http://localhost:3030/add", { task, due, importance })
        .then((response) => {
          alert("Data sent successfully:", response.data);

          clearData();
        })
        .catch((error) => {
          alert("Error sending data:", error);
        });
    }else{
        alert("No info,check inputs")
    }
    
  };



  return (
    <>
      <label>Task</label>
      <input
        type="text"
        value={task}
        onChange={(e) => {
          settask(e.target.value);
        }}
      ></input>
      <br />
      <label>Due:</label>
      <input
        type="date"
        value={due}
        onChange={(e) => {
          setdue(e.target.value);
        }}
      ></input>
      <br />
      <label>Importance:</label>
      <select
        name="importance"
        value={importance}
        id="importance"
        onChange={(e) => {
          setimportance(e.target.value);
        }}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <br />
      <button onClick={handleSendInfo}>Send</button>
    </>
  );
};
