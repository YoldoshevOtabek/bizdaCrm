
import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_BASE_URL
})

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("crmAccessToken")
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  if (config.data instanceof FormData) {
    config.headers.delete("Content-Type")
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (err) => {

     if (err.response?.status === 401) {
          localStorage.removeItem("crmAccessToken")
          localStorage.removeItem("crmRefreshToken")
          localStorage.removeItem("bizdacrmuser")
        //   localStorage.removeItem("crmAccessToken")
          window.location.href = "/login"
          return Promise.reject(err);
        }
    return Promise.reject(err);
  }
);


export default api
