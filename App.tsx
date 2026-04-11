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
import { BlogPost, ProjectCategory } from './types';
import { fetchNaverBlogPosts } from './services/naverService';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [projects, setProjects] = useState<BlogPost[]>([
    {
      id: 'sample-1',
      title: '평창동 단독주택 리모델링',
      summary: '자연과 도심이 공존하는 평창동의 입지적 특성을 살려, 기존의 노후된 구조를 현대적으로 재해석한 프로젝트입니다.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80',
      category: ProjectCategory.RESIDENTIAL,
      naverUrl: '#',
      date: '2024.01.15',
      content: '',
      images: [],
      tags: ['리모델링', '주택']
    },
    {
      id: 'sample-2',
      title: '성수동 오피스 인테리어',
      summary: '산업적 무드와 현대적인 감각이 어우러진 성수동의 로프트형 오피스 공간입니다. 효율적인 업무 동선과 개방감을 극대화했습니다.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      category: ProjectCategory.OFFICE,
      naverUrl: '#',
      date: '2024.02.10',
      content: '',
      images: [],
      tags: ['오피스', '인테리어']
    },
    {
      id: 'sample-3',
      title: '한남동 갤러리 하우스',
      summary: '사용자의 예술품 컬렉션을 돋보이게 할 수 있는 미니멀한 공간 설계에 집중한 럭셔리 레지던스 프로젝트입니다.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80',
      category: ProjectCategory.RESIDENTIAL,
      naverUrl: '#',
      date: '2024.03.05',
      content: '',
      images: [],
      tags: ['레지던스', '갤러리하우스']
    },
    {
      id: 'sample-4',
      title: '판교 타운하우스 신축',
      summary: '도시인의 휴식을 테마로 한 가변적인 공간 구성의 타운하우스 신축 계획안입니다. 중정을 통한 채광 성능 확보가 핵심입니다.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1628744276520-202957f00305?auto=format&fit=crop&q=80',
      category: ProjectCategory.ARCHITECTURE,
      naverUrl: '#',
      date: '2024.03.20',
      content: '',
      images: [],
      tags: ['신축', '타운하우스']
    },
    {
      id: 'sample-5',
      title: '청담동 플래그십 스토어',
      summary: '브랜드 아이덴티티를 공간 전반에 녹여낸 상업 공간 프로젝트입니다. 독특한 파사드 설계로 브랜드의 존재감을 부각했습니다.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80',
      category: ProjectCategory.COMMERCIAL,
      naverUrl: '#',
      date: '2024.04.01',
      content: '',
      images: [],
      tags: ['상업공간', '플래그십스토어']
    }
  ]);

  // Fetch Naver Blog posts on mount
  useEffect(() => {
    const loadNaverPosts = async () => {
      if (NAVER_BLOG_ID) {
        const naverPosts = await fetchNaverBlogPosts(NAVER_BLOG_ID);
        if (naverPosts.length > 0) {
          // If Naver posts exist, we can merge or replace. 
          // For now, let's keep the samples and append naver posts
          setProjects(prev => [...prev, ...naverPosts]);
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