// react
import { useState } from "react";

// local
import Input from "./components/input/input";
import TasksList from "./components/tasks/tasksList";

// toast
import toast from "react-hot-toast";

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  /*==========================================================================
                                function handle click add task
    ========================================================================*/
  function handleAddTask() {
    if (!inputValue) {
      toast.error("please write any value before add it?");
    } else {
      toast.loading("loading....", { id: "toast" });
      setTimeout(() => {
        setTasks([
          ...tasks,
          {
            id: Date.now(),
            task: inputValue,
            checked: false,
          },
        ]);
        setInputValue("");
        toast.success("task added successfully!", { id: "toast" });
      }, 1500);
    }
  }

  /*==========================================================================
                                function handle reset input value
    ========================================================================*/
  function handleResetValue() {
    if (!inputValue) {
      toast.error("there is nothing to reset!", { id: "toast" });
      return;
    } else {
      setInputValue("");
      toast.success("reset done successfully!", { id: "toast" });
    }
  }

  return (
    <>
      <div className="all-page">
        <div className="logo">
          <h1>ToDo List</h1>
        </div>
        <div className="set-new-task">
          <form onSubmit={(e)=>e.preventDefault()}>
            <Input
              type={"text"}
              placeholder={"task title"}
              inpValue={inputValue}
              changeFunc={(e) => setInputValue(e.target.value)}
            />
            <div className="button-container">
              <button
                type="button"
                className="add-value"
                onClick={() => handleAddTask()}
              >
                Add
              </button>
              <button
                type="button"
                className="reset-value"
                onClick={() => handleResetValue()}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
        <div className="tasks-list">
          <TasksList tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
    </>
  );
}

export default App;
