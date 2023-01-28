import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export function setCookie(user: any) {
  Cookies.remove("user");
  Cookies.set("user", JSON.stringify(user), { expires: 1 });
}

const getCookie = () => {
  const cookie = Cookies.get("user");
  if (!cookie) {
    return {};
  } else {
    const userData = JSON.parse(cookie);
    return userData;
  }
};

const UserContext = React.createContext<any>(getCookie());

export const UserContextProvider = (props: {children: React.ReactNode}) => {

  const [userSession, setUserSession] = useState(getCookie());
  useEffect(() => {
    setCookie(userSession);
  }, [userSession]);

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
