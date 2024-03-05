import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";


const ToDoContext = createContext();

const useToDoContext = () => useContext(ToDoContext)

const getLocalItem = () => {
    const storeItem = localStorage.getItem("list")
    return storeItem? JSON.parse(localStorage.getItem("list")):[]
}

const TodoProvider = ({ children }) => {
  const [activity, setActivity] = useState("");
  const [task, setTask] = useState(getLocalItem());
  const [update, setUpdate] = useState(true);
  const [edit, setEdit] = useState(null);

  useEffect(()=>{

    localStorage.setItem("list", JSON.stringify(task))

  },[task])


  const handleUpdate = () => {
    if (activity === "") {
      alert("Please Fill Input Box");
    } else if (!update) {
      setTask(
        task.map((newElem) => {
          if (newElem.id === edit) {
            return { ...newElem, title: activity };
          }
          return newElem;
        })
      );
      setUpdate(true);
      setActivity("");
      setEdit(null);
    } else {
      const allActivity = { id: uuidv4(), title: activity, complete: false };

      setTask([...task, allActivity]);
      setActivity("");
    }
  };

  const handleRemove = (index) => {
    const isConfirm = window.confirm("are you sure you want to remove it");
    if (isConfirm) {
      const filteredItems = task.filter((item) => item.id !== index);
      setTask(filteredItems);
    }
  };

  const handleEdit = (id) => {
    const findItem = task.find((elem) => {
      return id === elem.id;
    });
    setActivity(findItem.title);
    setUpdate(false);
    setEdit(id);
  };

  const handleRemoveAll = () => {
    const isConfirm = window.confirm("Are you sure you want to remove all?");
    if (isConfirm) {
      setTask([]);
    }
  };

  const handleComplete = (id) => {
    setTask(
      task.map((compItem) => {
        if (compItem.id === id) {
          return { ...compItem, complete: !compItem.complete };
        }
        return compItem;
      })
    );
  };

  
  const allValue = {
    activity,
    setActivity,
    task,
    setTask,
    update,
    setUpdate,
    edit,
    setEdit,
    handleUpdate,
    handleRemove,
    handleEdit,
    handleRemoveAll,
    handleComplete,
  };

  return (
    <ToDoContext.Provider value={allValue}>{children}</ToDoContext.Provider>
  );
};

export { ToDoContext, TodoProvider, useToDoContext };
