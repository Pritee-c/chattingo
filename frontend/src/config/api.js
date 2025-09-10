// src/config/api.js

if (!process.env.REACT_APP_API_URL || process.env.REACT_APP_API_URL.trim() === "") {
  throw new Error(
    "REACT_APP_API_URL is not defined! Set it in your .env file."
  );
}

export const BASE_API_URL = process.env.REACT_APP_API_URL;
export const WS_URL =
  process.env.REACT_APP_WS_URL && process.env.REACT_APP_WS_URL.trim() !== ""
    ? process.env.REACT_APP_WS_URL
    : `${BASE_API_URL}/ws`;

