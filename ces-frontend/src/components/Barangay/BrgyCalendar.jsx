import React, { useRef, useState } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"
import { Container } from "react-bootstrap";
import BtnResched from "../Buttons/BtnResched";
import { Form } from "react-router-dom";

function BrgyCalendar() {
    const calendarRef = useRef(null);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const handleYearChange = (e) => {
        const newYear = e.target.value;
        setCurrentYear(newYear);  // Update the state
        const calendarApi = calendarRef.current.getApi();  // Get the calendar API
        calendarApi.gotoDate(`${newYear}-01-01`);  // Go to January 1st of the selected year
    };
     
    return(
        <Container>
            <h1>Calendar</h1>
            <BtnResched/>
            {/* Dropdown to select the year */}
                <div className="calendar-header">
                <Form.Group controlId="yearSelect" className="mb-3">
                    <Form.Label>Select Year:</Form.Label>
                    <Form.Select 
                    value={currentYear} 
                    onChange={handleYearChange} 
                    style={{ 
                        marginRight: '10px', 
                        height: 'auto',
                        overflowY: 'auto'    
                    }}>
                        {Array.from({ length: 20 }, (_, index) => {
                            const year = new Date().getFullYear() - 5 + index;
                            return (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            );
                        })}
                    </Form.Select>
                </Form.Group>
            </div>
            <div className="m-5">
                <Fullcalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin]} 
                    initialView={"dayGridMonth"}
                    height={'50em'}
                    
                    customButtons={{
                        Legend: {
                            text: 'Legend:',
                        },
                        Extension: {
                            text: 'Extension',
                        },
                        Service: {
                            text: 'Service',
                        },
                    }}

                    headerToolbar={{
                        start: 'today,prev,next',
                        center: 'title',
                        end: 'Legend,Extension,Service',
                    }}

                    footerToolbar={{
                        start: '',
                        center: '',
                        end: '',
                    }}
                    dayMaxEvents={true}
                />
            </div>
            
        </Container>
    );
}

export default BrgyCalendar;