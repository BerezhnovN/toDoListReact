import React, { useState, useEffect } from "react";
import axios from "axios";
import Task from "./Task";
import Edition from "./Edition";
import "./App.scss";
const link = "http://localhost:8000";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  

  useEffect(async () => {
    await axios.get(`${link}/allTasks`).then((res) => {
      setTasks(res.data.data);
    });
  });

  const changeCheckbox = async (id, hasCheck) => {
    console.log(id);
    console.log(hasCheck);
    await axios
      .patch(`${link}/updateTask`, {
        _id: id,
        isCheck: !hasCheck,
      })
      .then((res) => {
        if (res.status !== 200) {
          alert("Ошибка!");
        } else {
          const newTasks = tasks.map((value) => {
            const newValue = { ...value };
            if (newValue._id === id) {
              newValue.isCheck = !newValue.isCheck;
            }
            return newValue;
          });
          setTasks(newTasks);
        }
      });
  };

  const addNewTask = async () => {
    await axios
      .post(`${link}/createTask`, {
        text: text,
        isCheck: false,
      })
      .then((res) => {
        setText("");
        if (res.status !== 200) {
          alert("Ошибка!", res.status);
        } else {
          const updateTask = [...tasks, res.data];
          setTasks(updateTask);
        }
      });
  };

  const deleteTask = async (id) => {
    await axios.delete(`${link}/deleteTask?id=${id}`).then((res) => {
      if (res.status !== 200) {
        alert("Ошибка", res.status);
      } else {
        const deleteTask = tasks.filter((task) => task._id !== id);
        setTasks(deleteTask);
      }
    });
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => addNewTask()}>Add new</button>
      <div>
        {tasks
          .sort((a, b) => {
            if (a.isCheck === b.isCheck) return 0;
            return a.isCheck > b.isCheck ? 1 : -1;
          })
          .map((task, id) => (
            <div key={`task-${id}`}>
              <Task
                task={task}
                deleteTask={deleteTask}
                changeCheckbox={changeCheckbox}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
