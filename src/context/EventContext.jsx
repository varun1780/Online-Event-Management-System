import React, { createContext, useContext, useState, useEffect } from 'react';

const EventContext = createContext();

export const useEvents = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Events
  const fetchEvents = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/events');
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Fetch Registrations
  const fetchRegistrations = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/registrations');
      const data = await res.json();
      setRegistrations(data);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([fetchEvents(), fetchRegistrations()]);
      setLoading(false);
    };
    init();
  }, []);

  const addEvent = async (newEvent) => {
    try {
      const isFormData = newEvent instanceof FormData;

      const options = {
        method: 'POST',
        body: isFormData ? newEvent : JSON.stringify(newEvent),
      };

      if (!isFormData) {
        options.headers = { 'Content-Type': 'application/json' };
      }

      const res = await fetch('http://localhost:5000/api/events', options);
      if (res.ok) {
        const createdEvent = await res.json();
        setEvents([...events, createdEvent]);
        return true;
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
    return false;
  };

  const registerForEvent = async (eventId, userDetails) => {
    try {
      const res = await fetch('http://localhost:5000/api/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventId, ...userDetails }),
      });

      if (res.ok) {
        const newRegistration = await res.json();
        setRegistrations([...registrations, newRegistration]);

        // Update local events state to reflect increased registration count
        setEvents(events.map(e =>
          e._id === eventId ? { ...e, registered: e.registered + 1 } : e
        ));

        console.log(`Notification: Sent confirmation email to ${userDetails.email}`);
        return true;
      }
    } catch (error) {
      console.error('Error registering:', error);
    }
    return false;
  };

  const deleteEvent = (id) => {
    // Implement delete if needed
    console.log("Delete not implemented in API for this demo yet");
  };

  return (
    <EventContext.Provider value={{ events, registrations, addEvent, registerForEvent, deleteEvent, loading }}>
      {children}
    </EventContext.Provider>
  );
};
