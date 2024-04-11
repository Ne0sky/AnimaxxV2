import dotenv from "dotenv";
dotenv.config();

const cors = {
  origin: process.env.CORS_ORIGIN.split(","),
  credentials: true,
};

export default cors;
