import dbConnect from "../../lib/mongodb";
import Site from "../../models/Sites";
import Cors from "cors";

const cors = Cors({
  methods: ["GET", "PUT", "POST", "DELETE"],
  origin: "*",
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  const { method, query } = req;
  const { id } = query;

  await runMiddleware(req, res, cors);

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        let sites;
        if (id) {
          const index = parseInt(id);
          sites = await Site.find({ index });
        } else {
          sites = await Site.find({});
        }
        res.status(200).json({ success: true, data: sites });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case "PUT":
      try {
        const { index } = req.body;

        const default_fields = {
          // general
          website_name: "String", //! important
          address: "String",
          phone_number: "String",
          email: "String",

          // Section 1
          hero_img: "String", //horizontal
          hero_text: "String",

          // Section 2
          section_2_img_1: "String", //vertical
          section_2_img_2: "String", //vertical

          // Section 3
          room_1_name: "String",
          room_1_img: "String", //vertical

          room_2_name: "String",
          room_2_img: "String", //vertical

          room_3_name: "String",
          room_3_img: "String", //vertical

          // Section 5
          parallax_bg_img: "String", //horizontal
        };

        const site = new Site({ index, ...default_fields });
        await site.save();
        res.status(201).json({ success: true, data: site });
      } catch (error) {
        console.log("err:", error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case "POST":
      try {
        const { index, ...updateFields } = req.body;

        if (!index) {
          res.status(400).json({ success: false, error: "Index is required" });
          return;
        }

        const site = await Site.findOne({ index: index });

        if (!site) {
          res.status(404).json({ success: false, error: "Site not found" });
          return;
        }

        // Actualizare doar a câmpurilor care nu sunt "index"
        Object.keys(updateFields).forEach((key) => {
          site[key] = updateFields[key];
        });

        await site.save();

        res.status(200).json({ success: true, data: site });
      } catch (error) {
        console.log("err:", error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case "DELETE":
      try {
        const { index } = req.body;

        if (!index) {
          res.status(400).json({ success: false, error: "Index is required" });
          return;
        }

        const site = await Site.findOneAndDelete({ index });

        if (!site) {
          res.status(404).json({ success: false, error: "Site not found" });
          return;
        }

        res.status(200).json({ success: true, data: site });
      } catch (error) {
        console.log("err:", error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
