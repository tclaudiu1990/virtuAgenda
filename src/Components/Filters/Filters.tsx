import React, { useEffect, useRef, useState } from "react";
import './Filters.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ro } from 'date-fns/locale';

interface FiltersProps {

}

const Filters: React.FC<FiltersProps>=(props)=>{

    // Calendar logic
    // date displayed in the inputBox
    const [calendar, setCalendar] = useState<Date | null>()

    // method that triggers when a date is selected
    const handleCalendar = (date: Date | null) => {
        console.log(date)
        setCalendar(date)
    }


    useEffect(()=>{
        
    }, [])
    const calendarWrap = useRef(null);


    return(
        <div id="filters">
            <label htmlFor="search-input"><i className="fa-solid fa-magnifying-glass"></i></label>
            <input id="search-input" type="text" placeholder="title"></input>

            <label htmlFor="select-status">Status</label>
            <select name="status" id="select-status">
                <option value='creata'>Toate</option>
                <option value='creata'>Creata</option>
                <option value='incurs'>In curs</option>
                <option value='finalizata'>Finalizata</option>
            </select>

            <label htmlFor="date-picker">Data</label>

            <div className="calendarWrap" ref={calendarWrap}>
                <DatePicker
                    id="date-picker"
                    selected={calendar}
                    onChange={date=>handleCalendar(date)}
                    date={ new Date() }
                    className="calendarElement"
                    locale={ro}
                />
            </div>

            <button className="btn">Aplica</button>
        </div>
    )
}

export default Filters;