import { createContext, useEffect, useState } from 'react'
import './App.scss'
import Header from './Components/Header/Header'
import Board from './Components/Board/Board'
import '@fortawesome/fontawesome-free/css/all.min.css';
import {  deleteAllTasks, logSavedTasks } from './Services/taskServices';
import { TaskBoxInfo } from './types/TaskBoxInfo';
import { NewTaskInfo } from './types/NewTaskInfo';
import FiltersInfo from './types/FiltersInfo';
import useTasks from './hooks/useTasks';
import DeleteModal from './Components/Modal/DeleteModal';
import TaskDetails from './Components/Modal/TaskDetails';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from './Components/Modal/Modal';

// context definition
type TaskContextType = {
  tasks: TaskBoxInfo[];
  selectedDay: Date;
  changeFilters: (filters: FiltersInfo) => void;
  reloadTasks: () => void;
  addTask: (task: NewTaskInfo) => void;
  getTask: (id: number) => TaskBoxInfo | undefined;
  deleteTask: (task: TaskBoxInfo) => void;
  filter: (filters: FiltersInfo) => void
}
export const AppContext = createContext<TaskContextType | undefined>(undefined);


function App() {

  const {tasks, 
    selectedDay,
    searchTitle,
    selectedStatus,
    changeFilters,
    filter,
    getTask,
    addTask,
    deleteTask,
    reloadTasks
  } = useTasks()


  // MODAL

      // router hooks
      const navigate = useNavigate();
      const location = useLocation();
  


      // state to determine the visibility of the modal
      const [modalVisible, setModalVisible] = useState(false);
      // content to be passed to the modal component
      let [modalContent, setModalContent] = useState(<></>);
  


      // close modal and navigate to home
      const closeModal = () => {
          setModalVisible(false)        
          navigate(`/`)
      };
  
      // method to open the Task Details modal
      const openTaskDetails = (taskInfo:TaskBoxInfo) => {
        console.log(`openModal NEW TaskBoxInfo`)
        console.log(taskInfo)
        setModalContent(
            <TaskDetails
                    key={taskInfo.id}  
                    taskBoxInfo={taskInfo} 
                    closeModal={closeModal}
                    openDelete={openDelete}
                /> 
        )
        setModalVisible(true);
      }

      // method to open the Delete Task modal
      const openDelete = (taskBoxInfo:TaskBoxInfo) => {
          setModalContent(
              <DeleteModal
                  taskBoxInfo={taskBoxInfo}    
                  closeModal={closeModal}       
              /> 
          )
          setModalVisible(true);
      }
  

      // Automatically check for route changes
      // When route changes to /#task_id, open Task Details of the corresponding task
      useEffect(()=>{
          //extract taskId
          const linkId = location.hash.substring(1);
          // get taskBoxInfo
          const newTaskBoxInfo = getTask(Number(linkId))
          
          if(newTaskBoxInfo){
              openTaskDetails(newTaskBoxInfo)
          } else {
              closeModal()
          }
  
      }, [location.hash])





  // CONTEXT VALUE - for anything that the app might need
  const appContextValue:TaskContextType = {
    tasks: tasks,
    selectedDay: selectedDay,
    changeFilters: changeFilters,
    reloadTasks: reloadTasks,
    addTask: addTask,
    getTask: getTask,
    deleteTask: deleteTask,
    filter: filter
  }
  

  return (
    <div id='app'>
      <AppContext.Provider value={appContextValue}>

        
        {modalVisible &&
          <Modal closeModal={closeModal}>
              {modalContent}
          </Modal>
        }

        <Header></Header>
        <Board tasks={tasks}></Board>
        {/* dev buttons */}
        <div className='dev-buttons'>
          <button onClick={()=>logSavedTasks()}>log all task</button>
          <button onClick={()=>deleteAllTasks()}>delete all task</button>
        </div>
        {/* dev buttons */}
      </AppContext.Provider>
    </div>
  )
}

export default App
