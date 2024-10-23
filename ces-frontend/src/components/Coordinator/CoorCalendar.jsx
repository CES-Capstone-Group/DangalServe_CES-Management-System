<<<<<<< Updated upstream
import React, { useRef, useState } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"
import { Container, Form } from "react-bootstrap";
=======
import React, { useEffect, useState } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Container } from "react-bootstrap";
>>>>>>> Stashed changes
import BtnResched from "../Buttons/BtnResched";
import BtnAddSchedule from "../Buttons/BtnAddSchedule";

function CoorCalendar() {
<<<<<<< Updated upstream
    const calendarRef = useRef(null);
    const [showModal, setShowModal] = useState(false);  
    const [selectedDate, setSelectedDate] = useState(null);  
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    // Function to open modal
    const handleShowModal = (selectInfo) => {
        setSelectedDate(selectInfo.startStr);  // Get the start date from the selection
        setShowModal(true);  // Show the modal
    };

    // Function to close modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedDate(null);  // Reset the selected date when modal closes
    };

    // Function to add new event to FullCalendar
    const addNewEvent = (eventData) => {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.addEvent(eventData);  // Add the new event to the calendar
    };

    // Handle year change from the combo box
    const handleYearChange = (e) => {
        const newYear = e.target.value;
        setCurrentYear(newYear);  // Update the state
        const calendarApi = calendarRef.current.getApi();  // Get the calendar API
        calendarApi.gotoDate(`${newYear}-01-01`);  // Go to January 1st of the selected year
    };

    return (
        <Container>
            <h1>Admin Calendar</h1>
            <BtnResched />
            
            {/* Pass modal state and close function to BtnAddSchedule */}
            <BtnAddSchedule
                showModal={showModal}
                handleShowModal={() => setShowModal(true)}
                handleCloseModal={handleCloseModal}
                selectedDate={selectedDate}
                addNewEvent={addNewEvent}
            />

                        
            {/* Dropdown to select the year */}
            <div className="calendar-header">
                <Form.Group controlId="yearSelect" className="mb-3">
                    <Form.Label>Select Year:</Form.Label>
                    <Form.Select     value={currentYear} 
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
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, ]} 
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

                    // Trigger modal on select
                    select={handleShowModal}
                    editable={true}
                    selectable={true}
                    dayMaxEvents={true}
                />
            </div>
        </Container>
    );
}

export default CoorCalendar;
