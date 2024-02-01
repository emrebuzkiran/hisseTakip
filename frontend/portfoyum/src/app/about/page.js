"use client";

import React, { useEffect } from "react";
import Chart from "chart.js/auto";

export default function About() {
  useEffect(() => {
    var ctx = document.getElementById("myChart");
    if (ctx && ctx.chart) {
      // If there is, destroy it
      ctx.chart.destroy();
    }
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        datasets: [
          {
            data: [
              39556.4, 39888.8, 40086.0, 39935.7, 41811.3, 42120.9, 42030.7,
            ],
            label: "BTC",
            fill: true,
            cubicInterpolationMode: "monotone",
            borderColor: "rgb(247,147,26)",
            backgroundColor: "rgb(62,149,205,0.1)",
          },
        ],
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

      <div className="w-[1100px] h-screen flex mx-auto my-auto">
        <div className=" w-full h-fit my-auto  shadow-xl">
          <canvas id="myChart"></canvas>
        </div>
      </div>
    </>
  );
}
