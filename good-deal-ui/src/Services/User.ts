import Resources from "../resources.json";
import axiosApiInstance from "@/contexts/AxiosApiInstance";
import { AxiosResponse } from "axios";
import User from "@/models/User";

//Gets all the user info from the backend
export default async function getUserInfo() {
  try {
    const response: AxiosResponse = await axiosApiInstance.get(
      `/api/user/me`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching auth status:", error);
    return;
  }
}

async function saveUserInfo(user: User) {
    try {
    const response: AxiosResponse = await axiosApiInstance.patch(
      `/api/user/me`,
      user
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user", error);
    return;
  
  }
}
export {saveUserInfo};

