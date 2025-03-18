import React from "react";
import banner from "../assets/images/hero.jpg";
import { FaLightbulb, FaCogs, FaChartLine, FaUsers } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'

const Features = () => {
  const navigate = useNavigate();
  return (
    <section className="py-16 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
      
      <div className="flex flex-wrap justify-center gap-8 px-8">
        <div className="bg-white p-6 rounded-2xl shadow-md w-72 flex flex-col items-center text-center">
          <FaLightbulb className="text-5xl text-black mb-4" />
          <h3 className="text-xl font-semibold mb-2">Unique Concepts</h3>
          <p className="text-gray-600">We bring you the most unconventional and creative titles.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md w-72 flex flex-col items-center text-center">
          <FaCogs className="text-5xl text-black mb-4" />
          <h3 className="text-xl font-semibold mb-2">Smooth Experience</h3>
          <p className="text-gray-600">Our platform ensures a seamless and hassle-free browsing experience.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md w-72 flex flex-col items-center text-center">
          <FaChartLine className="text-5xl text-black mb-4" />
          <h3 className="text-xl font-semibold mb-2">Growing Collection</h3>
          <p className="text-gray-600">New and exciting titles added regularly to keep you engaged.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md w-72 flex flex-col items-center text-center">
          <FaUsers className="text-5xl text-black mb-4" />
          <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
          <p className="text-gray-600">Your feedback and suggestions help shape our content.</p>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black text-white text-center p-6 mt-12">
      <p className="text-lg">© 2025 Worst Titles. All rights reserved.</p>
      <div className="flex justify-center space-x-6 mt-4">
        <a href="#" className="hover:text-gray-400">Facebook</a>
        <a href="#" className="hover:text-gray-400">Twitter</a>
        <a href="#" className="hover:text-gray-400">Instagram</a>
      </div>
    </footer>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="relative h-screen w-screen overflow-hidden">
        <img src={banner} alt="Hero" className="w-full h-full object-cover absolute" />
        <div className="w-full h-full bg-white/50 absolute"></div>
        <nav className="bg-black text-white p-4 flex justify-between items-center w-full fixed top-0 z-20">
          <div className="text-xl font-bold">Worst Titles</div>
          <ul className="flex space-x-6">
            <li><a href="#" className="hover:text-gray-400">Home</a></li>
            <li><a href="#" className="hover:text-gray-400">About</a></li>
            <li><a href="#" className="hover:text-gray-400">Services</a></li>
            <li><a href="#" className="hover:text-gray-400">Contact</a></li>
          </ul>
        </nav>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-8xl font-bold text-black">WORST TITLES</h1>
          <p className="text-3xl font-semibold text-gray-700 mt-4">Discover the most innovative and unconventional titles on the market today.</p>
          <button className="px-12 py-4 text-white font-semibold bg-black rounded-md hover:bg-gray-800 mt-6"
          onClick={() => navigate("/tittle-card")}>Explore Now</button>
        </div>
      </div>
      <Features />
      <Footer />
    </>
  );
};

export default LandingPage;