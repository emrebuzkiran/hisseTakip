"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import axios from "axios";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    const nameRegex = /^[a-zA-ZğüşıöçĞÜŞİÖÇ]+$/; // Accepts only letters
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/; // Strong password validation

    const isValidName = (name) => nameRegex.test(name);
    const isValidEmail = (email) => emailRegex.test(email);
    const isValidPassword = (password) => passwordRegex.test(password);

    isValidName(firstName) ? null : toast.error("Invalid first name!");
    isValidEmail(email) ? null : toast.error("Invalid email!");
    isValidPassword(password) ? null : toast.error("Invalid password!");

    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/register",
        {
          ad: firstName,
          soyad: lastName,
          email: email,
          sifre: password,
        }
      );
      toast.success("Registration successful!");
    } catch (error) {
      toast.error("Registration failed!");
      console.error(error);
    }
  };
  return (
    <main className="min-h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="bg-white text-black p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Your first name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Your last name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Already have an account?
          <Link href="/login" className="text-blue-500 hover:underline ml-1">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
