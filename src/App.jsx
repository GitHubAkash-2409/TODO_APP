import './App.css';
import { TodoProvider } from './Components/ToDoContext/ToDoContext';
// import TaskList from './Components/TaskList';
import ToDoList from "./Components/ToDoList";
function App() {

  return (
    <>
      <TodoProvider>
      <ToDoList/>  
      </TodoProvider>     
    </>
  )
}

export default App
