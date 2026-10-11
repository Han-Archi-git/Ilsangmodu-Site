import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Company from './components/Company';
import ProjectGrid from './components/ProjectGrid';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Services from './components/Services';
import FloatingButtons from './components/FloatingButtons';
import { NAVER_BLOG_ID } from './constants';
import { BlogPost } from './types';
import { fetchNaverBlogPosts } from './services/naverService';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [projects, setProjects] = useState<BlogPost[]>([]);

  // Fetch Naver Blog posts on mount
  useEffect(() => {
    const loadNaverPosts = async () => {
      if (NAVER_BLOG_ID) {
        const naverPosts = await fetchNaverBlogPosts(NAVER_BLOG_ID);
        if (naverPosts.length > 0) {
          setProjects(naverPosts);
        }
      }
    };

    loadNaverPosts();
  }, []);

  // Scroll Spy to update activeSection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Trigger when section is in middle of viewport
        threshold: 0
      }
    );

    const sections = ['hero', 'company', 'services', 'projects', 'contact'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavigate = (id: string) => {
    // setActiveSection(id); // Observer will handle this
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen relative bg-white text-neutral-900 selection:bg-black selection:text-white">
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

      <main>
        <Hero onScrollDown={() => handleNavigate('projects')} />
        <Company />
        <ProjectGrid posts={projects} />
        <Services />
        {/* Inquiry component integrated into Contact */}
        <Contact />
      </main>

      <FloatingButtons />
      <Footer />
    </div>
  );
};

export default App;