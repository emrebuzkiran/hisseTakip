"use client";

import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

const isLogged = async () => {
  const rawToken = document.cookie;
  const token = rawToken.substring("jwt=".length);
  console.log(token);

  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log(decoded);
      const expirationDate = decoded.exp;
      const currentTimestamp = Math.floor(new Date().getTime() / 1000);

      if (currentTimestamp > expirationDate) {
        document.cookie = "jwt= ; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        console.log("Token süresi dolmuş");
        return false; // Token süresi dolmuş
      } else {
        // Token geçerli görünüyor
        console.log("Token geçerli görünüyor");
        return true;
      }
    } catch (error) {
      // Token geçersiz
      console.error("Token geçersiz");
      return false;
    }
  } else {
    // Token yok
    console.error("Token yok");
    return false;
  }
};
export default isLogged;
