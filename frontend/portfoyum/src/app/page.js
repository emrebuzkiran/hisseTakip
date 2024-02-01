"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import Chart from "chart.js/auto";

export default function Home() {
  useEffect(() => {
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
      },
    });
    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, []);

  return (
    <>
      {/* Filled line chart */}

      <div className=" h-screen flex mx-auto my-auto">
        <div className="w-screen h-fit my-auto mb-0  shadow-xl z-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <canvas id="myChart"></canvas>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-white">Portfoyum</h1>
          <div className="flex space-x-4 mt-5">
            <Link
              className="bg-white text-black px-4 py-2 rounded-lg"
              href="/login"
            >
              Login
            </Link>
            <Link
              className="bg-black-500 text-white px-4 py-2 rounded-lg"
              href="/about"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
