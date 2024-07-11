// src/pages/_app.js

import React, { useState, useEffect } from "react";
import "../globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
