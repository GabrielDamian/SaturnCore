// models/Site.js
import mongoose from "mongoose";

const SiteSchema = new mongoose.Schema({
  index: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Site || mongoose.model("Site", SiteSchema);
