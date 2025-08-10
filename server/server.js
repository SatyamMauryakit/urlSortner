import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { nanoid } from "nanoid";
import Url from "./models/Url.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

// API: Shorten URL
app.post("/api/shorten", async (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) return res.status(400).json({ error: "URL is required" });

  const shortCode = nanoid(6);
  const newUrl = new Url({ originalUrl, shortCode });
  await newUrl.save();
  
  res.json({ shortUrl: `${process.env.BASE_URL}/${shortCode}` });
});

// API: Redirect
app.get("/:shortcode", async (req, res) => {
  const { shortcode } = req.params;
  const urlDoc = await Url.findOne({ shortCode: shortcode });
  if (urlDoc) return res.redirect(urlDoc.originalUrl);
  res.status(404).json({ error: "Not found" });
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
