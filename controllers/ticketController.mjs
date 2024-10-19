import Ticket from "../models/ticketModel.mjs";
import Event from "../models/eventModel.mjs";
import Stripe from "stripe";
import crypto from "crypto";

export const buyTicket = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const eventId = req.params.id;
  const { id } = req.user;
  const { paymentMethodId } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ msg: "Event is sold out or does not exist" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: event.price * 100,
      currency: "usd",
      payment_method: "pm_card_visa",
      automatic_payment_methods: { enabled: true, allow_redirects: "never" },
      confirm: true,
    });

    console.log("paymentIntent", paymentIntent);
    if (paymentIntent.status === "succeeded") {
      event.ticketAvailable -= 1;
      await event.save();

      //generate unique ticket number

      const ticketNumber = crypto.randomBytes(16).toString("hex");

      //create ticket

      const ticket = await Ticket.create({
        event: eventId,
        buyer: id,
        pricePaid: event.price,
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
