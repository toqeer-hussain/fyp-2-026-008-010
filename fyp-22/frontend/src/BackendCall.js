import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:3000/" });

instance.interceptors.request.use((what) => {
  what.headers.common["x-access-token"] = JSON.parse(
    localStorage.getItem("token")
  );
  return what;
});

export default instance;
