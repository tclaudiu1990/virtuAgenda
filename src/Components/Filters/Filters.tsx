import { useContext, useEffect, useRef, useState } from "react";
import './Filters.scss';
import 'react-datepicker/dist/react-datepicker.css';
import { AppContext } from "../../App";
import DayPicker from "../DayPicker/DayPicker";


const Filters =()=>{

    const appContext = useContext(AppContext);


    // filter states
    // selected calendar date
    const [selectedDay, setSelectedDay] = useState<Date>(new Date())
    // selected title
    const [searchTitle, setSearchTitle] = useState('')
    // selected status
    const [status, setStatus] = useState('')


    // method that triggers when a date is selected
    const handleCalendar = (date: Date) => {
        setSelectedDay(date)
    }
    

    // automatically change global filters everytime any filter is selected
    // If the filtering was done in the backend, we would probably filter through a button as to not make too many requests
    useEffect(()=>{
        appContext?.changeFilters({
            selectedDay: selectedDay,
            title: searchTitle,
            status: status
        });
    }, [selectedDay, searchTitle, status])

    // filters: title and status
    // these are hidden on mobile
    const mobileFilters = useRef<HTMLDivElement>(null)
    const toggleHideFilters = () => {
        if(mobileFilters.current) {
            mobileFilters.current.classList.contains('active') ? mobileFilters.current.classList.remove('active'):mobileFilters.current.classList.add('active')
        }        
    }
    
    return(
        <div id="filters">
            <div className="filters-group">
                <div>
                    <button className="btn btn-new-task"
                        onClick={()=>appContext?.addTask(
                            {
                                title: 'My new task',
                                description: '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Click here to add a description.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
                                startDate: selectedDay
                            }
                    )}>+ Create Task</button>
                    
                    <label htmlFor="date-picker"> Date:</label>
                    <DayPicker 
                        selectedDay={selectedDay}
                        onChange={handleCalendar}
                    />
                </div>
                <button className="btn-transparent btn-filters btn" onClick={toggleHideFilters}>Filtre &nbsp; <i className="fa-solid fa-filter"></i></button>
            </div>

        
            <div className="filters-group mobile-filter-group" ref={mobileFilters}>
                <div>
                    {/* <label htmlFor="search-input"><i className="fa-solid fa-magnifying-glass"></i></label> */}
                    <label htmlFor="search-input">Title:</label>
                    <input id="search-input" type="text" onChange={(e)=>setSearchTitle(e.target.value)}></input>
                </div>

                <div>
                    <label htmlFor="select-status">Status:</label>
                    <select name="status" id="select-status" onChange={(e)=>setStatus((e.target as HTMLSelectElement).value)}>
                        <option value=''>All</option>
                        <option value='create'>To do</option>
                        <option value='incurs'>On it</option>
                        <option value='finalizate'>Done</option>
                    </select>
                </div>
            </div>     
        </div>
    )
}

export default Filters;