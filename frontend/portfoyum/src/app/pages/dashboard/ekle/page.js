"use client";

import Sidebar from "@/app/components/CustomSidebar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Ekle() {
  const [hisseListesi, setHisseListesi] = useState([]);
  const [secilenHisse, setSecilenHisse] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://doviz-api.onrender.com/api/borsaAll"
        );

        // Hisse adlarını al
        const hisseAdlari = response.data.data.map((hisse) => hisse.Name[0]);
        setHisseListesi(hisseAdlari);
      } catch (error) {
        console.error("Veri alınamadı:", error);
      }
    }
    fetchData();
    setIsMounted(true);
  }, []); 

  const handleChange = (e) => {
    setSecilenHisse(e.target.value);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div class="fixed left-0 top-0 h-full">
        <Sidebar />
      </div>

      <div className="flex justify-center items-center ">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            Hisse Seçiniz...
          </h1>
          <select className="p-2 text-black" onChange={handleChange} value={secilenHisse}>
            <option value="">Seçiniz...</option>
            {hisseListesi.map((hisse, index) => (
              <option key={index} value={hisse}>
                {hisse}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
