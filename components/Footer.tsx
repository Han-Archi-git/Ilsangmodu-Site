
import React from 'react';
import { NAVER_BLOG_ID, INSTAGRAM_URL, YOUTUBE_URL } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-neutral-500 py-16 border-t border-neutral-900">
      <div className="container mx-auto px-6 text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="mb-8 md:mb-0">
            <div className="flex flex-col gap-0.5 mb-4">
              <h3 className="text-white text-xl font-bold tracking-tight">일상모두 디자인스튜디오</h3>
              <h3 className="text-white text-xl font-light tracking-tight">STA종합건설</h3>
              <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] mt-2">Total Design & Build Solution</p>
            </div>
            <p className="text-sm font-light text-neutral-700">디자인의 가치와 시공의 전문성을 결합한 프리미엄 건축 파트너</p>
          </div>

          {/* Social Icons with Brand Colors */}
          <div className="flex flex-wrap gap-6 text-sm font-medium tracking-wide">
            {/* Instagram */}
            {INSTAGRAM_URL && (
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 group transition-colors"
              >
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="insta_gradient_footer" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FCAF45" />
                      <stop offset="30%" stopColor="#F77737" />
                      <stop offset="60%" stopColor="#C13584" />
                      <stop offset="100%" stopColor="#833AB4" />
                    </linearGradient>
                  </defs>
                  {/* 외곽 둥근 사각형 */}
                  <path fill="url(#insta_gradient_footer)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z" />
                  {/* 가운데 원(렌즈) */}
                  <path fill="url(#insta_gradient_footer)" d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
                  {/* 오른쪽 위 점 */}
                  <circle fill="url(#insta_gradient_footer)" cx="18.406" cy="5.595" r="1.44" />
                </svg>
                <span className="text-neutral-500 group-hover:text-white transition-colors">Instagram</span>
              </a>
            )}

            {/* Naver Blog */}
            <a
              href={`https://blog.naver.com/${NAVER_BLOG_ID}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 group transition-colors"
            >
              <svg className="w-5 h-5 fill-[#03C75A] transition-transform group-hover:scale-110" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z" />
              </svg>
              <span className="text-neutral-500 group-hover:text-white transition-colors">Naver Blog</span>
            </a>

            {/* Youtube */}
            {YOUTUBE_URL && (
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 group transition-colors"
              >
                <svg className="w-5 h-5 fill-neutral-500 group-hover:fill-[#FF0000] transition-colors" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                <span className="group-hover:text-white transition-colors">Youtube</span>
              </a>
            )}
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-900 pt-8 text-xs text-neutral-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Ilsangmodu x STA Construction. All rights reserved.</p>
          <p className="hidden md:block">Designed by Archilog</p>
        </div>
      </div>
    </footer >
  );
};

export default Footer;
