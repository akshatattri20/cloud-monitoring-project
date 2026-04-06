const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

mongoose.connect("mongodb://127.0.0.1:27017/cloud-monitor")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const vmSchema = new mongoose.Schema({
  name: String,
  cpu: Number,
  cost: Number,
  createdAt: { type: Date, default: Date.now }
});

const providerSchema = new mongoose.Schema({
  name: String,
  cost: Number,
  createdAt: { type: Date, default: Date.now }
});

const VM = mongoose.model("VM", vmSchema);
const Provider = mongoose.model("Provider", providerSchema);

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.get("/api/vm-data", async (req, res) => {
  try {
    const vmData = [
      { name: "VM1", cpu: getRandom(0, 100), cost: getRandom(5, 25) },
      { name: "VM2", cpu: getRandom(0, 100), cost: getRandom(5, 25) },
      { name: "VM3", cpu: getRandom(0, 100), cost: getRandom(5, 25) }
    ];

    await VM.insertMany(vmData); 
    res.json(vmData);

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch VM data" });
  }
});

app.get("/api/provider-cost", async (req, res) => {
  try {
    const providerData = [
      { name: "AWS", cost: getRandom(50, 200) },
      { name: "Azure", cost: getRandom(50, 200) },
      { name: "GCP", cost: getRandom(50, 200) }
    ];

    await Provider.insertMany(providerData); // save to DB
    res.json(providerData);

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch provider cost" });
  }
});

app.get("/api/history", async (req, res) => {
  try {
    const vmHistory = await VM.find().sort({ createdAt: -1 }).limit(10);
    const providerHistory = await Provider.find().sort({ createdAt: -1 }).limit(10);

    res.json({ vmHistory, providerHistory });

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));