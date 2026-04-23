import React, { useEffect, useMemo, useState } from 'react';
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
  Building2,
  Home,
  Users,
  Network,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// --- Types ---
interface ProjectSource {
  id: number;
  title: string;
  category: string;
  image: string;
  year: string;
}

interface ProjectImage {
  id: string;
  src: string;
  alt: string;
}

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  coverImage: string;
  images: ProjectImage[];
}

interface TeamMember {
  name: string;
  role: string;
  department: string;
  focus: string;
}

interface OrganizationGroup {
  title: string;
  description: string;
  members: string[];
}

// --- Source Data ---
const PROJECT_SOURCES: ProjectSource[] = [
  { id: 27, title: "Seocho-dong Complex", category: "Public", image: "/works/pub-7.jpg", year: "2022" },
  { id: 26, title: "Hwasun building", category: "Etc", image: "/works/etc-7.jpg", year: "2025" },
  { id: 25, title: "Hongcheon building", category: "Etc", image: "/works/etc-6.jpg", year: "2020" },
  { id: 24, title: "Chuncheon Office", category: "Public", image: "/works/pub-6.jpg", year: "2020" },
  { id: 22, title: "World Taekwondo Federation", category: "Public", image: "/works/pub-4.jpg", year: "2025" },
  { id: 23, title: "World Taekwondo Federation", category: "Public", image: "/works/pub-5.jpg", year: "2025" },
  { id: 21, title: "Housing Gallery", category: "Etc", image: "/works/etc-5.jpg", year: "2019" },
  { id: 20, title: "Induk University", category: "Etc", image: "/works/etc-4.jpg", year: "2019" },
  { id: 19, title: "UNIQLO", category: "Retail", image: "/works/uq-2.jpg", year: "2019" },
  { id: 18, title: "Officetel", category: "Office", image: "/works/officetel-2.jpg", year: "2019" },
  { id: 17, title: "Yangpyeong-building", category: "Etc", image: "/works/etc-2.jpg", year: "2019" },
  { id: 16, title: "Andong-building", category: "Etc", image: "/works/etc-1.jpg", year: "2019" },
  { id: 15, title: "Sisa Language School", category: "Office", image: "/works/office-3.jpg", year: "2019" },
  { id: 14, title: "Forest Education Center", category: "Public", image: "/works/pub-3.jpg", year: "2025" },
  { id: 13, title: "BURGER KING", category: "F&B", image: "/works/burgerking-1.jpg", year: "2025" },
  { id: 12, title: "Bio-Convergence Center", category: "Public", image: "/works/pub-2.jpg", year: "2021" },
  { id: 11, title: "Vavas Mall", category: "Retail", image: "/works/retail-1.jpg", year: "2021" },
  { id: 10, title: "Eastern Forest Service", category: "Public", image: "/works/pub-1.jpg", year: "2021" },
  { id: 8, title: "Guui-Officetel", category: "Office", image: "/works/officetel-1.jpg", year: "2021" },
  { id: 7, title: "Gangseo-Office", category: "Office", image: "/works/office-2.jpg", year: "2021" },
  { id: 6, title: "Galhyeon-Office", category: "Office", image: "/works/office-1.jpg", year: "2023" },
  { id: 4, title: "MUJI", category: "Retail", image: "/works/muji-1.jpg", year: "2023" },
  { id: 1, title: "McDonald's", category: "F&B", image: "/works/mc-1.jpg", year: "2025" },
  { id: 2, title: "UNIQLO", category: "Retail", image: "/works/uq-main.jpg", year: "2022" },
  { id: 3, title: "Office of Education Support", category: "Public", image: "/works/pub-main.jpg", year: "2025" },
  { id: 9, title: "McDonald's", category: "F&B", image: "/works/mc-2.jpg", year: "2023" },
  { id: 5, title: "PaulBassett", category: "F&B", image: "/works/paulbassett-1.jpg", year: "2021" },
];

const SERVICES = [
  {
    title: "Architectural Design",
    description: "Creating spaces that balance form, function, and human experience.",
    icon: <Building2 className="w-6 h-6" />,
  },
  {
    title: "Interior Design",
    description: "Crafting meaningful interiors that resonate with the architectural soul.",
    icon: <Home className="w-6 h-6" />,
  },
  {
    title: "Urban Planning",
    description: "Designing sustainable environments for future generations.",
    icon: <MapPin className="w-6 h-6" />,
  },
  {
    title: "Consulting",
    description: "Expert guidance from concept to completion for complex projects.",
    icon: <Users className="w-6 h-6" />,
  },
];

const ORGANIZATION_GROUPS: OrganizationGroup[] = [
  {
    title: "Principal Office",
    description: "Direction, client communication, and design leadership.",
    members: ["CEO / Principal Architect", "Design Director"],
  },
  {
    title: "Architecture Studio",
    description: "Planning, schematic design, construction documents, and site coordination.",
    members: ["Project Architects", "Designers", "BIM / CAD Specialists"],
  },
  {
    title: "Engineering Studio",
    description: "Structural, mechanical, electrical, and technical coordination.",
    members: ["Structural Engineers", "MEP Engineers", "Technical Review"],
  },
  {
    title: "Management",
    description: "Permits, administration, scheduling, and project support.",
    members: ["Project Management", "Administration", "Client Support"],
  },
];

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "D&A Leadership",
    role: "Principal Architect",
    department: "Principal Office",
    focus: "Architectural direction, client strategy, and design quality.",
  },
  {
    name: "Design Studio",
    role: "Project Architects",
    department: "Architecture Studio",
    focus: "Planning, concept design, documentation, and construction coordination.",
  },
  {
    name: "Engineering Team",
    role: "Technical Partners",
    department: "Engineering Studio",
    focus: "Structural and MEP coordination for buildable, durable spaces.",
  },
  {
    name: "Project Support",
    role: "Management Team",
    department: "Management",
    focus: "Schedules, permits, administration, and communication support.",
  },
];



const PARTNER_LOGOS = [
  { id: 'partner-01', name: 'Partner 01', src: '/partners/partner-01.png', href: '#' },
  { id: 'partner-02', name: 'Partner 02', src: '/partners/partner-02.png', href: '#' },
  { id: 'partner-03', name: 'Partner 03', src: '/partners/partner-03.png', href: '#' },
  { id: 'partner-04', name: 'Partner 04', src: '/partners/partner-04.png', href: '#' },
  { id: 'partner-05', name: 'Partner 05', src: '/partners/partner-05.png', href: '#' },
  { id: 'partner-06', name: 'Partner 06', src: '/partners/partner-06.png', href: '#' },
  { id: 'partner-07', name: 'Partner 07', src: '/partners/partner-07.png', href: '#' },
  { id: 'partner-08', name: 'Partner 08', src: '/partners/partner-08.png', href: '#' },
  { id: 'partner-09', name: 'Partner 09', src: '/partners/partner-09.png', href: '#' },
  { id: 'partner-10', name: 'Partner 10', src: '/partners/partner-10.png', href: '#' },
  { id: 'partner-11', name: 'Partner 11', src: '/partners/partner-11.png', href: '#' },
  { id: 'partner-12', name: 'Partner 12', src: '/partners/partner-12.png', href: '#' },
  { id: 'partner-13', name: 'Partner 13', src: '/partners/partner-13.png', href: '#' },
  { id: 'partner-14', name: 'Partner 14', src: '/partners/partner-14.png', href: '#' },
  { id: 'partner-15', name: 'Partner 15', src: '/partners/partner-15.png', href: '#' },
  { id: 'partner-16', name: 'Partner 16', src: '/partners/partner-16.png', href: '#' },
  { id: 'partner-17', name: 'Partner 17', src: '/partners/partner-17.png', href: '#' },
  { id: 'partner-18', name: 'Partner 18', src: '/partners/partner-18.png', href: '#' },
  { id: 'partner-19', name: 'Partner 19', src: '/partners/partner-19.png', href: '#' },
  { id: 'partner-20', name: 'Partner 20', src: '/partners/partner-20.png', href: '#' },
  { id: 'partner-21', name: 'Partner 21', src: '/partners/partner-21.png', href: '#' },
  { id: 'partner-22', name: 'Partner 22', src: '/partners/partner-22.png', href: '#' },
  { id: 'partner-23', name: 'Partner 23', src: '/partners/partner-23.png', href: '#' },
  { id: 'partner-24', name: 'Partner 24', src: '/partners/partner-24.png', href: '#' },
  { id: 'partner-25', name: 'Partner 25', src: '/partners/partner-25.png', href: '#' },
];

const PROJECTS: Project[] = (() => {
  const grouped = new Map<string, Project>();

  for (const item of PROJECT_SOURCES) {
    const key = `${item.title}__${item.category}`;
    const existing = grouped.get(key);

    if (existing) {
      existing.images.push({
        id: `${item.id}`,
        src: item.image,
        alt: `${item.title} image ${existing.images.length + 1}`,
      });

      if (Number(item.year) > Number(existing.year)) {
        existing.year = item.year;
      }
      continue;
    }

    grouped.set(key, {
      id: item.id,
      title: item.title,
      category: item.category,
      year: item.year,
      coverImage: item.image,
      images: [
        {
          id: `${item.id}`,
          src: item.image,
          alt: `${item.title} image 1`,
        },
      ],
    });
  }

  return Array.from(grouped.values()).sort((a, b) => Number(b.year) - Number(a.year) || b.id - a.id);
})();

// --- Components ---
interface NavbarProps {
  onFirmProfileOpen: () => void;
}

const Navbar = ({ onFirmProfileOpen }: NavbarProps) => {
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
        <a href="#top" className="flex flex-col items-start leading-none w-fit cursor-pointer">
          <img
            src="/images/logo.png"
            alt="DNA Architects & Engineers"
            className="h-4 sm:h-5 md:h-6 w-auto object-contain block self-start"
          />

          <span
            className={`mt-1 block w-full text-left text-[7px] md:text-[8.7px] font-sans tracking-[0.18em] whitespace-nowrap opacity-70 transition-colors duration-300 ${
              scrolled ? 'text-black' : 'text-white'
            }`}
          >
            ARCHITECTS, PLANNERS, ENGINEERS
          </span>
        </a>

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
          <button
            type="button"
            onClick={onFirmProfileOpen}
            className="px-6 py-2 border border-brand-dark text-xs uppercase tracking-widest hover:bg-brand-dark hover:text-brand-light transition-all"
          >
            firm profile
          </button>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

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
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onFirmProfileOpen();
              }}
              className="text-left text-lg font-serif italic hover:text-brand-accent"
            >
              firm profile
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

interface FirmProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FirmProfileModal = ({ isOpen, onClose }: FirmProfileModalProps) => {
  const [activeTab, setActiveTab] = useState<'organization' | 'people'>('organization');

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const tabs = [
    { id: 'organization' as const, label: 'Organization', icon: <Network className="w-4 h-4" /> },
    { id: 'people' as const, label: 'People', icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <AnimatePresence>
      <motion.div
        key="firm-profile-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm p-4 md:p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          className="relative mx-auto h-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            aria-label="Close firm profile"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 rounded-full bg-white/90 p-2 text-brand-dark shadow-sm hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="h-full overflow-y-auto">
            <div className="bg-brand-dark px-6 md:px-10 pt-10 pb-8 text-brand-light">
              <span className="text-brand-accent text-xs uppercase tracking-[0.28em] block mb-4">
                Firm Profile
              </span>
              <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-16 items-end">
                <div>
                  <h2 className="balanced-heading text-4xl md:text-6xl font-serif leading-tight">
                    D&amp;A Architects <br />
                    <span className="italic">&amp; Engineers</span>
                  </h2>
                </div>
                <p className="readable-copy text-sm md:text-base leading-relaxed text-brand-light/65 font-light max-w-2xl">
                  A compact view of the studio structure, project roles, and the people who support
                  architectural design from concept through completion.
                </p>
              </div>
            </div>

            <div className="border-b border-brand-dark/10 px-6 md:px-10 py-4">
              <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors ${
                        isActive
                          ? 'bg-brand-dark text-brand-light'
                          : 'border border-brand-dark/10 text-brand-dark/60 hover:border-brand-dark hover:text-brand-dark'
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-6 md:p-10">
              {activeTab === 'organization' ? (
                <div>
                  <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                      <span className="text-brand-accent text-xs uppercase tracking-[0.24em] block mb-3">
                        Studio Structure
                      </span>
                      <h3 className="text-3xl md:text-5xl font-serif">Organization</h3>
                    </div>
                    <div className="text-sm uppercase tracking-[0.2em] text-brand-dark/45">4 divisions</div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12">
                    <div className="border border-brand-dark/10 bg-brand-light p-6 md:p-8">
                      <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-dark text-brand-light">
                          <BriefcaseBusiness className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.22em] text-brand-dark/45">Leadership</p>
                          <h4 className="text-2xl font-serif">Principal Office</h4>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {ORGANIZATION_GROUPS.slice(1).map((group) => (
                          <div key={group.title} className="border-l border-brand-accent/40 pl-5">
                            <h5 className="font-serif text-xl">{group.title}</h5>
                            <p className="readable-copy mt-1 text-sm leading-relaxed text-brand-dark/55">{group.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {ORGANIZATION_GROUPS.map((group) => (
                        <div key={group.title} className="border border-brand-dark/10 p-6 hover:border-brand-accent transition-colors">
                          <h4 className="text-2xl font-serif mb-3">{group.title}</h4>
                          <p className="readable-copy text-sm leading-relaxed text-brand-dark/55 mb-6">{group.description}</p>
                          <div className="space-y-2">
                            {group.members.map((member) => (
                              <div
                                key={member}
                                className="text-xs uppercase tracking-[0.18em] text-brand-dark/60 border-t border-brand-dark/8 pt-2"
                              >
                                {member}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                      <span className="text-brand-accent text-xs uppercase tracking-[0.24em] block mb-3">
                        Team Introduction
                      </span>
                      <h3 className="text-3xl md:text-5xl font-serif">People</h3>
                    </div>
                    <div className="text-sm uppercase tracking-[0.2em] text-brand-dark/45">Core roles</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {TEAM_MEMBERS.map((member) => (
                      <div
                        key={`${member.name}-${member.role}`}
                        className="group border border-brand-dark/10 bg-white p-6 md:p-8 transition-colors hover:border-brand-accent"
                      >
                        <div className="mb-8 flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs uppercase tracking-[0.22em] text-brand-accent mb-3">
                              {member.department}
                            </p>
                            <h4 className="text-3xl font-serif leading-tight">{member.name}</h4>
                          </div>
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand-accent group-hover:bg-brand-dark group-hover:text-brand-light transition-colors">
                            <Users className="w-5 h-5" />
                          </div>
                        </div>
                        <p className="text-sm uppercase tracking-[0.2em] text-brand-dark/45 mb-4">{member.role}</p>
                        <p className="readable-copy text-base leading-relaxed text-brand-dark/62 font-light">{member.focus}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Hero = () => {
  const heroImages = ['/images/main-1.png', '/images/main-2.png', '/images/main-3.png'];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 10000);

    return () => window.clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section id="top" className="relative h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {heroImages.map((img, index) => (
          <img
            key={img}
            src={img}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover grayscale-[0.3] transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-brand-dark/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-brand-light">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
          <span className="text-sm uppercase tracking-[0.5em] mb-4 block opacity-80">Established 2006</span>

          <h1 className="balanced-heading text-6xl md:text-8xl font-serif leading-tight mb-8">
            Designing <br />
            <span className="italic">&amp; Aesthetics</span>
          </h1>

          <p className="readable-copy max-w-xl text-lg opacity-80 mb-12 font-light leading-relaxed">
            (주)디앤에이건축사사무소는 공간의 본질을 탐구하며, 시간이 흘러도 변치 않는 가치를 지닌 건축을
            제안합니다.
          </p>

          <a
            href="#projects"
            className="inline-block px-10 py-4 bg-brand-light text-brand-dark text-sm uppercase tracking-widest hover:bg-brand-accent hover:text-brand-light transition-all"
          >
            View Projects
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Show slide ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              index === currentIndex ? 'bg-white scale-125' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onImageClick: (index: number) => void;
}

const ProjectDetailModal = ({ project, onClose, onImageClick }: ProjectDetailModalProps) => {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const singleImage = project.images.length === 1;

  return (
    <AnimatePresence>
      <motion.div
        key={`project-modal-${project.id}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm p-4 md:p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          className="relative mx-auto h-full max-w-6xl rounded-2xl bg-white shadow-2xl overflow-hidden"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            aria-label="Close project details"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 rounded-full bg-white/90 p-2 text-brand-dark shadow-sm hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="h-full overflow-y-auto">
            <div className="px-6 md:px-10 pt-8 md:pt-10 pb-6 border-b border-brand-dark/10">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <span className="text-brand-accent text-xs uppercase tracking-[0.28em] block mb-3">
                    {project.category}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-serif leading-tight">{project.title}</h3>
                </div>
                <div className="text-sm uppercase tracking-[0.22em] text-brand-dark/50">{project.year}</div>
              </div>
            </div>

            <div className="p-6 md:p-10">
              {singleImage ? (
                <button
                  type="button"
                  onClick={() => onImageClick(0)}
                  className="block w-full group text-left"
                >
                  <div className="bg-[#f5f5f3] rounded-2xl overflow-hidden">
                    <img
                      src={project.images[0].src}
                      alt={project.images[0].alt}
                      className="w-full max-h-[72vh] object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <span className="mt-4 block text-xs uppercase tracking-[0.24em] text-brand-dark/45">
                    Click to view original ratio
                  </span>
                </button>
              ) : (
                <div>
                  <div className="mb-6 text-xs uppercase tracking-[0.24em] text-brand-dark/45">
                    {project.images.length} related images
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 items-start">
                    {project.images.map((image, index) => (
                      <button
                        key={image.id}
                        type="button"
                        onClick={() => onImageClick(index)}
                        className="group block overflow-hidden rounded-2xl bg-[#f5f5f3] text-left"
                      >
                        <div className="flex items-center justify-center px-3 py-3 md:px-4 md:py-4">
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full max-h-[48vh] object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        </div>
                        <div className="px-4 py-3 text-[11px] uppercase tracking-[0.22em] text-brand-dark/55 border-t border-brand-dark/8">
                          Image {index + 1}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

interface ImageLightboxProps {
  project: Project | null;
  imageIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const ImageLightbox = ({ project, imageIndex, onClose, onPrev, onNext }: ImageLightboxProps) => {
  useEffect(() => {
    if (!project || imageIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onPrev();
      if (event.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, imageIndex, onClose, onPrev, onNext]);

  if (!project || imageIndex === null) return null;

  const currentImage = project.images[imageIndex];
  const showNav = project.images.length > 1;

  return (
    <AnimatePresence>
      <motion.div
        key={`lightbox-${project.id}-${imageIndex}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] bg-black/92 p-4 md:p-8"
        onClick={onClose}
      >
        <button
          type="button"
          aria-label="Close image viewer"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {showNav && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={(event) => {
                event.stopPropagation();
                onPrev();
              }}
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={(event) => {
                event.stopPropagation();
                onNext();
              }}
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        <div className="h-full w-full flex flex-col items-center justify-center gap-4" onClick={(event) => event.stopPropagation()}>
          <div className="text-center text-white/70 text-[11px] md:text-xs uppercase tracking-[0.24em]">
            {project.title} · {imageIndex + 1}/{project.images.length}
          </div>
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="max-w-full max-h-[82vh] object-contain"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const ProjectsGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [lightboxImageIndex, setLightboxImageIndex] = useState<number | null>(null);

  useEffect(() => {
    const hasOpenOverlay = selectedProjectId !== null || lightboxImageIndex !== null;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = hasOpenOverlay ? 'hidden' : '';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedProjectId, lightboxImageIndex]);

  const categories = ['All', 'F&B', 'Retail', 'Public', 'Office', 'Industrial', 'Housing', 'Etc'];
  const primaryCategories = categories.filter((category) => category !== 'All' && category !== 'Etc');

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      if (selectedCategory === 'All') return true;
      if (selectedCategory === 'Etc') {
        return !primaryCategories.includes(project.category);
      }
      return project.category === selectedCategory;
    });
  }, [selectedCategory, primaryCategories]);

  const selectedProject = useMemo(
    () => PROJECTS.find((project) => project.id === selectedProjectId) ?? null,
    [selectedProjectId]
  );

  const closeProjectModal = () => {
    setSelectedProjectId(null);
    setLightboxImageIndex(null);
  };

  const closeLightbox = () => setLightboxImageIndex(null);

  const moveLightbox = (direction: -1 | 1) => {
    if (!selectedProject || selectedProject.images.length === 0 || lightboxImageIndex === null) return;

    const nextIndex =
      (lightboxImageIndex + direction + selectedProject.images.length) % selectedProject.images.length;
    setLightboxImageIndex(nextIndex);
  };

  return (
    <>
      <section id="projects" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <span className="text-brand-accent text-sm uppercase tracking-widest mb-4 block">Our Portfolio</span>
              <h2 className="balanced-heading text-5xl font-serif">Featured Works</h2>
            </div>

            <div className="-mx-6 overflow-x-auto px-6 pb-2 md:mx-0 md:overflow-visible md:px-0 md:pb-0">
              <div className="flex w-max gap-3 text-xs uppercase tracking-widest md:w-auto md:flex-wrap md:justify-end md:gap-x-8 md:gap-y-3 md:text-sm">
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`min-h-11 shrink-0 border px-4 py-2 transition-colors md:min-h-0 md:border-0 md:px-0 md:py-0 ${
                      isActive
                        ? 'border-brand-dark bg-brand-dark text-brand-light md:bg-transparent md:text-brand-dark md:border-b'
                        : 'border-brand-dark/10 text-brand-dark/55 hover:border-brand-dark hover:text-brand-dark md:text-brand-dark/60 md:hover:text-brand-dark'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredProjects.map((project, idx) => (
              <motion.button
                key={project.id}
                type="button"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedProjectId(project.id)}
                className="group cursor-pointer text-left"
              >
                <div className="relative aspect-[4/5] overflow-hidden mb-6">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
              </motion.button>
            ))}
          </div>

        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={closeProjectModal}
            onImageClick={(index) => setLightboxImageIndex(index)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject && lightboxImageIndex !== null && (
          <ImageLightbox
            project={selectedProject}
            imageIndex={lightboxImageIndex}
            onClose={closeLightbox}
            onPrev={() => moveLightbox(-1)}
            onNext={() => moveLightbox(1)}
          />
        )}
      </AnimatePresence>
    </>
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
              <img src="/images/about-1.png" alt="Office Interior" className="w-full h-full object-cover" />
            </motion.div>
            <div className="absolute -top-12 -left-12 w-64 h-64 border border-brand-accent/20 -z-0" />
            <div className="absolute -bottom-12 -right-12 bg-brand-accent/10 w-full h-full -z-0" />
          </div>

          <div>
            <span className="text-brand-accent text-sm uppercase tracking-widest mb-4 block">About D&amp;A</span>
            <h2 className="balanced-heading text-5xl font-serif mb-8 leading-tight">
              Architecture as a <br />
              <span className="italic">Dialogue with Time</span>
            </h2>
            <div className="readable-copy space-y-6 text-lg text-brand-dark/70 leading-relaxed font-light">
              <p>
                (주)디앤에이건축사사무소는 2006년 설립 이후, 건축의 공공성과 예술성을 조화시키며 도시의 새로운 풍경을
                만들어왔습니다. 우리는 단순히 건물을 짓는 것을 넘어, 그 속에서 살아가는 사람들의 삶과 문화를 담아내는
                그릇을 디자인합니다.
              </p>
              <p>
                우리의 디자인 철학은 '본질에 대한 탐구'에서 시작됩니다. 대지가 가진 고유한 맥락을 해석하고, 현대적인
                기술과 전통적인 감성을 결합하여 지속 가능한 건축적 해법을 제시합니다.
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



interface PartnerMarqueeProps {
  logos: typeof PARTNER_LOGOS;
  reverse?: boolean;
  durationClass?: string;
}

const PartnerMarquee = ({
  logos,
  reverse = false,
  durationClass = 'animate-[partner-marquee_52s_linear_infinite]',
}: PartnerMarqueeProps) => {
  const repeatedLogos = [...logos, ...logos];

  return (
    <div className="relative overflow-hidden py-3">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 md:w-24 bg-gradient-to-r from-brand-light to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 md:w-24 bg-gradient-to-l from-brand-light to-transparent" />

      <div
        className={`flex min-w-max items-center gap-10 md:gap-16 ${durationClass} ${reverse ? 'reverse' : ''} hover:[animation-play-state:paused]`}
      >
        {repeatedLogos.map((logo, index) => (
          <div
  key={`${logo.id}-${index}`}
  className="shrink-0 flex items-center justify-center"
  aria-label={logo.name}
>
  <img
    src={logo.src}
    alt={logo.name}
    loading="lazy"
    className="h-8 md:h-10 w-auto object-contain opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
  />
</div>
        ))}
      </div>
    </div>
  );
};

const PartnersSection = () => {
  const midpoint = Math.ceil(PARTNER_LOGOS.length / 2);
  const firstRow = PARTNER_LOGOS.slice(0, midpoint);
  const secondRow = PARTNER_LOGOS.slice(midpoint);

  return (
    <section className="py-20 md:py-24 bg-brand-light overflow-hidden border-t border-brand-dark/5">
      <style>{`
        @keyframes partner-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .reverse {
          animation-direction: reverse;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 md:mb-16">
          <span className="text-brand-accent text-sm uppercase tracking-widest mb-4 block">Trusted Partners</span>
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 items-end">
            <h2 className="balanced-heading text-4xl md:text-5xl font-serif leading-tight">
              Brands and institutions <br />
              <span className="italic">we move forward with</span>
            </h2>
            <p className="readable-copy text-base md:text-lg text-brand-dark/60 leading-relaxed font-light max-w-2xl lg:justify-self-end">
              디앤에이는 다양한 브랜드와 공공 기관, 기업 파트너와 함께 공간의 가치를 설계해왔습니다.
            </p>
          </div>
        </div>

        <div className="space-y-3 md:space-y-4">
          <PartnerMarquee logos={firstRow} durationClass="animate-[partner-marquee_56s_linear_infinite]" />
          <PartnerMarquee
            logos={secondRow.length > 0 ? secondRow : firstRow}
            reverse
            durationClass="animate-[partner-marquee_62s_linear_infinite]"
          />
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
          <h2 className="balanced-heading text-5xl font-serif">Our Services</h2>
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
              <p className="readable-copy text-sm opacity-60 leading-relaxed font-light">{service.description}</p>
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
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-16 lg:gap-24 items-start">
          <div>
            <span className="text-brand-accent text-sm uppercase tracking-widest mb-4 block">Get in Touch</span>
<h2 className="balanced-heading text-5xl font-serif mb-12">
  Let's Build <br /> Something Great
</h2>

            <div className="space-y-10">
              <div className="flex items-start space-x-6">
                <div className="p-3 bg-brand-light rounded-full">
                  <MapPin className="w-5 h-5 text-brand-accent" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest opacity-60 mb-2">Address</h4>
                  <p className="readable-copy text-lg font-light">서울특별시 서초구 잠원동 19-1, 경아빌딩 5층</p>
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

          <div className="bg-brand-light p-4 md:p-6 rounded-[28px] border border-brand-dark/8 shadow-[0_24px_80px_rgba(0,0,0,0.06)]">
            <div className="overflow-hidden rounded-[20px] bg-brand-dark">
              <img
                src="/images/contact-location-map.png"
                alt="D&A office location map"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
            <div className="px-2 md:px-1 pt-5 md:pt-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-brand-dark/45 mb-2">Office Map</p>
                  <p className="readable-copy text-lg font-light text-brand-dark">Sinsa Station Exit 4 · Kyungah Building 5F</p>
                </div>
                <span className="text-sm uppercase tracking-[0.2em] text-brand-accent">3 min walk</span>
              </div>
            </div>
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
            <span className="text-lg md:text-2xl font-serif font-semibold tracking-widest uppercase">D&amp;A</span>
            <span className="text-[8px] md:text-[10px] tracking-[0.3em] uppercase opacity-40 font-sans">
              Architects &amp; Engineers
            </span>
          </div>

          <div className="flex space-x-12 text-[10px] uppercase tracking-[0.2em] opacity-60">
            <a href="#" className="hover:text-brand-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-brand-accent transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-brand-accent transition-colors">
              Careers
            </a>
          </div>

          <div className="text-[10px] uppercase tracking-[0.2em] opacity-40">
            © 2026 D&amp;A Architects &amp; Engineers. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [isFirmProfileOpen, setIsFirmProfileOpen] = useState(false);

  return (
    <div className="min-h-screen selection:bg-brand-accent selection:text-white">
      <Navbar onFirmProfileOpen={() => setIsFirmProfileOpen(true)} />
      <FirmProfileModal isOpen={isFirmProfileOpen} onClose={() => setIsFirmProfileOpen(false)} />
      <Hero />
      <AboutSection />
      <PartnersSection />
      <ProjectsGrid />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
