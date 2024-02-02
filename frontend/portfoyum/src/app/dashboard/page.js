"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/user/userinfo")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user information");
        }
        return response.json();
      })
      .then((data) => setUserInfo(data))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center">
      {userInfo ? (
        <div>
          <h1>{userInfo.ad}</h1>
          <p>{userInfo.email}</p>
          {/* Diğer kullanıcı detaylarını buraya ekleyebilirsiniz */}
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </main>
  );
}
