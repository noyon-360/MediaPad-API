const NoteModel = require("../Models/Note");
const aiAgent = require("../AI/aiAgent");

const command = async (req, res) => {
  const { command } = req.body;
  if (!command) {
    return res.status(400).json({ error: "Command is required." });
  }
  const response = await aiAgent(command, req);
  res.json({ response });
};

module.exports = {
  command,
};
