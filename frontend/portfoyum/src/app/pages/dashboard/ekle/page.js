"use client";

import Sidebar from "@/app/components/Sidebar";
import { useEffect, useState } from "react";
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
    <div className="flex">
      <Sidebar />
      <div className="collapse-box">
        <select value={secilenHisse} onChange={handleChange}>
          <option value="">Hisse Seçin</option>
          {hisseListesi.map((hisse) => (
            <option key={hisse.kod} value={hisse.kod}>
              {hisse.adi}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
