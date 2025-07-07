import { useEffect, useState } from "react";
import supabase from "@/utils/supabase";
import { Card, CardContent } from "@/components/ui/card";
const Experience = () => {
  const [experiences, setExperiences] = useState([]);

  const getExperience = async () => {
    try {
      const { data, error } = await supabase.from("experiences").select("*");
      if (error) {
        throw error;
      }
      setExperiences(data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    getExperience();
  }, []);

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Experience</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600 hidden md:block"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative flex items-start">
                <div className="hidden md:flex absolute left-6 w-4 h-4 bg-white border-4 border-blue-600 rounded-full"></div>

                <div className="md:ml-16 w-full">
                  <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {exp.title}
                          </h3>
                          <p className="text-lg text-gray-600 font-medium">
                            {exp.company}
                          </p>
                        </div>
                        <div className={`inline-flex px-4 py-2 rounded-full bg-black text-white font-medium text-sm mt-2 lg:mt-0 w-fit`}>
                          {exp.period}
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
