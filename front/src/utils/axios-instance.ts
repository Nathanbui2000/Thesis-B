import axios, { AxiosInstance } from "axios";
import cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
let instance: AxiosInstance;

if (process.env.NODE_ENV === "development") {
  instance = axios.create();
  instance.defaults.baseURL = process.env.REACT_APP_COURSEMANIA_API;
} else {
  instance = axios.create();
}
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error.response.status;
    const orginialRequest = error.config;

    if (
      status === 403 &&
      error.response.data.error_message.includes("The Token has expired")// TODO nathan to double check this
    ) {
      console.log("Request Sent --> Recieve Token expired Message ");
      let auth = cookie.get("refresh_token")
        ? cookie.get("refresh_token")
        : null;
      axios({
        method: "get",
        url: "http://localhost:8080/api/v1/user/token/refresh-token",
        headers: {
          Authorization: "Bearer " + auth,
        },
      })
        .then((response) => {
          console.log("Refresh Token Method Called");
          console.log(response);
          // Store New Token Into Cookie
          cookie.set("access_token", response.data.access_Token);
          cookie.set("refresh_token", response.data.refresh_token);
          error.config.headers["Authorization"] =
            "Bearer " + cookie.get("access_token");
          console.log("call Request Again, After Refresh Token");

          instance(orginialRequest);
        })
        .catch((error) => {
          //? Refresh_Token Expired
          alert("Token Expired, PLease Login Again");
          cookie.set("access_token", "");
          cookie.set("refresh_token", "");
          NavigateLogin();
        });
    }
    return Promise.reject(error);
  }
);
const NavigateLogin = () => {
  const navigate = useNavigate();
  navigate("/login");
};
export default instance;