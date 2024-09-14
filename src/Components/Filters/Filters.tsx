import React, { useContext, useEffect, useState } from "react";
import './Filters.scss';
import 'react-datepicker/dist/react-datepicker.css';
import { AppContext } from "../../App";
import DayPicker from "../DayPicker/DayPicker";

interface FiltersProps {
    
}

const Filters: React.FC<FiltersProps>=(props)=>{

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
    

    // filter everytime any filter is selected
    // If the filtering were done in the backend, we would probably filter through a button as to not make too many requests
    useEffect(()=>{
        appContext?.changeFilters({
            selectedDay: selectedDay,
            title: searchTitle,
            status: status
        });
    }, [selectedDay, searchTitle, status])

    return(
        <div id="filters">
            <div className="filter-group">
                <button className="btn"
                    onClick={()=>appContext?.addTask(
                        {
                            title: 'Task nou',
                            description: 'Scrie aici descrierea taskului tau',
                            startDate: selectedDay
                        }
                )}>+ Creaza Task Nou</button>

                <label htmlFor="date-picker"> Data:</label>
                <DayPicker 
                    selectedDay={selectedDay}
                    onChange={handleCalendar}
                />
                    
            </div>

            <div className="filter-group">
                {/* <label htmlFor="search-input"><i className="fa-solid fa-magnifying-glass"></i></label> */}
                <input id="search-input" type="text" placeholder="Titlu Task" onChange={(e)=>setSearchTitle(e.target.value)}></input>

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