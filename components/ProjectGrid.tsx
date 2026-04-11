import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BlogPost } from '../types';
import ProjectModal from './ProjectModal';

interface ProjectGridProps {
  posts: BlogPost[];
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ posts }) => {
  const [filter, setFilter] = useState('ALL');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(posts || []);
  const [visibleCount, setVisibleCount] = useState(8);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // When filter or posts change, update filteredPosts and reset visible count
  useEffect(() => {
    setVisibleCount(8);
    if (!posts) {
      setFilteredPosts([]);
      return;
    }
    if (filter === 'ALL') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.category === filter));
    }
  }, [posts, filter]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  const categories = ['ALL', 'ARCHITECTURE', 'RESIDENTIAL', 'COMMERCIAL', 'OFFICE'];

  return (
    <section id="projects" className="py-24 bg-white text-neutral-900 border-t border-neutral-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] text-neutral-500 mb-4 block uppercase">Our Works</span>
            <h2 className="text-2xl md:text-4xl font-bold">Projects</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 text-[10px] font-bold transition-all border rounded-full ${filter === cat
                  ? 'bg-black text-white border-black'
                  : 'bg-transparent text-neutral-500 border-neutral-200 hover:border-black hover:text-black'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-12 md:gap-y-16">
          {filteredPosts.slice(0, visibleCount).map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group cursor-pointer block"
            >
              <div className="relative overflow-hidden aspect-[4/3] mb-6 bg-neutral-100 rounded-sm shadow-sm">
                <img
                  src={post.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80'}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <ArrowUpRight className="w-5 h-5 text-black" />
                  </div>
                </div>
              </div>
              <div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 block">{post.category}</span>
                <h3 className="text-lg font-bold group-hover:text-neutral-500 transition-colors mb-1">{post.title}</h3>
                <p className="text-neutral-500 text-xs font-light line-clamp-2 leading-relaxed">{post.snippet}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {filteredPosts.length > visibleCount && (
          <div className="mt-20 text-center">
            <button
              onClick={handleLoadMore}
              className="px-12 py-4 border border-neutral-200 text-[10px] font-bold tracking-widest uppercase hover:bg-black hover:text-white hover:border-black transition-all duration-300 rounded-full"
            >
              Load More Projects
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20 bg-neutral-50 rounded-lg">
            <p className="text-neutral-400">해당 카테고리의 프로젝트가 준비중입니다.</p>
          </div>
        )}
        {/* Project Detail Modal */}
        <ProjectModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      </div>
    </section>
  );
};

export default ProjectGrid;
