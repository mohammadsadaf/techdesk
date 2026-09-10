const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/analyze", async (req, res) => {
  try {
    const { problem } = req.body;

    if (!problem) {
      return res.status(400).json({
        error: "Please enter an IT problem.",
      });
    }

    const prompt = `
You are an IT help desk technician.

Analyze the IT problem below.

Return ONLY valid JSON.
Do not use markdown.
Do not use backticks.
Do not include any extra explanation outside the JSON.

Use exactly this format:

{
  "category": "Network",
  "priority": "Medium",
  "possibleCause": "Short explanation here",
  "troubleshootingSteps": [
    "Step 1",
    "Step 2",
    "Step 3"
  ],
  "suggestedResponse": "Short professional response here"
}

For category, choose only one:
Network, Hardware, Software, Account Access, Security, Printer, Other.

For priority, choose only one:
Low, Medium, High.

Give 3 to 5 troubleshooting steps.

If the problem is security-related or requires administrator access, recommend escalation when appropriate.

IT problem:
${problem}
`;

    const response = await openai.responses.create({
      model: "gpt-5.6-luna",
      input: prompt,
    });

    const analysis = JSON.parse(response.output_text);

    res.json({
    result: analysis,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "TechDesk could not analyze the problem.",
    });
  }
});

app.listen(3000, () => {
  console.log("TechDesk server is running on http://localhost:3000");
});