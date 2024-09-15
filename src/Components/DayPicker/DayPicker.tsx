import React, { useContext, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { ro } from 'date-fns/locale';
import { getTasks } from "../../Services/taskServices";
import { TaskBoxInfo } from "../../types/TaskBoxInfo";
import { AppContext } from "../../App";
import 'react-datepicker/dist/react-datepicker.css';

interface DayPickerProps {
    selectedDay: Date;
    onChange: (date: Date) => void;
}



const DayPicker:React.FC<DayPickerProps> = ({selectedDay, onChange}) => {

    const appContext = useContext(AppContext)

    
    // selected calendar date
    const [currentDate, setCurrentDate] = useState<Date>(selectedDay)
    
    

    // changes the current date to provided value of type Date
    const handleChange = (value:Date)=>{
        setCurrentDate(value)
    }

    // everytime currentDate changes, it fires the onChange method received through props
    useEffect(()=>{
        onChange(currentDate)
    }, [currentDate])


    // HIGHLIGHT DAYS logic

    // state containing task dates to be highlighted in the calendar
    const [taskDates, setTaskDates] = useState<Date[]>([])
    // ref to the calendar wrap 
    const calendarWrap = useRef(null);    

    // update calendar highlighted days when tasks change
    useEffect(()=>{
        // extract all task dates
        const unfilteredDates = getTasks().map((task:TaskBoxInfo)=>{
            return new Date(task.startDate);
        })
        // filter for unique dates
        const uniqueDates = unfilteredDates.filter((date, index)=>{
            return index === unfilteredDates.findIndex(item => item.toDateString() === date.toDateString());
        })
        // set the new task dates
        setTaskDates(uniqueDates);

    }, [appContext?.tasks])



    return(
        <div className="calendarWrap" ref={calendarWrap}>
            <DatePicker
                id="date-picker"
                selected={selectedDay}
                onChange={value=>handleChange(value as Date)}
                date={ new Date() }
                className="calendarElement"
                locale={ro}
                highlightDates={taskDates}
            />
        </div>
    )
}

export default DayPicker;