"use client";

import Sidebar from "@/app/components/CustomSidebar";
import isLogged from "@/app/components/isLogged";
import axios from "axios";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import getUserData from "@/app/components/getUserData";
import { getTokenData } from "@/app/components/cookie";


const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [response, setResponse] = useState([]);
  const {token} = getTokenData();
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

  useEffect(() => {
    const getStockData = async () => {
      try{

        const userData = await getUserData();
        setUserData(userData.data);
        console.log(userData.id);
        
        const response = await axios.get(
          `http://localhost:8080/api/hisse/get/${userData.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setResponse(response.data);
      } catch (error) {
        console.error(error);
      }};

    getStockData();

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
              <tbody>
                {response.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border">{item.hisse_ad}</td>
                    <td className="px-4 py-2 border">{item.fiyat}</td>
                    <td className="px-4 py-2 border">{item.miktar}</td>
                    <td className="px-4 py-2 border">{item.maliyet}</td>
                    <td className="px-4 py-2 border"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
