import { useEffect, useState } from "react";
import supabase from "@/utils/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Eye, Camera, X, ChevronRight, ChevronLeft } from "lucide-react";

const Projects = () => {
  const IMAGE_PATH = import.meta.env.VITE_SUPABASE_BUCKET_URL;

  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [projects, setProjects] = useState<any[]>([]);

  const getProjects = async () => {
    try {
      const { data, error } = await supabase.from("projects").select("*");
      if (error) {
        throw error;
      }
      setProjects(data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const openScreenshots = (projectIndex: number) => {
    setSelectedProject(projectIndex);
    setCurrentImageIndex(0);
  };

  const closeScreenshots = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject !== null) {
      setCurrentImageIndex((prev) =>
        (prev + 1) % projects[selectedProject].screenshots.length
      );
    }
  };

  const prevImage = () => {
    if (selectedProject !== null) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? projects[selectedProject].screenshots.length - 1 : prev - 1
      );
    }
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Here are some of my recent projects that showcase my skills and expertise</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden bg-white/80 backdrop-blur-sm">
              <div onClick={() => openScreenshots(index)} className="cursor-pointer">
                <div className="relative overflow-hidden">
                  <img
                    src={`${IMAGE_PATH}screenshots/${project.image}`}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full font-medium cursor-default">
                      {project.category}
                    </span>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div onClick={() => openScreenshots(index)} className="cursor-pointer">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium cursor-grab"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2 hover:bg-blue-50 hover:border-blue-300"
                  >
                    <Eye size={16} />
                    <span>Live Demo</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2 hover:bg-gray-50"
                  >
                    <Github size={16} />
                    <span>Code</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedProject !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-lg overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold">
                  {projects[selectedProject].title} - Screenshots
                </h3>
                <button
                  onClick={closeScreenshots}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="relative">
                <img
                  src={`${IMAGE_PATH}screenshots/${projects[selectedProject].screenshots[currentImageIndex]}`}
                  alt={`${projects[selectedProject].title} screenshot ${currentImageIndex + 1}`}
                  className="w-full h-96 object-contain bg-gray-50"
                />

                {projects[selectedProject].screenshots.length > 1 && (
                  <>
                    <Button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                      variant="ghost"
                      size="sm"
                    >
                      <ChevronLeft className="w-4 h-4 text-black-600" />
                    </Button>
                    <Button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                      variant="ghost"
                      size="sm"
                    >
                      <ChevronRight className="w-4 h-4 text-black-600" />
                    </Button>
                  </>
                )}
              </div>

              <div className="p-4 border-t">
                <div className="flex justify-center space-x-2">
                  {projects[selectedProject].screenshots.map((_, imgIndex) => (
                    <button
                      key={imgIndex}
                      onClick={() => setCurrentImageIndex(imgIndex)}
                      className={`w-3 h-3 rounded-full ${imgIndex === currentImageIndex ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                    />
                  ))}
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">
                  {currentImageIndex + 1} of {projects[selectedProject].screenshots.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section >
  );
};

export default Projects;
