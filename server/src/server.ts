import dotenv from "dotenv";
dotenv.config();

import app from "./app";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("Environment variables loaded:", {
    hasAccessSecret: !!process.env.JWT_ACCESS_SECRET,
    hasRefreshSecret: !!process.env.JWT_REFRESH_SECRET,
  });
});
