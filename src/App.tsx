import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  ChevronDown,
  Building2,
  Home,
  Users,
  Award
} from 'lucide-react';

// --- Types ---
interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  year: string;
}

// --- Mock Data ---
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Urban Harmony Tower",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070",
    year: "2023"
  },
  {
    id: 2,
    title: "The Minimalist Villa",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070",
    year: "2022"
  },
  {
    id: 3,
    title: "Cultural Arts Center",
    category: "Public",
    image: "https://images.unsplash.com/photo-1503387762-592dee58292b?auto=format&fit=crop&q=80&w=2070",
    year: "2024"
  },
  {
    id: 4,
    title: "Eco-Friendly Office Park",
    category: "Office",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069",
    year: "2023"
  },
  {
    id: 5,
    title: "Luxury Waterfront Suites",
    category: "Hospitality",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2070",
    year: "2021"
  },
  {
    id: 6,
    title: "Modern Library Extension",
    category: "Education",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=2070",
    year: "2024"
  }
];

const SERVICES = [
  {
    title: "Architectural Design",
    description: "Creating spaces that balance form, function, and human experience.",
    icon: <Building2 className="w-6 h-6" />
  },
  {
    title: "Urban Planning",
    description: "Designing sustainable environments for future generations.",
    icon: <MapPin className="w-6 h-6" />
  },
  {
    title: "Interior Design",
    description: "Crafting meaningful interiors that resonate with the architectural soul.",
    icon: <Home className="w-6 h-6" />
  },
  {
    title: "Consulting",
    description: "Expert guidance from concept to completion for complex projects.",
    icon: <Users className="w-6 h-6" />
  }
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass-nav py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex flex-col items-start leading-none w-fit">
  <img 
    src="/images/logo.png" 
    alt="DNA Architects & Engineers" 
     className="h-4 sm:h-5 md:h-6 w-auto object-contain block self-start"
  />
   <span className={`mt-1 block w-full text-left text-[8.7px] font-sans tracking-[0.18em] whitespace-nowrap opacity-70 transition-colors duration-300 ${
  scrolled ? "text-black" : "text-white"
}`}>
    ARCHITECTS, PLANNERS, ENGINEERS
  </span>
</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-12 items-center">
          {['Projects', 'Services', 'About', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-sm uppercase tracking-widest hover:text-brand-accent transition-colors"
            >
              {item}
            </a>
          ))}
          <button className="px-6 py-2 border border-brand-dark text-xs uppercase tracking-widest hover:bg-brand-dark hover:text-brand-light transition-all">
            Inquiry
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-brand-light border-b border-brand-dark/10 p-8 flex flex-col space-y-6 md:hidden"
          >
            {['Projects', 'Services', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-lg font-serif italic hover:text-brand-accent"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const heroImages = [
    "/images/main-1.png",
    "/images/main-2.png",
    "/images/main-3.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex items-center overflow-hidden">

      {/* 🔥 배경 이미지 (겹쳐서 크로스페이드) */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((img, index) => (
          <img
            key={img}
            src={img}
            className={`absolute inset-0 w-full h-full object-cover grayscale-[0.3] transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-brand-dark/40" />
      </div>

      {/* 🔥 텍스트 */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-brand-light">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-sm uppercase tracking-[0.5em] mb-4 block opacity-80">
            Established 2006
          </span>

          <h1 className="text-6xl md:text-8xl font-serif leading-tight mb-8">
            Designing <br />
            <span className="italic">Future Heritage</span>
          </h1>

          <p className="max-w-xl text-lg opacity-80 mb-12 font-light leading-relaxed">
            (주)디앤에이건축사사무소는 공간의 본질을 탐구하며,
            시간이 흘러도 변치 않는 가치를 지닌 건축을 제안합니다.
          </p>

          <button className="px-10 py-4 bg-brand-light text-brand-dark text-sm uppercase tracking-widest hover:bg-brand-accent hover:text-brand-light transition-all">
            View Projects
          </button>
        </motion.div>
      </div>

      {/* 🔥 하단 점 표시 */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {heroImages.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              index === currentIndex
                ? "bg-white scale-125"
                : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

const ProjectsGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "F&B",
    "Retail",
    "Public",
    "Office",
    "Industrial",
    "Housing",
    "Etc",
  ];

  const primaryCategories = categories.filter((category) => category !== "All" && category !== "Etc");

  const filteredProjects = PROJECTS.filter((project) => {
    if (selectedCategory === "All") return true;
    if (selectedCategory === "Etc") {
      return !primaryCategories.includes(project.category);
    }
    return project.category === selectedCategory;
  });

  return (
    <section id="projects" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-brand-accent text-sm uppercase tracking-widest mb-4 block">Our Portfolio</span>
            <h2 className="text-5xl font-serif">Featured Works</h2>
          </div>

          <div className="mt-0 flex flex-wrap gap-x-8 gap-y-3 text-sm uppercase tracking-widest opacity-60">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`transition-colors ${isActive ? "text-brand-dark border-b border-brand-dark" : "hover:text-brand-dark"}`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredProjects.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden mb-6">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/20 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-brand-light text-xs uppercase tracking-widest opacity-80">{project.year}</span>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-serif mb-1">{project.title}</h3>
                  <p className="text-sm text-brand-accent uppercase tracking-widest">{project.category}</p>
                </div>
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <button className="px-12 py-4 border border-brand-dark/20 text-sm uppercase tracking-widest hover:border-brand-dark transition-colors">
            Explore All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-32 bg-brand-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="aspect-square relative z-10"
            >
              <img 
                src="/images/about-1.png" 
                alt="Office Interior" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute -top-12 -left-12 w-64 h-64 border border-brand-accent/20 -z-0" />
            <div className="absolute -bottom-12 -right-12 bg-brand-accent/10 w-full h-full -z-0" />
          </div>

          <div>
            <span className="text-brand-accent text-sm uppercase tracking-widest mb-4 block">About D&A</span>
            <h2 className="text-5xl font-serif mb-8 leading-tight">
              Architecture as a <br />
              <span className="italic">Dialogue with Time</span>
            </h2>
            <div className="space-y-6 text-lg text-brand-dark/70 leading-relaxed font-light">
              <p>
                (주)디앤에이건축사사무소는 2006년 설립 이후, 건축의 공공성과 예술성을 조화시키며 
                도시의 새로운 풍경을 만들어왔습니다. 우리는 단순히 건물을 짓는 것을 넘어, 
                그 속에서 살아가는 사람들의 삶과 문화를 담아내는 그릇을 디자인합니다.
              </p>
              <p>
                우리의 디자인 철학은 '본질에 대한 탐구'에서 시작됩니다. 
                대지가 가진 고유한 맥락을 해석하고, 현대적인 기술과 전통적인 감성을 결합하여 
                지속 가능한 건축적 해법을 제시합니다.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-12 mt-16">
              <div>
                <span className="text-4xl font-serif block mb-2">20+</span>
                <span className="text-xs uppercase tracking-widest opacity-60">Years of Excellence</span>
              </div>
              <div>
                <span className="text-4xl font-serif block mb-2">300+</span>
                <span className="text-xs uppercase tracking-widest opacity-60">Projects Completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-32 bg-brand-dark text-brand-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <span className="text-brand-accent text-sm uppercase tracking-widest mb-4 block">Expertise</span>
          <h2 className="text-5xl font-serif">Our Services</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {SERVICES.map((service, idx) => (
            <motion.div 
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-10 border border-brand-light/10 hover:border-brand-accent transition-colors group"
            >
              <div className="mb-8 text-brand-accent group-hover:scale-110 transition-transform duration-500">
                {service.icon}
              </div>
              <h3 className="text-2xl font-serif mb-4">{service.title}</h3>
              <p className="text-sm opacity-60 leading-relaxed font-light">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <span className="text-brand-accent text-sm uppercase tracking-widest mb-4 block">Get in Touch</span>
            <h2 className="text-5xl font-serif mb-12">Let's Build <br /> Something Great</h2>
            
            <div className="space-y-10">
              <div className="flex items-start space-x-6">
                <div className="p-3 bg-brand-light rounded-full">
                  <MapPin className="w-5 h-5 text-brand-accent" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest opacity-60 mb-2">Address</h4>
                  <p className="text-lg font-light">서울특별시 서초구 잠원동 19-1, 경아빌딩 5층</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="p-3 bg-brand-light rounded-full">
                  <Phone className="w-5 h-5 text-brand-accent" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest opacity-60 mb-2">Phone</h4>
                  <p className="text-lg font-light">+82 (02) 514 6959</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="p-3 bg-brand-light rounded-full">
                  <Mail className="w-5 h-5 text-brand-accent" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest opacity-60 mb-2">Email</h4>
                  <p className="text-lg font-light">dnarchi@hanmail.net</p>
                </div>
              </div>
            </div>

            <div className="mt-16 flex space-x-6">
              <a href="#" className="p-4 border border-brand-dark/10 hover:border-brand-dark transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-4 border border-brand-dark/10 hover:border-brand-dark transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="bg-brand-light p-12">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest opacity-60">Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-brand-dark/20 py-3 focus:outline-none focus:border-brand-accent transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest opacity-60">Email</label>
                  <input type="email" className="w-full bg-transparent border-b border-brand-dark/20 py-3 focus:outline-none focus:border-brand-accent transition-colors" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest opacity-60">Subject</label>
                <input type="text" className="w-full bg-transparent border-b border-brand-dark/20 py-3 focus:outline-none focus:border-brand-accent transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest opacity-60">Message</label>
                <textarea rows={4} className="w-full bg-transparent border-b border-brand-dark/20 py-3 focus:outline-none focus:border-brand-accent transition-colors resize-none" />
              </div>
              <button className="w-full py-5 bg-brand-dark text-brand-light text-xs uppercase tracking-[0.3em] hover:bg-brand-accent transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 bg-brand-dark text-brand-light border-t border-brand-light/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-lg md:text-2xl font-serif font-semibold tracking-widest uppercase">D&A</span>
            <span className="text-[8px] md:text-[10px] tracking-[0.3em] uppercase opacity-40 font-sans">Architects & Engineers</span>
          </div>
          
          <div className="flex space-x-12 text-[10px] uppercase tracking-[0.2em] opacity-60">
            <a href="#" className="hover:text-brand-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Careers</a>
          </div>

          <div className="text-[10px] uppercase tracking-[0.2em] opacity-40">
            © 2026 D&A Architects & Engineers. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-brand-accent selection:text-white">
      <Navbar />
      <Hero />
      <AboutSection />
      <ProjectsGrid />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
