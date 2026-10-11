import React from 'react';

export const COLLABORATING_PARTNERS = [
  { name: 'STA종합건설', role: '건설 · 시공' },
  { name: '(주)SLK종합건축사사무소', role: '건축설계 · 인허가' },
];

interface PartnersProps {
  tone?: 'dark' | 'light';
}

/** 일상모두와 협력하는 회사의 이름과 담당 분야를 구분해 표시한다. */
const Partners: React.FC<PartnersProps> = ({ tone = 'light' }) => {
  const dark = tone === 'dark';
  return (
    <div className={dark ? 'max-w-xl mx-auto' : 'w-full'}>
      <p className={`text-[10px] font-medium tracking-[0.2em] mb-4 ${dark ? 'text-white/45' : 'text-neutral-400'}`}>
        협력사 <span className="ml-2 text-[9px] tracking-[0.15em]">OUR PARTNERS</span>
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {COLLABORATING_PARTNERS.map(partner => (
          <div key={partner.name} className={`px-5 py-4 border rounded-sm ${dark ? 'border-white/15 bg-white/[0.04] backdrop-blur-sm' : 'border-neutral-200 bg-neutral-50'}`}>
            <p className={`text-[10px] tracking-wide mb-2 ${dark ? 'text-white/45' : 'text-neutral-500'}`}>{partner.role}</p>
            <p className={`text-sm sm:text-base font-medium break-keep ${dark ? 'text-white/80' : 'text-neutral-800'}`}>{partner.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
