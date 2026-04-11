import React, { useState, useEffect } from 'react';
import { Menu, X, Building2 } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: '홈' },
    { id: 'company', label: '소개' },
    { id: 'services', label: '서비스' },
    { id: 'projects', label: '프로젝트' },
    { id: 'contact', label: '오시는 길' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  // Determine Theme
  // Hero = Dark Theme (White Text), Others = Light Theme (Black Text)
  const isDarkSection = activeSection === 'hero';

  // Navbar Style Calculation
  // 1. Scrolled on Light Section -> White BG, Black Text
  // 2. Scrolled on Dark Section -> Black BG, White Text
  // 3. Top (Unscrolled) -> Transparent, Text follows Section Theme (Hero=White, Others=Black)

  let navClasses = "fixed w-full z-50 transition-all duration-300 ";
  let textClasses = "";
  let logoBg = "";
  let logoText = "";
  let borderClass = "";

  if (scrolled) {
    if (isDarkSection) {
      navClasses += "bg-black/80 backdrop-blur-md py-4";
      textClasses = "text-white";
      logoBg = "bg-white";
      logoText = "text-black";
      borderClass = "border-white/5";
    } else {
      navClasses += "bg-white/90 backdrop-blur-md py-4 shadow-sm";
      textClasses = "text-neutral-900";
      logoBg = "bg-black";
      logoText = "text-white";
      borderClass = "border-neutral-200";
    }
  } else {
    navClasses += "bg-transparent py-8";
    // Even at top, if we are not on Hero (e.g. refreshed page in middle), we might need contrast. 
    // But 'activeSection' handles that. If top of 'company', it's Light Theme.
    if (isDarkSection) {
      textClasses = "text-white";
      logoBg = "bg-white";
      logoText = "text-black";
    } else {
      textClasses = "text-neutral-900";
      logoBg = "bg-black";
      logoText = "text-white";
    }
  }

  return (
    <nav className={`${navClasses} ${borderClass ? `border-b ${borderClass}` : ''}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 group-hover:scale-105 transition-transform duration-300">
            <img
              src="/logo.png"
              alt="Logo"
              className={`w-full h-full object-contain ${isDarkSection ? 'brightness-0 invert' : ''}`}
            />
          </div>
          <div className={`flex flex-col ${textClasses}`}>
            <span className="text-xs md:text-sm font-bold tracking-tight leading-tight">일상모두 디자인스튜디오</span>
            <span className="text-xs md:text-sm font-normal tracking-tight leading-tight">STA종합건설</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            // Text color logic for links
            let linkColor = "";
            if (scrolled) {
              // Scrolled
              if (isActive) linkColor = isDarkSection ? "text-white" : "text-black";
              else linkColor = isDarkSection ? "text-neutral-400 hover:text-white" : "text-neutral-500 hover:text-black";
            } else {
              // Top
              if (isActive) linkColor = isDarkSection ? "text-white" : "text-black";
              else linkColor = isDarkSection ? "text-white/70 hover:text-white" : "text-neutral-600 hover:text-black";
            }

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-xs font-bold tracking-[0.15em] transition-colors uppercase relative group ${linkColor}`}
              >
                {item.label}
                <span className={`absolute -bottom-2 left-0 w-full h-[1px] transition-transform duration-300 origin-left ${isDarkSection ? 'bg-white' : 'bg-black'} ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </button>
            );
          })}
          <button
            onClick={() => handleNavClick('contact')}
            className={`px-6 py-2.5 text-xs font-bold tracking-widest transition-all border rounded-full ${isDarkSection
              ? 'border-white/20 text-white hover:bg-white hover:text-black hover:border-white'
              : 'border-black/10 text-black hover:bg-black hover:text-white hover:border-black'
              }`}
          >
            문의하기
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden ${textClasses}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-neutral-200 py-6 shadow-2xl md:hidden">
          <div className="flex flex-col gap-6 px-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left text-lg font-medium ${activeSection === item.id ? 'text-black font-bold' : 'text-neutral-500'}`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full py-4 mt-2 bg-black text-white font-bold text-center hover:bg-neutral-800 rounded-lg"
            >
              문의하기
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;