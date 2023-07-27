import axios from 'axios'
const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL

export const sendUserCredential = async (url, data) => {
  try {
    const response = await axios.post(BACKEND_URL + url, data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error // Re-throw the error to be caught by the calling function if needed
  }
}

export const sendTransaction = async (url, data) => {
  try {
    const response = await axios.post(BACKEND_URL + url, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
