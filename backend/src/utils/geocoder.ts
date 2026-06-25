import NodeGeoCoder, { type Options } from "node-geocoder";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEOCODER_API_KEY;
const options: Options = {
  provider: "opencage",
  apiKey: apiKey,
  formatter: null,
};

export const geocoder = NodeGeoCoder(options);
