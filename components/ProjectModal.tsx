import React, { useEffect } from 'react';
import { X, ExternalLink, Calendar, MapPin, Tag } from 'lucide-react';
import { BlogPost } from '../types';

interface ProjectModalProps {
    post: BlogPost | null;
    onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ post, onClose }) => {
    // Lock body scroll when modal is open
    useEffect(() => {
        if (post) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [post]);

    if (!post) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop with strong blur */}
            <div
                className="absolute inset-0 bg-white/95 backdrop-blur-md transition-opacity duration-500"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative bg-white w-full h-[100dvh] md:h-[90vh] md:max-w-[1400px] shadow-[0_0_100px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
                
                {/* Close Button (Fixed) */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-8 z-[110] group flex items-center gap-2 text-black hover:opacity-50 transition-all"
                >
                    <span className="text-[10px] font-bold tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">CLOSE</span>
                    <X className="w-6 h-6 stroke-[1.5px]" />
                </button>

                {/* Left Side: Images Gallery (Scrollable) */}
                <div className="w-full md:w-[65%] h-[50vh] md:h-full overflow-y-auto no-scrollbar scroll-smooth bg-neutral-50">
                    <div className="flex flex-col">
                        {/* Main Thumbnail */}
                        <div className="w-full bg-neutral-200 aspect-[16/10]">
                            <img
                                src={post.image || post.thumbnailUrl}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        
                        {/* More images if available */}
                        {post.images && post.images.map((img, idx) => (
                            <div key={idx} className="w-full bg-neutral-200 aspect-[16/10] mt-1">
                                <img
                                    src={img}
                                    alt={`${post.title} detail ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}

                        {/* Visual Filler if no enough images */}
                        {(!post.images || post.images.length === 0) && (
                            <div className="py-20 px-12 flex items-center justify-center text-neutral-300">
                                <p className="text-[10px] tracking-widest uppercase italic">The essence of space through design</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: Content (Sticky on desktop) */}
                <div className="w-full md:w-[35%] h-[50vh] md:h-full overflow-y-auto p-8 md:p-16 flex flex-col border-l border-neutral-100">
                    {/* Category & Status */}
                    <div className="flex items-center gap-4 text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase mb-8">
                        <span>{post.category}</span>
                        <span className="w-1 h-1 bg-neutral-300 rounded-full"></span>
                        <span className="text-black">COMPLETED</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 leading-[1.2] tracking-tight">
                        {post.title}
                    </h2>

                    {/* Meta Box */}
                    <div className="space-y-6 mb-12 py-8 border-y border-neutral-100">
                        <div className="flex items-start gap-4">
                            <MapPin className="w-4 h-4 text-neutral-400 mt-0.5" />
                            <div>
                                <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Location</h4>
                                <p className="text-sm font-medium text-black">SEOUL, KOREA</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Calendar className="w-4 h-4 text-neutral-400 mt-0.5" />
                            <div>
                                <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Date</h4>
                                <p className="text-sm font-medium text-black">{post.date}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Tag className="w-4 h-4 text-neutral-400 mt-0.5" />
                            <div>
                                <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Tags</h4>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="text-[10px] px-2 py-1 bg-neutral-50 text-neutral-500 border border-neutral-100 uppercase tracking-wider">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Snippet */}
                    <div className="mb-12">
                        <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-4">Project Overview</h4>
                        <p className="text-sm text-neutral-600 leading-[1.8] font-light">
                            {post.snippet}
                        </p>
                    </div>

                    {/* CTA Button: Naver Blog */}
                    <div className="mt-auto pt-8">
                        <a
                            href={post.naverUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="group block w-full py-5 bg-black text-white text-center rounded-sm overflow-hidden relative"
                        >
                            <div className="relative z-10 flex items-center justify-center gap-3">
                                <span className="text-[10px] font-bold tracking-[0.2em] group-hover:translate-x-[-4px] transition-transform duration-300">VIEW FULL STORY</span>
                                <ExternalLink className="w-4 h-4 group-hover:translate-x-[4px] group-hover:translate-y-[-2px] transition-transform duration-300" />
                            </div>
                            <div className="absolute inset-0 bg-neutral-800 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300" />
                        </a>
                        <p className="text-[9px] text-center text-neutral-400 mt-4 tracking-widest uppercase opacity-50">
                            Explore full details and process on Naver Blog
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;