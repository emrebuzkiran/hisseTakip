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
  
  useEffect(() => {
    const securePage = async () => {
      const loggedin = await isLogged()
      if (!loggedin){
        console.log("User is not logged in");
        router.push("/auth/login");
      }else{
        setLoading(false);
        console.log("User is logged in");
        }
    
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
