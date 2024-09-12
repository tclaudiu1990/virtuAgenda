import { format } from "date-fns";
import FiltersInfo from "../types/FiltersInfo";
import { getTasks } from "./taskServices";

// filter in sequence by day, then by title, then by status
const filterTasks = (filters: FiltersInfo) => {

    const allTasks = getTasks()

    // filtered task array 
    let filteredTasks = allTasks;

    //filter by day
    filteredTasks = allTasks.filter((task)=>format(task.startDate, 'dd/MM/yyyy')==format(filters.selectedDay, 'dd/MM/yyyy'))

    //filter by status
    if(filters.status !== 'Toate' && filters.status !== ''){        
        filteredTasks = filteredTasks.filter((task)=>task.status==filters.status)
    }

    //filter by title
    if(filters.title!=''){
        filteredTasks = filteredTasks.filter((task)=>task.title.toLowerCase().includes(filters.title.toLowerCase()))
    } 

    console.log(filteredTasks)
    return(filteredTasks);
}

export {filterTasks};


