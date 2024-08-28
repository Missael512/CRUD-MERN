import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
export const EditTask = ({ id, dbinfo, setShowEditTask,showinfo }) => {

  const [editTask, setEditTask] = useState("");
  const [dueEdit, setdueEdit] = useState("");
  const [importanceEdit, setimportanceEdit] = useState("Low");




  const documentData = dbinfo.find(doc => doc._id === id);

  if (!documentData) {
    return <div>Document not found</div>;
  }
  const handleSendInfotoEdit = async()=>{
    try {
        const response = await axios.put(`http://localhost:3030/edit/${id}`, {
          task: editTask,
          due: dueEdit,
          importance: importanceEdit,
        });
  
        console.log('Task updated successfully:', response.data);
        showinfo()
        setShowEditTask(false)
      } catch (error) {
        console.error('Error updating task:', error);
      }
  }
  return (
    <>
      <table border={"solid"}>
        <thead className="thead-dark">
          <tr>
            <th scope="col">Task</th>
            <th scope="col">Due</th>
            <th scope="col">Importance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{documentData.task}</td>
            <td>{documentData.due}</td>
            <td>{documentData.importance}</td>
          </tr>
          <tr>
            <td>
              <input
                placeholder="New task"
                value={editTask}
                onChange={(e) => {
                  setEditTask(e.target.value);
                }}
              />
            </td>
            <td>
              <input type="date" onChange={(e) => {
                  setdueEdit(e.target.value);
                }}/>
            </td>
            <td>
              <select
                name="importance"
                value={importanceEdit}
                id="importance"
                onChange={(e) => {
                  setimportanceEdit(e.target.value);
                }}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleSendInfotoEdit}>Edit!</button>
    </>
  );
};
