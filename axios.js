import { default as Axios } from "axios";

const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  paramsSerializer: {
    indexes: null,
  },
  // header.token is set in AppProvider.tsx
});

export default axios;
