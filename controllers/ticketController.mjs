import Ticket from "../models/ticketModel.mjs";
import Event from "../models/eventModel.mjs";
import Stripe from "stripe";
import crypto from "crypto";

export const buyTicket = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const eventId = req.params.id;
  const { id } = req.user;
  const { paymentMethodId, ticketType } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event || event.ticketAvailable <= 0) {
      return res
        .status(404)
        .json({ msg: "Event is sold out or does not exist" });
    }

    const selectedTicket = event.ticketTypes.find(
      (type) => type.name === ticketType
    );

    if (!selectedTicket) {
      return res.status(404).json({ msg: "Ticket type does not exist" });
    }
    if (selectedTicket.quantity <= 0) {
      return res.status(404).json({ msg: "Ticket type is sold out" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: selectedTicket.price * 100,
      currency: "usd",
      payment_method: paymentMethodId,
      automatic_payment_methods: { enabled: true, allow_redirects: "never" },
      confirm: true,
    });

    if (paymentIntent.status === "succeeded") {
      selectedTicket.quantity -= 1;
      await event.save();

      //generate unique ticket number

      const ticketNumber = crypto.randomBytes(16).toString("hex");

      //create ticket

      const ticket = await Ticket.create({
        event: eventId,
        buyer: id,
        pricePaid: selectedTicket.price,
        ticketType: selectedTicket.name,
        ticketNumber,
      });

      return res
        .status(201)
        .json({ message: "Ticket purchased successfully", ticket });
    } else {
      return res.status(400).json({ msg: "Payment failed" });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const getTickets = async (req, res) => {
  const { id } = req.user;

  try {
    const tickets = await Ticket.find({ buyer: id }).populate("event");

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
