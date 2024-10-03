import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"
import { Container } from "react-bootstrap";
import BtnResched from "../Buttons/BtnResched";

function AdminCalendar() {
    return(
        <Container>
            <h1>Calendar</h1>
            <BtnResched/>
            <div>
                <Fullcalendar
                    plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]} 
                    initialView={"dayGridMonth"}
                    height={'50em'}

                    customButtons={{
                        Legend: {
                            text: 'Legend:',
                        },
                        Extension: {
                            text: 'Extension'
                        },
                        Service: {
                            text: 'Service'
                        },
                    }}

                    headerToolbar={{
                        start:'',
                        center: 'title',
                        end: 'Legend,Extension,Service',
                    }}
                    footerToolbar={{
                        start:'',
                        center: '',
                        end: 'today,prev,next',
                        
                    }}
                />
            </div>
            
        </Container>
    );
}

export default AdminCalendar;