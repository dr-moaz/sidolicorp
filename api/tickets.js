let tickets = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, service, device, issue, priority } = req.body;

    const ticket = {
      id: Date.now(),
      name,
      email,
      service,
      device,
      issue,
      priority: priority || "Normal",
      status: "Pending",
      assignedTo: null,
      createdAt: new Date()
    };

    tickets.push(ticket);

    return res.status(200).json({
      success: true,
      message: "Ticket created successfully",
      ticket
    });
  }

  if (req.method === 'GET') {
    return res.status(200).json(tickets);
  }

  if (req.method === 'PUT') {
    const { id, status } = req.body;

    const ticket = tickets.find(t => t.id === id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.status = status;

    return res.status(200).json(ticket);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
