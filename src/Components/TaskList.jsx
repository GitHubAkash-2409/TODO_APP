import React, { useContext } from "react";
import { FaCheckSquare, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useToDoContext } from "./ToDoContext/ToDoContext";

const TaskList = () => {
  const {
    task,
    handleRemove,
    handleEdit,
    handleRemoveAll,
    handleComplete,
  } = useToDoContext()

  return (
    <div>
      <ul>
        {task.map((taskList) => (
          <li
            className={`flex justify-between border-b-2 px-2 py-1 items-center ${
              taskList.complete ? "line-through" : ""
            }`}
            key={taskList.id}
          >
            <div className="flex gap-3">
              <span className="cursor-pointer">
                <FaCheckSquare
                  size={25}
                  onClick={() => handleComplete(taskList.id)}
                />
              </span>
              <span>{taskList.title}</span>
            </div>
            <div className="flex gap-3">
              <span
                className="cursor-pointer"
                onClick={() => handleEdit(taskList.id)}
              >
                <FaEdit size={25} />
              </span>
              <span
                className="cursor-pointer"
                onClick={() => handleRemove(taskList.id)}
              >
                <MdDelete size={25} />
              </span>
            </div>
          </li>
        ))}
      </ul>
      {task.length >= 2 && (
        <button
          className="bg-red-500 text-white px-3 py-2 rounded-md my-5 hover:bg-red-400"
          onClick={handleRemoveAll}
        >
          Remove All
        </button>
      )}
    </div>
  );
};

export default TaskList;
