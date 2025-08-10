import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import supabase from "@/utils/supabase";

const Skills = () => {
  const ICON_PATH = import.meta.env.VITE_SUPABASE_BUCKET_URL;

  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [techStack, setTechStack] = useState<{ name: string; image: string; }[]>([]);

  const duplicatedTechStack = [...techStack, ...techStack];

  const getUserSkills = async () => {
    try {
      const { data, error } = await supabase.from("skills").select("*");
      if (error) {
        throw error;
      }
      setTechStack(data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    getUserSkills();
  }, []);

  const slideLeft = () => {
    if (containerRef.current) {
      const scrollAmount = 200;
      containerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const slideRight = () => {
    if (containerRef.current) {
      const scrollAmount = 200;
      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    containerRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
    setIsDragging(false);
    setTimeout(() => setIsPaused(false), 1000);
  };

  const handleMouseLeave = () => {
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
    setIsDragging(false);
    setIsPaused(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTimeout(() => setIsPaused(false), 1000);
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 overflow-hidden min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">My Tech Stack</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">These are the technologies that I've been using</p>
        </div>

        <div className="relative group">
          <Button
            onClick={slideLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            variant="ghost"
            size="sm"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </Button>

          <Button
            onClick={slideRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            variant="ghost"
            size="sm"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </Button>

          <div
            ref={containerRef}
            className="overflow-x-auto overflow-y-hidden cursor-grab select-none"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => !isDragging && setIsPaused(true)}
          >
            <div
              className={`flex space-x-8 ${!isPaused && !isDragging ? 'animate-scroll-left' : ''}`}
              style={{
                animationPlayState: isPaused || isDragging ? 'paused' : 'running',
                width: 'max-content'
              }}
            >
              {duplicatedTechStack.map((tech, index) => (
                <div
                  key={`${tech.name}-${index}`}
                  className="flex-shrink-0 group/card"
                >
                  <Card className="w-24 h-24 hover:shadow-lg transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-2 hover:border-blue-200">
                    <CardContent className="p-4 h-full flex flex-col items-center justify-center">
                      <div className={`text-3xl mb-2 text-gray-800 group-hover/card:scale-125 transition-transform duration-300`}>
                        <img src={`${ICON_PATH}/skills-icon/${tech.image}`} alt={tech.name} />
                      </div>
                      <span className="text-xs font-medium text-gray-700 text-center group-hover/card:text-gray-900 transition-colors">
                        {tech.name}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="w-2 h-2 bg-blue-400 rounded-full absolute top-1/4 left-1/4 animate-pulse opacity-60"></div>
          <div className="w-1 h-1 bg-purple-400 rounded-full absolute top-3/4 right-1/4 animate-pulse opacity-40 delay-1000"></div>
          <div className="w-3 h-3 bg-cyan-300 rounded-full absolute bottom-1/4 left-1/3 animate-pulse opacity-50 delay-500"></div>
        </div>
      </div>

      <style>{`
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Skills;
