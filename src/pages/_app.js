// src/pages/_app.js

import React, { useState, useEffect } from "react";
import "../globals.css";
import Link from "next/link";

const MyApp = ({ Component, pageProps }) => {
  return (
    <div>
      <Link href="/add">Home</Link>
      <br />
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
