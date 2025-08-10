
import supabase from "@/utils/supabase";
import { useEffect, useState } from "react";
import FaultyTerminal from "./react-bits/FaultyTerminal";

const imagePath = import.meta.env.VITE_SUPABASE_BUCKET_URL;

const About = () => {
  const [description, setDescription] = useState([]);

  const getUserInfo = async () => {
    try {
      const { data, error } = await supabase.from("user_info").select("*").single();
      if (error) {
        throw error;
      }
      const arrayDescription = data.description.split("\n");
      setDescription(arrayDescription);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-lg font-medium text-gray-600 mb-2">About</h3>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="relative flex justify-center lg:justify-start">
              <div className="relative">
                <div className="absolute -top-0 -left-0 w-80 h-96 bg-gray-600 rounded-3xl transform rotate-12 opacity-90"></div>

                <div className="relative z-10 w-80 h-96 bg-gray-200 rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={`${imagePath}/profile-pic/about-me-2.jpg`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4 text-gray-700 leading-relaxed">
                {description.map((line, index) => (
                  <p key={index} className="text-justify">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  );
};

export default About;
