import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "../utils/axios-instance";

export function setCookie(
  accessToken: string | undefined,
  refreshToken: string | undefined,
  userName: string | undefined
) {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  //Cookies.remove("userName");
  if (accessToken) {
    Cookies.set("access_token", accessToken, { expires: 1 });
  }
  if (refreshToken) {
    Cookies.set("refresh_token", refreshToken, { expires: 1 });
  }
  if(userName)
  {
    Cookies.set("userName", userName);
  }
}

const getTokensFromCookie = () => {
  const accessToken = Cookies.get("access_token");
  const refreshToken = Cookies.get("refresh_token");
  const userName = Cookies.get("userName");
  //Todo: Set Username

  return { accessToken, refreshToken };
};

const UserContext = React.createContext<any>(getTokensFromCookie());

export const UserContextProvider = (props: { children: React.ReactNode }) => {
  // const [tokens, setTokens] = useState<{
  //   accessToken?: string;
  //   refreshToken?: string;
  // }>(getTokensFromCookie());
  const [userSession, setUserSession] = useState<{
    accessToken?: string;
    refreshToken?: string;
    userId?: string;
    userName?:string;
    firstName? : string;
    lastName?: string;
  }>(getTokensFromCookie());

  const retrieveUserDetails = () => {
    const authorizationValue = "Bearer " + userSession.accessToken;
    const params = new URLSearchParams();
    if (userSession.accessToken) {
      params.append("accessToken", userSession.accessToken.toString());
    }

    const options = {
      method: "GET",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: authorizationValue,
      },
      params,
      url: "http://localhost:8080/api/v1/user/logged-in-user",
    };

    axios(options)
      .then((resp) => {
        console.log(resp);
        setUserSession((prev) => {
          return { ...prev, userId: resp.data.userId, firstName: resp.data.firstName, lastName: resp.data.lastName};
        });
      })
      .catch((err) => {
        console.error(err);
        setUserSession((prev) => {
          delete prev.userId; // ensure no userId
          return prev;
        });
      });
  };

  useEffect(() => {
    setCookie(userSession.accessToken, userSession.refreshToken,userSession.userName);
    if (userSession.refreshToken && userSession.accessToken) {
      retrieveUserDetails();
    }
  }, [userSession.refreshToken, userSession.accessToken, userSession.userName,userSession.firstName,userSession.lastName]);

  return (
    <UserContext.Provider value={{ userSession, setUserSession }}>
      {props.children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  return useContext(UserContext);
}

export default UserContext;
