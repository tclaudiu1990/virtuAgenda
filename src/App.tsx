import { createContext, useEffect, useState } from 'react'
import './App.scss'
import Header from './Components/Header/Header'
import Board from './Components/Board/Board'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { TaskBoxInfo } from './types/TaskBoxInfo';
import { NewTaskInfo } from './types/NewTaskInfo';
import FiltersInfo from './types/FiltersInfo';
import useTasks from './hooks/useTasks';
import DeleteModal from './Components/Modal/DeleteModal';
import TaskDetails from './Components/Modal/TaskDetails';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from './Components/Modal/Modal';
import SettingsModal from './Components/Modal/SettingsModal';
import useSettings from './hooks/useSettings';
import { SettingsTypeInfo } from './types/SettingsTypeInfo';

// context definition
type TaskContextType = {
  tasks: TaskBoxInfo[];
  selectedDay: Date;
  changeFilters: (filters: FiltersInfo) => void;
  reloadTasks: () => void;
  addTask: (task: NewTaskInfo) => void;
  getTask: (id: number) => TaskBoxInfo | undefined;
  deleteTask: (task: TaskBoxInfo) => void;
  openDelete: (info: TaskBoxInfo) => void;
  openSettings: () => void;
  filter: (filters: FiltersInfo) => void
  //settings
  appTitle: string,
  appBgType: 'default' | 'custom',
  appBgUrl: string,
  updateSettings: (settings:SettingsTypeInfo) => void,
  reloadSettings: () => void
}
export const AppContext = createContext<TaskContextType | undefined>(undefined);


function App() {

  const {
    tasks, 
    selectedDay,
    changeFilters,
    filter,
    getTask,
    addTask,
    deleteTask,
    reloadTasks
  } = useTasks()

  const {
    appTitle,
    appBgType,
    appBgUrl,
    updateSettings,
    reloadSettings
  } = useSettings()

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
    setModalContent(
        <TaskDetails
                key={taskInfo.id}  
                taskBoxInfo={taskInfo} 
                closeModal={closeModal}
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

    // method to open the Settings modal
    const openSettings= () => {
      setModalContent(
          <SettingsModal   
              closeModal={closeModal}       
          /> 
      )
      setModalVisible(true);
  }



  // Automatically check for route changes
  // When route changes to /#task_id, open Task Details of the corresponding task
  useEffect(()=>{
      // extract taskId by removing the first character "#"
      const linkId = location.hash.substring(1);
      // get taskBoxInfo by id
      const newTaskBoxInfo = getTask(Number(linkId))
      
      if(newTaskBoxInfo){
          // opens coresponding task details modal
          openTaskDetails(newTaskBoxInfo)
      } else {
          // close modal if the task doesn't exist
          navigate('/')
          closeModal()
      }

  }, [location.hash])


  // load app settings on component mount
  useEffect(()=>{
    reloadSettings()
  }, [])



  // CONTEXT VALUE - for anything that the app might need
  const appContextValue:TaskContextType = {
    tasks: tasks,
    selectedDay: selectedDay,
    changeFilters: changeFilters,
    reloadTasks: reloadTasks,
    addTask: addTask,
    getTask: getTask,
    deleteTask: deleteTask,
    openDelete: openDelete,
    openSettings: openSettings,
    filter: filter,
    appTitle: appTitle,
    appBgType: appBgType,
    appBgUrl: appBgUrl,
    updateSettings: updateSettings,
    reloadSettings: reloadSettings
  }
  
  // method to remove everything from localStorage
  // const clearAll = () => {
  //   localStorage.removeItem('vaSettings');
  //   localStorage.removeItem('vaTasks');
  //   localStorage.removeItem('vaIdCounter');
  // }
 
  return (
    <div id='app' style={{backgroundImage: `url(${appBgUrl})`}}>
      <AppContext.Provider value={appContextValue}>

        
        {modalVisible &&
          <Modal closeModal={closeModal}>
              {modalContent}
          </Modal>
        }
        <div className='app-content'>

          <Header></Header>
          <Board tasks={tasks}></Board>
        </div>


        {/* dev buttons */}
        
        {/* <div className='dev-buttons'>
          <button onClick={()=>clearAll()}>Clear Everything</button>
        </div>      */}
       
        {/* end dev buttons */}
        
      </AppContext.Provider>
    </div>
  )
}

export default App
