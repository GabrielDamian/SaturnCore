import mongoose from "mongoose";

const SiteSchema = new mongoose.Schema({
  index: Number,
  website_name: String,

  hero_img: String,

  section_2_img_1: String,
  section_2_img_2: String,

  room_1_name: String,
  room_1_img: String,

  room_2_name: String,
  room_2_img: String,

  room_3_name: String,
  room_3_img: String,

  parallax_bg_img: String,
});

export default mongoose.models.Site || mongoose.model("Site", SiteSchema);
