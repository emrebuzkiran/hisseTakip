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
import { Height } from "@mui/icons-material";

const test = () => {
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const labels = ["January", "February", "March", "April", "May", "June"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        data: [65, 59, 80, 81, 56, 555],
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "My Second dataset",
        data: [28, 48, 40, 19, 86, 27],
        fill: false,
        backgroundColor: "rgb(54, 162, 235)",
        borderColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="flex">
        <div className="fixed left-0 top-0 bottom-0 overflow-y-auto w-64">
          <Sidebar />
        </div>
        <div className="flex justify-center items-center flex-grow">
          <div className="shadow-md rounded my-6 px-8 py-8">
            <Line data={data} style={{ width: "770px", height: "90px" }} />

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
export default test;
