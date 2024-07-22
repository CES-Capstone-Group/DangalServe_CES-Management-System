import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"
import { Container } from "react-bootstrap";

function BrgyCalendar() {
    return(
        <Container>
            <Fullcalendar
                plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]} 
                initialView={"dayGridMonth"}
                height={'50em'}
            />
        </Container>
    );
}

export default BrgyCalendar;