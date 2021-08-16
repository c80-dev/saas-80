const express = require("express");
const router = new express.Router();

const Ticket = require("../models/tickets");

router.post("/tickets", async (req, res) => {
  const ticketId = Math.floor(10000 + Math.random() * 90000);
  const ticket = new Ticket({ ...req.body, ticketId: `${ticketId}` });

  try {
    await ticket.save();
    res.status(201).send({ message: "Ticket created successfully", ticket });
  } catch (e) {
    res.status(500).send({ error: "Ticket could not be created" });
  }
});

router.get("/tickets", async (req, res) => {
  try {
    const tickets = await Ticket.find({});
    res
      .status(200)
      .send({ message: `Fetched ${tickets.length} record(s)`, tickets });
  } catch (e) {
    res.status(500).send({ error: "Could not fetch tickets" });
  }
});

router.post("/tickets/:id", async (req, res) => {
  const ticketId = req.params.id;

  try {
    const ticket = await Ticket.find({
      ticketId,
    });

    if (ticket.length === 0) {
      res.status(404).send({ error: `Ticket not found` });
    }

    res.status(200).send({ message: `Ticket fetched successfully`, ticket });
  } catch (e) {
    if (e.name === "CastError")
      return res.status(404).send({ error: "Ticket not found" });
    res.status(500).send({ error: "Could not fetch the Ticket" });
  }
});

router.patch("/tickets/:id", async (req, res) => {
  const ticketId = req.params.id;
  const options = req.body;

  const updates = Object.keys(options);
  const allowedUpdates = ["response"];

  const log = [];

  updates.forEach((update) => {
    if (!allowedUpdates.includes(update)) log.push(update);
  });

  const isUpdateValid = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isUpdateValid)
    return res.status(400).send({
      error: `Invalid Operation, the field '${log[0]}' cannot be updated`,
    });

  try {
    const ticket = await Ticket.find({
      ticketId,
    });

    updates.forEach((update) => (ticket[0][update] = req.body[update]));
    ticket[0].status = "resolved";
    await ticket[0].save();
    res.status(200).send({ message: "Ticket updated successfully", ticket });
  } catch (e) {
    res.status(500).send({ error: "Could not update ticket", e });
  }
});

module.exports = router;
