import React, { useContext, useEffect, useRef, useState } from "react";
import './Filters.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ro } from 'date-fns/locale';
import { AppContext } from "../../App";
import { getTasks } from "../../Services/taskServices";
import { TaskBoxInfo } from "../../types/TaskBoxInfo";

interface FiltersProps {
    
}

const Filters: React.FC<FiltersProps>=(props)=>{

    const appContext = useContext(AppContext);

    // filter states

    // selected calendar date
    const [calendar, setCalendar] = useState<Date>(new Date())
    // selected title
    const [searchTitle, setSearchTitle] = useState('')
    // selected status
    const [status, setStatus] = useState('')

    // task dates to be highlighted in the calendar
    const [taskDates, setTaskDates] = useState<Date[]>([])


    // method that triggers when a date is selected
    const handleCalendar = (date: Date) => {
        setCalendar(date)
    }
    

    
    // update calendar highlighted days when tasks change
    useEffect(()=>{

        // HIGHLIGHTING DATES IN CALENDAR
        // get all task dates
        const unfilteredDates = getTasks().map((task:TaskBoxInfo)=>{
            return new Date(task.startDate);
        })
        // filter task dates to get unique dates 
        const uniqueDates = unfilteredDates.filter((date, index)=>{
            return index === unfilteredDates.findIndex(item => item.toDateString() === date.toDateString());
        })
        setTaskDates(uniqueDates);

    }, [appContext?.tasks])
    const calendarWrap = useRef(null);


    // filter everytime any filter is selected
    // If the filtering were done in the backend, we would probably filter through a button as to not make too many requests
    useEffect(()=>{
        appContext?.changeFilters({
            selectedDay: calendar,
            title: searchTitle,
            status: status
        });
    }, [calendar, searchTitle, status])

    return(
        <div id="filters">
            <div className="filter-group">
                <button className="btn"
                    onClick={()=>appContext?.addNewTask(
                        {
                            title: 'Task nou',
                            description: 'Scrie aici descrierea taskului tau',
                            startDate: calendar
                        }
                )}>+ Creaza Task Nou</button>

                <label htmlFor="date-picker">Selecteaza Ziua:</label>
                <div className="calendarWrap" ref={calendarWrap}>
                    <DatePicker
                        id="date-picker"
                        selected={calendar}
                        onChange={(date)=>handleCalendar(date as Date)}
                        date={ new Date() }
                        className="calendarElement"
                        locale={ro}
                        highlightDates={taskDates}
                    />
                </div>
            </div>

            <div className="filter-group">
                <label htmlFor="search-input"><i className="fa-solid fa-magnifying-glass"></i></label>
                <input id="search-input" type="text" placeholder="title" onChange={(e)=>setSearchTitle(e.target.value)}></input>

                <label htmlFor="select-status">Status</label>
                <select name="status" id="select-status" onChange={(e)=>setStatus((e.target as HTMLSelectElement).value)}>
                    <option value=''>Toate</option>
                    <option value='create'>Creata</option>
                    <option value='incurs'>In curs</option>
                    <option value='finalizate'>Finalizata</option>
                </select>

                <button className=""><i className="fa-solid fa-filter"></i></button>
            </div>            
            

        </div>
    )
}

export default Filters;