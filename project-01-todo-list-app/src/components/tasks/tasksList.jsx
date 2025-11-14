// react
import { useState } from "react";

// local
import style from "./tasksList.module.css";
import Input from "../input/input";

// toast
import toast from "react-hot-toast";

function TasksList({ tasks, setTasks }) {
  const [newTaskValue, setNewTaskValue] = useState("");
  const [editedId, setEditedId] = useState(null);

  // item list
  const list = tasks.map((task) => (
    <li key={task.id}>
      <div className={style.taskTitle}>
        {editedId === task.id ? (
          <div className={style.editValue}>
            <Input
              type={"text"}
              inpValue={newTaskValue}
              placeholder={"Edit task name"}
              changeFunc={(e) => setNewTaskValue(e.target.value)}
            />
            <div>
              <button
                type="button"
                className={style.edit}
                onClick={() => handleSaveChanges(task.id)}
              >
                Save
              </button>
              <button
                type="button"
                className={style.delete}
                onClick={() => handleCancelChanges()}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : task.checked ? (
          <p className={style.checked}>
            <del>{task.task}</del>
          </p>
        ) : (
          <>
            <input
              className={style.checkedInp}
              type="checkbox"
              checked={task.checked}
              onChange={() => handleChecked(task.id)}
            />
            <p>{task.task}</p>
          </>
        )}
      </div>
      {editedId !== task.id && (
        <div>
          <button
            type="button"
            className={style.edit}
            onClick={() => handleEditValue(task.id)}
          >
            Edit
          </button>
          <button
            type="button"
            className={style.delete}
            onClick={() => handleDeleteTask(task.id)}
          >
            Delete
          </button>
        </div>
      )}
    </li>
  ));

  /*==========================================================================
                                function make task done
    ========================================================================*/
  function handleChecked(id) {
    const confirmUpdate = window.confirm("are you sure you want make it done?");
    if (confirmUpdate) {
      const updated = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, checked: !task.checked };
        }
        return task;
      });
      setTasks(updated);
      toast.success("update successful!", { id: "toast" });
    } else {
      toast.error("action closed", { id: "toast" });
    }
  }

  /*==========================================================================
                                function handle delete task
    ========================================================================*/
  function handleDeleteTask(id) {
    const confirmDel = window.confirm(
      "are you sure you want to delete this task?"
    );
    if (confirmDel) {
      const filtered = tasks.filter((task) => {
        return task.id !== id;
      });
      setTasks(filtered);
      toast.success("update successful!", { id: "toast" });
    } else {
      toast.error("action closed", { id: "toast" });
    }
  }

  /*==========================================================================
                                function to edit value
    ========================================================================*/
  function handleEditValue(id) {
    setEditedId(id);
  }

  /*==========================================================================
                                function save changes
    ========================================================================*/
  function handleSaveChanges(id) {
    if (newTaskValue) {
      toast.loading("loading.....", { id: "toast" });
      setTimeout(() => {
        const newTasks = tasks.map((task) => {
          if (task.id === id) {
            return { ...task, task: newTaskValue, checked: false };
          } else {
            return task;
          }
        });
        setTasks(newTasks);
        toast.success("update done successfully", { id: "toast" });
      }, 1000);
      setTimeout(() => {
        setEditedId(null);
        setNewTaskValue("");
      }, 1500);
    } else {
      toast.error("please enter a valid value!", { id: "toast" });
    }
  }

  /*==========================================================================
                                function handle cancel changes
    ========================================================================*/
  function handleCancelChanges() {
    setEditedId(null);
  }
  return (
    <>
      <div className={style.tasksPage}>
        <ul>{list}</ul>
      </div>
    </>
  );
}

export default TasksList;
