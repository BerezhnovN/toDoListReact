import React, {useState} from "react";
import axios from "axios";
import Task from "./Task";
const link = "http://localhost:8000";

const Edition = ({task, changeState}) => {
    const [text, setText] = useState(task.text);
    const remakeTask = async () => {
        await axios
          .patch(`${link}/updateTask`, {
            _id: task._id,
            text: text,
          })
          .then((res) => {
            if (res.status !== 200) {
              alert("Ошибка!");
            } else {
                
                
             changeState();
            }
          });
      };
    
      
      return(
        <div>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={() => remakeTask()}>Remake</button>
        </div>

      )
}

export default Edition;