import axios from "@/config/axios";
import { User } from "@/types/users";

export const getAllUsers = async () => {
  try {
    const response = await axios.get("users");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAnUserById = async (userId: string) => {
  try {
    const response = await axios.get(`users/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createAnUser = async (data: User) => {
  try {
    const { name, email, mobileNo, dateOfBirth } = data;

    const response = await axios.post("users", {
      name,
      email,
      mobileNo,
      dateOfBirth,
    });

    console.log("CMIG");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateAnUser = async (data: User) => {
  try {
    const { id, name, email, mobileNo, dateOfBirth } = data;

    const response = await axios.put(`users/${id}`, {
      name,
      email,
      mobileNo,
      dateOfBirth,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAnUser = async (data: User) => {
  try {
    const response = await axios.delete(`users/${data.id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
