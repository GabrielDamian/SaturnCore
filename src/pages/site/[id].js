import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../style/Site.module.css";

export default function Sites() {
  const router = useRouter();
  const { id } = router.query;

  const [site, setSite] = useState(null);

  const ignoreFields = ["index", "_id", "__v"];

  const handleInputChange = (key, value) => {
    setSite((prev) => {
      let copy = { ...prev };
      copy[key] = value;
      return copy;
    });
  };

  const handleSave = async () => {
    let sanitizeObject = { ...site };
    delete sanitizeObject["_id"];
    delete sanitizeObject["__v"];

    try {
      let res = await axios.post("/api/site", {
        ...sanitizeObject,
      });

      window.location.reload();
    } catch (err) {
      window.alert("Error update field!");
      console.log("err:", err);
    }
  };

  useEffect(() => {
    if (id) {
      const fetchSite = async () => {
        try {
          const response = await axios.get(`/api/site?id=${id}`);
          if (response.data.data.length > 0) {
            setSite(response.data.data[0]);
          }
        } catch (error) {
          console.log("error:", error);
        }
      };
      fetchSite();
    }
  }, [id]);

  return (
    <div className={styles.container}>
      {site === null ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3>Name: #{site.index}</h3>
          {Object.keys(site).map((key, index) => {
            if (!ignoreFields.includes(key)) {
              return (
                <div className={styles.row} key={index}>
                  <p>{key}</p>
                  <input
                    type="text"
                    value={site[key]}
                    onChange={(e) => {
                      handleInputChange(key, e.target.value);
                    }}
                  />
                </div>
              );
            }
          })}
          <br />
          <br />
          <button onClick={handleSave}>SAVE</button>
        </>
      )}
    </div>
  );
}
