// backend/src/routes/event.routes.js
import express from "express";
import Event from "../models/event.model.js";
import User from "../models/user.model.js";
import Registration from "../models/registration.model.js";

const router = express.Router();

/**
 * 📌 GET all events
 */
router.get("/", async (req, res) => {
  try {
    const events = await Event.find()
      .populate("createdBy", "name email role")
      .populate("participants", "name email");

    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Error fetching events", error: err.message });
  }
});

/**
 * 📌 GET single event by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("createdBy", "name email role")
      .populate("participants", "name email");

    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: "Error fetching event", error: err.message });
  }
});

/**
 * 📌 POST create new event (Admin/Coordinator)
 */
router.post("/", async (req, res) => {
  try {
    const { title, description, date, category, capacity, createdBy } = req.body;

    const event = new Event({
      title,
      description,
      date,
      category,
      capacity,
      createdBy,
    });

    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: "Error creating event", error: err.message });
  }
});

/**
 * 📌 POST register for an event (Student)
 */
router.post("/:id/register", async (req, res) => {
  try {
    const { studentId } = req.body;
    const eventId = req.params.id;

    // check event exists
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // check student exists
    const student = await User.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    // check duplicate registration
    const existing = await Registration.findOne({ student: studentId, event: eventId });
    if (existing) return res.status(400).json({ message: "Already registered" });

    // create pending registration
    const registration = new Registration({
      student: studentId,
      event: eventId,
      status: "pending",
    });

    await registration.save();
    res.status(201).json({ message: "Registration request submitted", registration });
  } catch (err) {
    res.status(500).json({ message: "Error registering", error: err.message });
  }
});

/**
 * 📌 PUT approve/reject registration (Admin/Coordinator)
 */
router.put("/registrations/:id", async (req, res) => {
  try {
    const { status } = req.body; // approved | rejected
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const reg = await Registration.findById(req.params.id)
      .populate("student", "name email")
      .populate("event", "title capacity participants registered");

    if (!reg) return res.status(404).json({ message: "Registration not found" });

    reg.status = status;

    // if approved, add student to event participants
    if (status === "approved") {
      const event = await Event.findById(reg.event._id);
      if (event.participants.length < event.capacity) {
        event.participants.push(reg.student._id);
        event.registered = event.participants.length;
        await event.save();
      } else {
        return res.status(400).json({ message: "Event is full" });
      }
    }

    await reg.save();
    res.json({ message: `Registration ${status}`, registration: reg });
  } catch (err) {
    res.status(500).json({ message: "Error updating registration", error: err.message });
  }
});

/**
 * 📌 DELETE event (Admin only)
 */
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting event", error: err.message });
  }
});

export default router;
