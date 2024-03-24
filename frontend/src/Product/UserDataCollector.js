import React, { useState, useEffect } from 'react';

const UserDataCollector = ({ data }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (data && data.eventType && data.eventData) {
      const event = {
        type: data.eventType,
        [data.eventMessage]: data.eventData,
        timestamp: new Date().toISOString()
      };

      // Update state with new event
      setEvents(prevEvents => [...prevEvents, event]);

      // Retrieve existing events from session storage
      const existingEvents = JSON.parse(sessionStorage.getItem("events")) || [];

      // Add new event to existing events and store back in session storage
      sessionStorage.setItem("events", JSON.stringify([...existingEvents, event]));
    }
  }, [data]);

  console.log(events);

  return (
    null
  );
};

export default UserDataCollector;
