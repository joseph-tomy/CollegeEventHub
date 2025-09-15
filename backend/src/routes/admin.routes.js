// backend/src/routes/admin.routes.js
import express from "express";
import User from "../models/user.model.js";
import Event from "../models/event.model.js";
import Registration from "../models/registration.model.js";

const router = express.Router();

// 📊 1. Get overall system stats
router.get("/stats", async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalRegistrations = await Registration.countDocuments();

    res.json({ totalEvents, totalUsers, totalRegistrations });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats", error: error.message });
  }
});

// 📅 2. Get all events with coordinator + participants count
router.get("/events", async (req, res) => {
  try {
    const events = await Event.find()
      .populate("coordinator", "name email")
      .populate("participants", "name");

    const formatted = events.map(e => ({
      id: e._id,
      name: e.name,
      date: e.date,
      coordinator: e.coordinator ? e.coordinator.name : "N/A",
      participantsCount: e.participants?.length || 0,
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error: error.message });
  }
});

// 👥 3. Get registration requests (pending/approved/rejected)
router.get("/registrations", async (req, res) => {
  try {
    const { status } = req.query; // optional: /registrations?status=pending
    const filter = status ? { status } : {};

    const registrations = await Registration.find(filter)
      .populate("student", "name email")
      .populate("event", "name");

    const formatted = registrations.map(r => ({
      id: r._id,
      studentName: r.student?.name || "Unknown",
      studentEmail: r.student?.email || "N/A",
      eventName: r.event?.name || "Unknown",
      status: r.status,
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Error fetching registrations", error: error.message });
  }
});

// ✅ 4. Approve/Reject registration (Admin Control)
router.put("/registrations/:id", async (req, res) => {
  try {
    const { status } = req.body; // "approved" or "rejected"
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const reg = await Registration.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("student", "name").populate("event", "name");

    res.json({
      id: reg._id,
      student: reg.student?.name,
      event: reg.event?.name,
      status: reg.status,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating registration", error: error.message });
  }
});

export default router;
