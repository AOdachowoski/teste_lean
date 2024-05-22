import axios from "axios";

export async function fetchListagem() {
  try {
    const response = await axios.get("http://localhost:3000/users");
    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
