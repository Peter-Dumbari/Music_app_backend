import Event from "../models/eventModel.mjs";

export const createEvent = async (req, res) => {
  try {
    const eventPosterUrl = req.file ? req.file.path : null;

    const newEvent = await Event.create({
      name: req.body.name,
      poster: eventPosterUrl,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,
      ticketTypes: req.body.ticketTypes,
      organizer: req.body.organizer,
    });
    res.status(201).json({
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create event", error });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events", error });
  }
};

export const getEvent = async (req, res) => {
  let { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch event", error });
  }
};

export const updateEvent = async (req, res) => {
  let { id } = req.params;
  try {
    if (req.file && req.file.path) {
      req.body.poster = req.file.path; // Set the new profile picture URL
    }

    const event = await Event.findByIdAndUpdate(id, req.body, { new: true });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      msg: "Event updated successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update event", error });
  }
};

export const deleteEvent = async (req, res) => {
  let { id } = req.params;
  try {
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete event", error });
  }
};
