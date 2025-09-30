import axios from "axios";

const API_URL = "https://api.spacexdata.com/v4";

// Function to get all launches
export const getLaunches = async () => {
  const response = await axios.get(`${API_URL}/launches`);
  return response.data;
};
