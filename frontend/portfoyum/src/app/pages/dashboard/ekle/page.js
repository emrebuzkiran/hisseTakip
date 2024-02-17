"use client";

import Sidebar from "@/app/components/CustomSidebar";
import { useEffect, useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import axios from "axios";

export default function Ekle() {
  const [hisseListesi, setHisseListesi] = useState([]);
  const [secilenHisse, setSecilenHisse] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://bigpara.hurriyet.com.tr/api/v1/hisse/list"
        );
        setHisseListesi(response.data);
      } catch (error) {
        console.error("Veri alınamadı:", error);
      }
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    setSecilenHisse(e.target.value);
  };

  return (
    <>
      <div class="fixed left-0 top-0 h-full">
        <Sidebar />
      </div>

      <div className="flex justify-center items-center h-screen mt-0">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            Select Box Sayfanın Ortasında ve Üstünde
          </h1>
          <select className="p-2 text-black">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </div>
      </div>
    </>
  );
}
