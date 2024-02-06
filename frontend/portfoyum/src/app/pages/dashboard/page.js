"use client";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState(null);
  let rawToken = document.cookie;
  let token = rawToken.substring("jwt=".length);
  const currentTimestamp = Math.floor(new Date().getTime() / 1000);
  const decoded = jwtDecode(token);
  
  useEffect(() => {
    
    const expirationDate = decoded.exp;
    const username = decoded.sub;
    


    if (currentTimestamp > expirationDate) {
      window.location.href = "/auth/login";
      return;
    } else {
      if (token) {
        axios
          .get(`http://localhost:8080/api/user/${username}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {

            setUserInfo(response.data);
          })
          .catch((error) => {
            console.error(
              "Kullanıcı bilgileri alınamadı. Token geçersiz olabilir."
            );
            console.error(error);
          });
      }
    }
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1>Dashboard</h1>
      {userInfo ? (
        <div className="">
          <p>Name: {userInfo.username}</p>
          <p>Email: {userInfo.email}</p>
          {/* Diğer kullanıcı bilgilerini buraya ekleyebilirsin */}
        </div>
      ) : (
        <p>Kullanıcı bilgileri yükleniyor...</p>
      )}
    </main>
  );
}
