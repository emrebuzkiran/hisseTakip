"use client";

import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "@/app/components/CustomSidebar";
import isLogged from "@/app/components/isLogged";
import { useRouter } from "next/navigation";
import Chart from "chart.js/auto";


const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const securePage = async () => {
      const loggedin = await isLogged();
      if (!loggedin) {
        console.log("User is not logged in");
        router.push("/auth/login");
      } else {
        setLoading(false);
        console.log("User is logged in");
      }
    };
    const ctx = document.getElementById('myChart');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
              label: 'My First Dataset',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
          }
        });
      
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
        <canvas id="myChart" width="400" height="400"></canvas>
      </div>
    </div>
  );
};
export default Dashboard;
