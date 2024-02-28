"use client";

import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "@/app/components/CustomSidebar";
import isLogged from "@/app/components/isLogged";
import { useRouter } from "next/navigation";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";


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
    
    securePage();

  }, []);

  const labels = ["January", "February", "March", "April", "May", "June"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "My Second dataset",
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        backgroundColor: "rgb(54, 162, 235)",
        borderColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex">
        <div className="fixed left-0 top-0 bottom-0 overflow-y-auto w-64">
          <Sidebar />
        </div>
        <div className="flex justify-center items-center flex-grow">
          <div className="shadow-md rounded my-6 px-8 py-8">
            <div className="h-60 w-96">
              <Line data={data} />
            </div>
            <table className="table-auto border divide-x-2">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Hisse</th>
                  <th className="px-4 py-2 border">Fiyat</th>
                  <th className="px-4 py-2 border">Miktar</th>
                  <th className="px-4 py-2 border">Maliyet</th>
                  <th className="px-4 py-2 border">Kazanç</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
