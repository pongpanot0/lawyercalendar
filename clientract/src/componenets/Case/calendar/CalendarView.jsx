import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { Modal, Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
moment.locale("th");
const localizer = momentLocalizer(moment);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
};
const CalendarView = ({ data }) => {
 
  const [selectedEvent, setSelectedEvent] = useState(null);
  const newEvents = data.map((res) => ({
    title: `TSB Ref.${res.tsb_ref}`,
    start: new Date(res.ReciveWarrantDate || res.DuedateSummittree) ,
    end: new Date(res.ReciveWarrantDate || res.DuedateSummittree),
    description:`รายละเอียด :${res.case_remark}`,
    allDay: true,
  
  }));
  console.log(newEvents);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="full-calendar">
      <Calendar
        localizer={localizer}
        events={newEvents}
        startAccessor="start"
    
        endAccessor="end"
        style={{ height: 600 }}
        onSelectEvent={handleEventClick}
      
      />

      <Modal
        open={!!selectedEvent}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {selectedEvent?.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {selectedEvent?.description}
          </Typography>
          <Button onClick={handleCloseModal} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CalendarView;
