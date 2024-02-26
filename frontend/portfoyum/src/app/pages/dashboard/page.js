"use client";

import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "@/app/components/CustomSidebar";
import isLogged from "@/app/components/isLogged";
import { useRouter } from "next/navigation";


const Dashboard = () => {
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
var ctx = document.getElementById("myChart");
    if (ctx && ctx.chart) {
      // If there is, destroy it
      ctx.chart.destroy();
    }
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["a", "b", "c", "d", "e", "f", "g", "h"],
        datasets: [
          {
            data: [
              //very waves data
              0, 45, 27, 35, 19, 65, 37, 100,
            ],
            label: "BTC",
            fill: false,
            pointStyle: "circle",
            pointRadius: 10,
            cubicInterpolationMode: "monotone",
            borderColor: "rgb(255,255,255)",
            backgroundColor: "rgb(0,0,0,0.1)",
          },
        ],
      },
      options: {
        
        maintainAspectRatio: false,
        plugins: {
          legend: false, // Hide legend
        },
        scales: {
          y: {
            display: false, // Hide Y axis labels
          },
          x: {
            display: false, // Hide X axis labels
          },
        },
      }});
    securePage();
    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
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
      <div className="w-screen h-fit my-auto mb-0  shadow-xl z-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <canvas id="myChart"></canvas>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
