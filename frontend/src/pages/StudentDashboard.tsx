import { useState, useEffect } from "react";
import axios from "axios";

function StudentDashboard() {
  const [events, setEvents] = useState<any[]>([]);
  const [myEvents, setMyEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Replace with actual logged-in student ID (from auth context/JWT)
  const studentId = "64f1c29b23a4c123456789ab";

  // Fetch all events
  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events");
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  // Fetch my registered events
  const fetchMyEvents = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/students/${studentId}/registrations`);
      setMyEvents(res.data);
    } catch (err) {
      console.error("Error fetching my events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchMyEvents();
  }, []);

  // Register for event
  const handleRegister = async (eventId: string) => {
    try {
      await axios.post(`http://localhost:5000/api/registrations`, {
        studentId,
        eventId,
      });
      fetchMyEvents();
      alert("Registered successfully ✅");
    } catch (err) {
      console.error("Error registering:", err);
      alert("Error registering for event");
    }
  };

  // Unregister
  const handleUnregister = async (eventId: string) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/registrations/${eventId}?studentId=${studentId}`
      );
      fetchMyEvents();
      alert("Unregistered successfully ❌");
    } catch (err) {
      console.error("Error unregistering:", err);
      alert("Error unregistering from event");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Student Dashboard</h2>
      <p className="text-gray-600">View and register for events</p>

      {/* All Events */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">All Events</h3>
        {events.length === 0 ? (
          <p>No events available</p>
        ) : (
          <ul>
            {events.map((event) => (
              <li key={event._id} className="flex justify-between items-center border-b py-2">
                <span>
                  <strong>{event.title}</strong> - {new Date(event.date).toDateString()} 
                  (Capacity: {event.capacity}) | {event.category}
                </span>
                {myEvents.some((e) => e._id === event._id) ? (
                  <button
                    onClick={() => handleUnregister(event._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Unregister
                  </button>
                ) : (
                  <button
                    onClick={() => handleRegister(event._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Register
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* My Registered Events */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">My Registered Events</h3>
        {myEvents.length === 0 ? (
          <p>You have not registered for any events yet.</p>
        ) : (
          <ul>
            {myEvents.map((event) => (
              <li key={event._id} className="border-b py-2">
                <strong>{event.title}</strong> - {new Date(event.date).toDateString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
