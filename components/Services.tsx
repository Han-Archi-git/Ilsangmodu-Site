import React from 'react';
import { Building2, MonitorSmartphone, Hammer, Paintbrush, Ruler } from 'lucide-react';

const services = [
    {
        icon: <Building2 className="w-6 h-6" />,
        title: "Architectural Design",
        titleKo: "디자인 설계",
        desc: "용도에 맞는 구조와 공간 구성을 통해 사업성과 디자인을 동시에 고려한 설계를 제안합니다."
    },
    {
        icon: <MonitorSmartphone className="w-6 h-6" />,
        title: "Administrative Solution",
        titleKo: "인허가·행정 솔루션",
        desc: "신축, 증축, 대수선, 용도변경 등 복잡한 건축행위에 따른 인허가와 행정 절차를 전문 협력업체와 함께 체계적으로 검토·관리합니다."
    },
    {
        icon: <Hammer className="w-6 h-6" />,
        title: "Turnkey Solution",
        titleKo: "시공 턴키 솔루션",
        desc: "설계부터 시공까지 전 과정을 통합 관리하여 프로젝트의 완성도와 효율을 극대화합니다."
    },
    {
        icon: <Paintbrush className="w-6 h-6" />,
        title: "Interior Design",
        titleKo: "공간 디자인",
        desc: "사용자의 라이프스타일을 반영한 실용적이고 완성도 높은 공간을 설계합니다."
    },
    {
        icon: <Ruler className="w-6 h-6" />,
        title: "Remodeling / Renovation",
        titleKo: "리모델링·대수선",
        desc: "기존 공간의 문제를 구조적으로 진단하고 동선·성능·디자인을 함께 개선합니다."
    }
];

const Services: React.FC = () => {
    return (
        <section id="services" className="py-24 bg-white text-neutral-900 border-t border-neutral-100">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-neutral-500 mb-4 block uppercase">Our Services</span>
                    <h2 className="text-2xl md:text-3xl font-bold">Total Solution</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group p-10 border border-neutral-100 bg-neutral-50 hover:bg-white hover:border-black/10 transition-all duration-500 hover:shadow-xl rounded-2xl"
                        >
                            <div className="w-14 h-14 rounded-full border border-neutral-200 flex items-center justify-center mb-8 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                                {service.icon}
                            </div>
                            <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">{service.title}</h4>
                            <h3 className="text-lg font-bold mb-4">{service.titleKo}</h3>
                            <p className="text-neutral-600 leading-relaxed font-light text-xs keep-all">
                                {service.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
