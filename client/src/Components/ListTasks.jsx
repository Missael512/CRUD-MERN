import { useState, useEffect } from "react";
import "../css/ListTask.css";
import axios from "axios";
import { EditTask } from "./EditTask";
import { Table, Container, Button } from "react-bootstrap";
export const ListTasks = () => {
  const [taskdata, setaskdata] = useState([]);
  const [showEditTask, setShowEditTask] = useState(false);
  const [id, setid] = useState("");
  const Trashicon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-trash"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="#fd0061"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 7l16 0" />
        <path d="M10 11l0 6" />
        <path d="M14 11l0 6" />
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
      </svg>
    );
  };

  const Editicon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-edit"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#00bfd8"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
        <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
        <path d="M16 5l3 3" />
      </svg>
    );
  };

  const handleGetinfo = async () => {
    try {
      // Realiza la solicitud y espera la respuesta
      const response = await axios.get("http://localhost:3030/getinfo");
      // Actualiza el estado con la respuesta
      setaskdata(response.data);
    } catch (error) {
      // Maneja el error
      console.log(error);
    }
  };

  const handleDeleteOne = (id) => {
    axios
      .delete(`http://localhost:3030/deleteone/${id}`)
      .then(() => {
        alert("Elemento borrado");
        handleGetinfo();
      })
      .catch((error) => {
        alert(`Error al borrar: ${error}`);
      });
  };

  useEffect(() => {
    handleGetinfo();
  }, []);
  const handleButtonClick = (id) => {
    setShowEditTask(true);
    setid(id);
  };

  return (
    <>
    {showEditTask && (
        <EditTask
          id={id}
          dbinfo={taskdata}
          setShowEditTask={setShowEditTask}
          showinfo={handleGetinfo}
        />
      )}
      <Container>
        <Table striped bordered hover responsive>
          <thead>
            <tr style={{ backgroundColor: "#343a40", color: "white" }}>
              <th scope="col">Task</th>
              <th scope="col">Due</th>
              <th scope="col">Importance</th>
              <th scope="col">Posted</th>
              <th scope="col">Delete</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            {taskdata.map((item, index) => (
              <tr key={index}>
                <td>{item.task}</td>
                <td>{item.due}</td>
                <td>{item.importance}</td>
                <td>{item.published}</td>
                <td>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      handleDeleteOne(item._id);
                    }}
                  >
                    <Trashicon />
                  </Button>
                </td>
                <td>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      handleButtonClick(item._id);
                    }}
                  >
                    <Editicon />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      
    </>
  );
};
