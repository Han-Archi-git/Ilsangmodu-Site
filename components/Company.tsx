import React from 'react';

const Company: React.FC = () => {
  return (
    <section id="company" className="py-32 bg-white text-neutral-900 relative border-t border-neutral-100">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-20 items-stretch">

          {/* Left Text Content */}
          <div className="lg:w-1/2 flex flex-col justify-center relative">
            {/* Accent Line */}
            <div className="absolute left-0 top-0 w-[1px] h-20 bg-neutral-200 -translate-x-6 lg:-translate-x-10" />

            <div className="mb-12">
              <span className="block text-[10px] font-bold tracking-[0.2em] text-neutral-400 mb-6 uppercase">Our Philosophy</span>
              <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-8 text-black">
                공간에도<br />
                <span className="text-neutral-400">사람이 필요합니다</span>
              </h2>
            </div>

            <div className="space-y-8 text-neutral-600 font-light leading-relaxed text-sm md:text-base">
              <p>
                좋은 공간은 기술만으론 만들어지지 않습니다.<br />
                <strong>일상모두</strong>의 감각적인 디자인과 <strong>STA종합건설</strong>의 정밀한 시공이 만나<br />
                디자인부터 시공까지 전 과정을 원스톱으로 책임집니다.
              </p>
              <p>
                단순히 건물을 짓는 것을 넘어, 시간이 지나도 변함없이<br />
                당신의 삶을 가치 있게 담아낼 수 있는 본질적인 공간을 제안합니다.
              </p>
            </div>

            <div className="mt-20 pt-12 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div className="group cursor-default">
                <div className="mb-4 text-black group-hover:scale-110 transition-transform duration-300 origin-left">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-black">Sensible Design</h3>
                <p className="text-sm text-neutral-500 leading-relaxed mb-1">
                  공간의 본질과 사용자의 삶을 깊이 고민하는<br />
                  일상모두만의 감각적인 디자인 솔루션입니다.
                </p>
                <div className="w-6 h-[1px] bg-black mt-4"></div>
              </div>

              <div className="group cursor-default">
                <div className="mb-4 text-black group-hover:scale-110 transition-transform duration-300 origin-left">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-black">Premium Build</h3>
                <p className="text-sm text-neutral-500 leading-relaxed mb-1">
                  오랜 경험과 원칙을 바탕으로 기본에 충실한<br />
                  STA종합건설의 정밀하고 안전한 시공 시스템입니다.
                </p>
                <div className="w-6 h-[1px] bg-black mt-4"></div>
              </div>
            </div>
          </div>

          {/* Right Image Block */}
          <div className="lg:w-1/2 relative">
            <div className="relative h-[600px] w-full overflow-hidden grayscale">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Minimalist office space"
                className="w-full h-full object-cover grayscale hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-white/10 mix-blend-overlay" />
            </div>
            {/* Overlay decoration */}
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-neutral-100 z-[-1] hidden lg:block" />
            <div className="absolute -top-8 -right-8 w-40 h-40 border border-neutral-200 z-10 hidden lg:block" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Company;
