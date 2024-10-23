<<<<<<< Updated upstream
import React, { useRef, useState } from "react";
=======
import React, { useEffect, useState } from "react";
>>>>>>> Stashed changes
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Container } from "react-bootstrap";
import BtnResched from "../Buttons/BtnResched";
import { Form } from "react-router-dom";

function BrgyCalendar() {
<<<<<<< Updated upstream
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
                    
=======
    const [events, setEvents] = useState([]); // State to store calendar events

    // Fetch events from the backend when the component mounts
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/activity-schedules/`) // Adjust the API endpoint as necessary
            .then((response) => response.json())
            .then((data) => {
                // Map the fetched data to match FullCalendar's format
                const formattedEvents = data.map(event => ({
                    id: event.id,
                    title: event.activity_title,
                    start: `${event.target_date}T${event.target_time}`, // Combine date and time for FullCalendar
                }));
                setEvents(formattedEvents); // Store events in state
            })
            .catch((error) => {
                console.error('Error fetching events:', error);
            });
    }, []);

    return (
        <Container>
            <h1>Calendar</h1>
            <BtnResched />
            <div>
                <Fullcalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView={"dayGridMonth"}
                    height={'50em'}
                    
                    // Pass events fetched from the backend to FullCalendar
                    events={events}

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                        start: 'today,prev,next',
=======
                        start: '',
>>>>>>> Stashed changes
                        center: 'title',
                        end: 'Legend,Extension,Service',
                    }}

                    footerToolbar={{
                        start: '',
                        center: '',
<<<<<<< Updated upstream
                        end: '',
=======
                        end: 'today,prev,next',
>>>>>>> Stashed changes
                    }}
                    dayMaxEvents={true}
                />
            </div>
        </Container>
    );
}

export default BrgyCalendar;
