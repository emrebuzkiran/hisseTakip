"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Token'i localStorage'den al
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://localhost:8080/api/user", {
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
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1>Dashboard</h1>
      {userInfo ? (
        <div>
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
