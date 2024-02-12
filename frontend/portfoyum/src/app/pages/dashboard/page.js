"use client";

import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import isLogged from "@/app/components/isLogged";
import { useRouter } from "next/navigation";


const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  // let rawToken = document.cookie;
  // let token = rawToken.substring("jwt=".length);
  // const currentTimestamp = Math.floor(new Date().getTime() / 1000);
  // const decoded = jwtDecode(token);
  
  useEffect(() => {
    // const expirationDate = decoded.exp;
    // const username = decoded.sub;
    const securePage = async () => {
      const loggedin = await isLogged()
      if (!loggedin){
        console.log("User is not logged in");
      }else{
        setLoading(false);
        console.log("User is logged in");
        }
    
    // if (currentTimestamp > expirationDate) {
    //   window.location.href = "/auth/login";
    //   return;
    // } else {
    //   if (token) {
    //     axios
    //       .get(`http://localhost:8080/api/user/${username}`, {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       })
    //       .then((response) => {

    //         setUserInfo(response.data);
    //       })
    //       .catch((error) => {
    //         console.error(
    //           "Kullanıcı bilgileri alınamadı. Token geçersiz olabilir."
    //         );
    //         console.error(error);
    //       });
    //   }
    // }
        }
    securePage();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        
        <h1 className="text-2xl font-bold">Dashboard</h1>
        
      </div>
    </div>
  );
}
export default Dashboard;
