import mongoose from "mongoose";

const SiteSchema = new mongoose.Schema({
  index: Number,
  // general
  website_name: String, //! important
  address: String,
  phone_number: String,
  email: String,

  // Section 1
  hero_img: String, //horizontal
  hero_text: String,

  // Section 2
  section_2_img_1: String, //vertical
  section_2_img_2: String, //vertical

  // Section 3
  room_1_name: String,
  room_1_img: String, //vertical

  room_2_name: String,
  room_2_img: String, //vertical

  room_3_name: String,
  room_3_img: String, //vertical

  // Section 5
  parallax_bg_img: String, //horizontal
});

export default mongoose.models.Site || mongoose.model("Site", SiteSchema);
