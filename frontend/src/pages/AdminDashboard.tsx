import { useState, useEffect } from "react";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 🔑 Attach token for every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function AdminDashboard() {
  const [events, setEvents] = useState<any[]>([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    category: "",
    capacity: 0,
  });

  // Fetch events
  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Create new event
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newEvent.title || !newEvent.date || !newEvent.category || !newEvent.capacity) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await API.post("/events", newEvent);
      fetchEvents(); // refresh
      setNewEvent({ title: "", description: "", date: "", category: "", capacity: 0 });
      alert("✅ Event created successfully");
    } catch (err: any) {
      console.error("Error creating event:", err);
      alert("❌ Error creating event: " + (err.response?.data?.message || err.message));
    }
  };

  // Delete event
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await API.delete(`/events/${id}`);
      fetchEvents();
    } catch (err) {
      console.error("Error deleting event:", err);
      alert("❌ Error deleting event");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      <p className="text-gray-600">Manage the entire event system</p>

      {/* Create Event Form */}
      <form onSubmit={handleCreate} className="mt-6 p-4 border rounded">
        <h3 className="font-semibold mb-2">Create New Event</h3>
        <input
          type="text"
          placeholder="Title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={newEvent.category}
          onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
          className="border p-2 mr-2"
          required
        />
        <input
          type="date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          className="border p-2 mr-2"
          required
        />
        <input
          type="number"
          placeholder="Capacity"
          value={newEvent.capacity}
          onChange={(e) => setNewEvent({ ...newEvent, capacity: +e.target.value })}
          className="border p-2 mr-2"
          required
        />
        <textarea
          placeholder="Description"
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          className="border p-2 mr-2 w-full mt-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>

      {/* Events List */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">All Events</h3>
        {events.length === 0 ? (
          <p>No events found</p>
        ) : (
          <ul>
            {events.map((event) => (
              <li
                key={event._id}
                className="flex justify-between items-center border-b py-2"
              >
                <span>
                  <strong>{event.title}</strong> -{" "}
                  {new Date(event.date).toDateString()} (Capacity:{" "}
                  {event.capacity}) | {event.category}
                </span>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
