const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateVMData() {
  return [
    { name: "VM1", cpu: getRandom(0, 100), cost: getRandom(5, 25) },
    { name: "VM2", cpu: getRandom(0, 100), cost: getRandom(5, 25) },
    { name: "VM3", cpu: getRandom(0, 100), cost: getRandom(5, 25) },
    { name: "VM4", cpu: getRandom(0, 100), cost: getRandom(5, 25) }
  ];
}

app.get("/api/vm-data", (req, res) => {
  try {
    const vmData = generateVMData();
    res.json(vmData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch VM data" });
  }
});

app.get("/api/provider-cost", (req, res) => {
  try {
    const providerData = [
      { name: "AWS", cost: getRandom(50, 200) },
      { name: "Azure", cost: getRandom(50, 200) },
      { name: "GCP", cost: getRandom(50, 200) }
    ];
    res.json(providerData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch provider cost" });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});