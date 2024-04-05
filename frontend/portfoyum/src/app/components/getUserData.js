import axios from "axios";
import { jwtDecode } from "jwt-decode";

async function getUserData() {
  try {
    const rawToken = document.cookie;
    const token = rawToken.substring("jwt=".length);
    const decoded = jwtDecode(token);
    const username = decoded.sub;
    

    const response = await axios.get(
      `http://localhost:8080/api/user/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("User data error", error);
    return null;
  }
}
export default getUserData;
