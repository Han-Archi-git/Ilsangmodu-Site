import React from 'react';
import { NAVER_BLOG_ID, INSTAGRAM_URL } from '../constants';

const FloatingButtons: React.FC = () => {
    return (
        <div className="fixed bottom-8 right-8 z-[9999] flex flex-col gap-4">
            {/* Instagram Floating Button */}
            {INSTAGRAM_URL && (
                <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 hover:opacity-90" style={{background: 'linear-gradient(135deg, #FCAF45 0%, #F77737 25%, #C13584 60%, #833AB4 100%)'}}
                    aria-label="Instagram"
                >
                    <svg className="w-6 h-6 transition-transform duration-500 group-hover:rotate-12" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.584-.071 4.85c-.055 1.17-.249 1.805-.415 2.227-.217.562-.477.96-.896 1.382-.42.419-.819.679-1.381.896-.422.164-1.056.36-2.227.413-1.266.057-1.646.07-4.85.07s-3.584-.015-4.85-.071c-1.17-.055-1.805-.249-2.227-.415-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.36-1.057-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.015-3.584.071-4.85c.055-1.17.249-1.805.415-2.227.217-.562.477-.96.896-1.382.42-.419.819-.679 1.381-.896.422-.164 1.057-.36 2.227-.413 1.266-.057 1.646-.07 4.85-.07zM12 0C8.741 0 8.333.014 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14c-.297.766-.499 1.636-.558 2.913-.06 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.014-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.025.935 20.354.333 19.56.63c-.765.297-1.636.499-2.913.558C15.667.012 15.26 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>


                    {/* Tooltip */}
                    <span className="absolute right-full mr-4 px-3 py-1 bg-black/80 text-white text-[10px] font-bold tracking-widest uppercase rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        Instagram
                    </span>
                </a>
            )}

            {/* Naver Blog Floating Button */}
            <a
                href={`https://blog.naver.com/${NAVER_BLOG_ID}`}
                target="_blank"
                rel="noreferrer"
                className="group relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 hover:opacity-90 bg-[#03C75A]"
                aria-label="Naver Blog"
            >
                <svg className="w-6 h-6 fill-white transition-transform duration-500 group-hover:-rotate-12" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z" />
                </svg>

                {/* Tooltip */}
                <span className="absolute right-full mr-4 px-3 py-1 bg-black/80 text-white text-[10px] font-bold tracking-widest uppercase rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Naver Blog
                </span>
            </a>
        </div>
    );
};

export default FloatingButtons;
