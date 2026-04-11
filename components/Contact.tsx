import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle, XCircle, Loader2, Building2, Hammer } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: '설계문의',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setStatusMessage('');

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_id';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_id';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key';

      // Simulate success if keys are not set or are placeholders
      if (!import.meta.env.VITE_EMAILJS_PUBLIC_KEY || publicKey === 'public_key') {
        setTimeout(() => {
          setStatus('success');
          setStatusMessage('문의가 접수되었습니다. 곧 담당자가 연락드리겠습니다. (Demo Mode)');
          setFormData({ name: '', email: '', phone: '', type: '설계문의', message: '' });
        }, 1000);
        return;
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          reply_to: formData.email,
          phone: formData.phone,
          inquiry_type: formData.type,
          message: formData.message,
          to_email: 'taehee0512@gmail.com'
        },
        publicKey
      );

      setStatus('success');
      setStatusMessage('문의가 접수되었습니다. 곧 담당자가 연락드리겠습니다.');
      setFormData({ name: '', email: '', phone: '', type: '설계문의', message: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus('error');
      setStatusMessage('문의 전송 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <section id="contact" className="py-24 bg-white text-neutral-900 border-t border-neutral-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20">

          {/* Contact Info Side */}
          <div className="lg:w-1/3 flex flex-col justify-between">
            <div>
              <span className="block text-[10px] font-bold tracking-[0.2em] text-neutral-500 mb-6 uppercase">Contact Us</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight tracking-tight">
                함께 만드는<br />
                <span className="text-neutral-400">새로운 공간</span>
              </h2>

              <div className="space-y-10 mt-12 mb-12">
                <div className="flex gap-5 items-start group">
                  <div className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2">Location</h4>
                    <p className="font-light text-neutral-600 text-sm mb-2">서울시 강남구 논현로 123<br />디자인빌딩 4F</p>
                    <a
                      href="https://map.naver.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-neutral-400 border-b border-neutral-200 hover:text-black hover:border-black transition-colors pb-0.5 inline-block"
                    >
                      VIEW MAP
                    </a>
                  </div>
                </div>

                <div className="flex gap-5 items-start group">
                  <div className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2">Call Us</h4>
                    <p className="font-light text-neutral-600 text-sm">02-1234-5678</p>
                    <p className="text-sm text-neutral-400 mt-1">Mon-Fri, 9am - 6pm</p>
                  </div>
                </div>

                <div className="flex gap-5 items-start group">
                  <div className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2">Email</h4>
                    <p className="font-light text-neutral-600 text-sm">hello@ilsangmodu.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Partnership Info */}
            <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-800 mb-4">One-Stop Solution</h4>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                일상모두는 인테리어와 리모델링을 중심으로, 협력 건축사사무소 및 시공사와의 긴밀한 파트너십을 통해 건축 설계부터 시공, 인허가까지 논스톱으로 해결합니다.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-[10px] font-medium text-neutral-500">
                  <Building2 className="w-4 h-4" />
                  <span>건축 설계/인허가</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-medium text-neutral-500">
                  <Hammer className="w-4 h-4" />
                  <span>종합 시공/관리</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-2/3 bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-neutral-100">
            <h3 className="text-xl font-bold mb-2">Project Inquiry</h3>
            <p className="text-neutral-500 mb-8 font-light text-xs">구체적인 상담을 위해 아래 정보를 입력해주세요.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Name / Company</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-neutral-50 border border-neutral-200 p-3 text-sm text-black focus:outline-none focus:border-black focus:ring-0 transition-colors rounded-sm"
                    placeholder="성함 또는 회사명"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-neutral-50 border border-neutral-200 p-3 text-sm text-black focus:outline-none focus:border-black focus:ring-0 transition-colors rounded-sm"
                    placeholder="연락처"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-neutral-50 border border-neutral-200 p-3 text-sm text-black focus:outline-none focus:border-black focus:ring-0 transition-colors rounded-sm"
                    placeholder="이메일"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 border border-neutral-200 p-3 text-sm text-black focus:outline-none focus:border-black focus:ring-0 transition-colors rounded-sm appearance-none cursor-pointer"
                  >
                    <option value="설계문의">건축 설계 문의</option>
                    <option value="시공/턴키">시공 및 턴키 문의</option>
                    <option value="인허가/법규">인허가 및 법규 검토</option>
                    <option value="기타">기타 문의</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-neutral-50 border border-neutral-200 p-3 text-sm text-black focus:outline-none focus:border-black focus:ring-0 transition-colors resize-none rounded-sm"
                  placeholder="프로젝트의 위치, 용도, 규모 등 구체적인 내용을 적어주시면 더욱 정확한 상담이 가능합니다."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-5 bg-black text-white font-bold text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 rounded-sm"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Inquiry</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="bg-green-50 text-green-600 p-4 text-center text-sm font-medium border border-green-200 rounded-sm flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  {statusMessage}
                </div>
              )}

              {status === 'error' && (
                <div className="bg-red-50 text-red-600 p-4 text-center text-sm font-medium border border-red-200 rounded-sm flex items-center justify-center gap-2">
                  <XCircle className="w-5 h-5" />
                  {statusMessage}
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;