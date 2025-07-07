import { useEffect, useState } from "react";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import supabase from "@/utils/supabase";

const Hero = () => {
  const IMAGE_PATH = import.meta.env.VITE_SUPABASE_BUCKET_URL;
  const [user, setUser] = useState({
    name: "Christian Kyle",
    title: "Software Engineer",
  });
  const [links, setLinks] = useState<any>({});
  const socialLinks = [
    { icon: Linkedin, href: links.linkedin_link || "#", label: "LinkedIn" },
    { icon: Github, href: links.github_link || "#", label: "GitHub" },
    { icon: Twitter, href: links.twitter_link || "#", label: "Twitter" },
    { icon: Mail, href: "#contact", label: "Email" },
  ];

  const getUserInfo = async () => {
    try {
      const { data, error } = await supabase.from("user_info").select("*").single();
      if (error) {
        throw error;
      }
      setUser({
        name: data.name,
        title: data.title,
      });
      setLinks(data.links);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (

    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1 space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="space-y-3 lg:space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                <span className="text-gray-900">Hi There,</span>
                <br />
                <span className="text-gray-900">I'm </span>
                <span className="bg-gradient-to-r from-gray-400 via-black bg-[length:400%_100%] animate-wave-colors to-white bg-clip-text text-transparent">
                  {user.name}
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 font-medium">
                I Am Into{" "}
                <span className="text-orange-500 font-semibold">
                  {user.title}
                </span>
              </p>
            </div>

            <Button
              size="lg"
              className="bg-gradient-to-r from-gray-600 to-black-600 hover:from-white hover:to-gray-700 text-white px-6 sm:px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 w-full sm:w-auto"
            >
              My Curriculum Vitae
            </Button>

            <div className="flex justify-center lg:justify-start space-x-3 sm:space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-200 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon size={18} className="sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-pulse opacity-20"></div>

              <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-2xl">
                <img
                  src={`${IMAGE_PATH}/profile-pic/main.png`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
