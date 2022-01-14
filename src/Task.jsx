import React, { useState } from "react";
import Edition from "./Edition";
import Delete from "./images/delete.png";
import Edit from "./images/edit.png";

const Task = ({ task, deleteTask, editTask, changeCheckbox }) => {
  const [windowEdit, setWindowEdit] = useState(false);
  const changeState = () => {
    setWindowEdit(!windowEdit);
  };
  return (
    <div>
      {!windowEdit ? (
        <>
          <input
            type="checkbox"
            checked={task.isCheck}
            onChange={() => changeCheckbox(task._id, task.isCheck)}
          />
          {task.isCheck ? (
            <span>{task.text}</span>
          ) : (
            <>
              <span>{task.text}</span>
              <img
                src={Edit}
                alt="Редактирование"
                onClick={() => changeState()}
              />
            </>
          )}
          <img
            src={Delete}
            alt="Удаление"
            onClick={() => deleteTask(task._id)}
          />
        </>
      ) : (
        <Edition task={task} changeState={changeState} />
      )}
    </div>
  );
};

export default Task;
