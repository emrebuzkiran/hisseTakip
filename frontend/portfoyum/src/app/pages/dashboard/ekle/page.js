"use client";

import Sidebar from "@/app/components/CustomSidebar";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import getUserData from "@/app/components/getUserData";
import { jwtDecode } from "jwt-decode";

export default function Ekle() {
  const [hisseListesi, setHisseListesi] = useState([]);
  const [secilenHisse, setSecilenHisse] = useState("");
  const [maliyet, setMaliyet] = useState("");
  const [miktar, setMiktar] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [userData, setUserData] = useState(null);

  const rawToken = document.cookie;
  const token = rawToken.substring("jwt=".length);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://doviz-api.onrender.com/api/borsaAll",
          { cache: "force-cache" }
        );
        const data = await response.json();
        console.log(data);
        const hisseler = data.data.map((hisse) => ({
          name: hisse.name,
          price: hisse.price,
        }));
        setHisseListesi(hisseler);

        const userData = await getUserData();
        setUserData(userData);
      } catch (error) {
        console.error("Veri alınamadı:", error);
      }
    }
    fetchData();
    setIsMounted(true);
  }, []);

  const handleChange = (e) => {
    const secilenHisse = e.target.value;
    const secilenHisseDetaylari = hisseListesi.find(
      (hisse) => hisse.name === secilenHisse
    );
    if (secilenHisseDetaylari) {
      const { name, price } = secilenHisseDetaylari;
      setSecilenHisse({ name, price });
    }
  };

  const handleMaliyetChange = (e) => {
    const maliyet = e.target.value;
    setMaliyet(maliyet);
  };

  const handleMiktarChange = (e) => {
    const miktar = e.target.value;
    setMiktar(miktar);
  };

  const handleEkle = async () => {
    try {
      // Örnek kullanıcı ID'si ve diğer bilgiler
      const user_id = userData.id;
      const hisse_ad = secilenHisse.name;
      const fiyat = parseFloat(secilenHisse.price.replace(",", "."));
      const maliyet_degeri = parseFloat(maliyet.replace(",", "."));
      const miktar_degeri = miktar;

      const data = {
        user_id,
        hisse_ad,
        fiyat,
        maliyet: maliyet_degeri,
        miktar: miktar_degeri,
      };

      const response = await axios.post(
        "http://localhost:8080/api/hisse/add",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Hisse eklenirken bir hata oluştu:", error);
      showErrorToast("Hisse eklenirken bir hata oluştu");
    }
    console.log("Seçilen Hisse:", secilenHisse.name);
    console.log("Fiyat:", secilenHisse.price);
    console.log("Maliyet:", maliyet);
    console.log("Miktar:", miktar);

    setSecilenHisse("");
    setMaliyet("");
    setMiktar("");
    showSuccessToast("Hisse başarıyla eklendi");
  };

  function showSuccessToast(message) {
    showToast(message, "success");
  }
  function showErrorToast(message) {
    showToast(message, "error");
  }
  function showToast(message, type) {
    toast[type](message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ToastContainer />
      <div class="fixed left-0 top-0 h-full">
        <Sidebar />
      </div>

      <div className="flex justify-center items-center ">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Hisse Seçiniz...</h1>
          <select
            className="p-2 text-black"
            onChange={handleChange}
            value={secilenHisse.name}
          >
            <option value="">Seçiniz...</option>
            {hisseListesi.map((hisse, index) => (
              <option key={index} value={hisse.name}>
                {hisse.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-screen-fit">
          <table className="w-full text-sm text-left rtl:text-right text-dark ">
            <thead class="text-xs text-black uppercase bg-white dark:bg-white ">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Hisse adı
                </th>
                <th scope="col" class="px-6 py-3">
                  Hisse fiyatı
                </th>
                <th scope="col" class="px-6 py-3">
                  Hisse maliyeti
                </th>
                <th scope="col" class="px-6 py-3">
                  Hisse miktarı
                </th>
                <th scope="col" class="px-6 py-3">
                  Ekle
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-white dark:border-dark">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-dark whitespace-nowrap dark:text-black"
                >
                  {secilenHisse.name}
                </th>
                <td class="px-6 py-4 text-dark whitespace-nowrap dark:text-black">
                  {secilenHisse.price}
                </td>
                <td class="px-6 py-4 text-dark whitespace-nowrap dark:text-black">
                  <input
                    type="text"
                    className="p-2 text-black"
                    placeholder="Maliyet"
                    value={maliyet}
                    onChange={handleMaliyetChange}
                  />
                </td>
                <td class="px-6 py-4 text-dark whitespace-nowrap dark:text-gray-400">
                  <input
                    type="text"
                    className="p-2 text-black"
                    placeholder="Miktar"
                    value={miktar}
                    onChange={handleMiktarChange}
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    className="bg-blue-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
                    onClick={handleEkle}
                  >
                    Ekle
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
