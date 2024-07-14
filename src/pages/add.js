import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./style/Add.module.css";

export default function Add() {
  const [indexValue, setIndexValue] = useState("");

  const [sites, setSites] = useState([]);

  const handleSubmit = async () => {
    if (indexValue.trim() === "") {
      window.alert("Index can't be emtpy!");
      return;
    }

    try {
      const res = await axios.put("/api/site", { index: indexValue });
      fetchSites();
    } catch (err) {
      window.alert("Error add new site");
      console.log(err);
    }
  };

  const fetchSites = async () => {
    try {
      const response = await axios.get("/api/site");
      setSites(response.data.data);
    } catch (error) {
      console.log("error:", error);
    }
  };

  const deleteItem = async (index) => {
    window;
    if (window.confirm(`Delete index:${index}`)) {
      try {
        let res = await axios.delete("/api/site", {
          data: { index: parseInt(index) },
        });
        window.location.reload();
      } catch (err) {
        window.alert("Can't delete item!");
      }
    }
  };
  useEffect(() => {
    fetchSites();
  }, []);

  return (
    <div className={styles.container}>
      <h3>Add new website core:</h3>
      <input
        type="text"
        value={indexValue}
        onChange={(e) => {
          setIndexValue(e.target.value);
        }}
        placeholder="New index value..."
      ></input>

      <button onClick={handleSubmit}>ADD</button>
      <h3>Sites</h3>
      {sites.map((site) => (
        <div key={site._id}>
          <a href={`/site/${site.index}`}>Index: {site.index}</a>
          <button
            style={{ marginLeft: "20px" }}
            onClick={() => {
              deleteItem(site.index);
            }}
          >
            Delete
          </button>
          <a
            target="_blank"
            style={{ marginLeft: "20px" }}
            href={`https://magnus-${site.index}-magic.netlify.app/`}
          >
            LINK
          </a>
        </div>
      ))}
    </div>
  );
}
