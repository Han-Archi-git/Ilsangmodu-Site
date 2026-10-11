import { BlogPost } from '../types';
import { resolveProjectCategory } from './projectCategories';

interface RssItem {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  enclosure: object;
  categories: string[];
}

interface RssResponse {
  status: string;
  feed: object;
  items: RssItem[];
}

/** 사이트에 저장한 네이버 RSS 전체 목록을 불러온다. */
export const fetchNaverBlogPosts = async (blogId: string): Promise<BlogPost[]> => {
  if (!blogId || blogId === 'YOUR_NAVER_ID') {
    return [];
  }

  try {
    const response = await fetch(`${import.meta.env.BASE_URL}naver-posts.json`, { cache: 'no-store' });
    if (!response.ok) throw new Error('네이버 글 목록을 가져오지 못했습니다.');
    const data: RssResponse = await response.json();

    if (data.status !== 'ok') {
      console.warn('Failed to fetch Naver Blog RSS');
      return [];
    }

    return data.items.flatMap((item, index) => {
      const categories = item.categories || [];
      const category = resolveProjectCategory(categories);
      if (!category) return [];
      // 1. Try to extract image from content if thumbnail field is empty
      let thumbnailUrl = item.thumbnail;
      if (!thumbnailUrl || thumbnailUrl.length === 0) {
        const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
        if (imgMatch) {
          thumbnailUrl = imgMatch[1];
        } else {
          // Fallback placeholder if no image found
          thumbnailUrl = 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
        }
      }

      // 3. Clean up summary (remove HTML tags)
      const cleanSummary = item.description.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...';

      // 4. Clean up date (YYYY-MM-DD HH:mm:ss -> YYYY.MM.DD)
      const dateObj = new Date(item.pubDate);
      const formattedDate = `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(2, '0')}.${String(dateObj.getDate()).padStart(2, '0')}`;

      return [{
        id: item.guid || item.link || `naver-${index}`,
        title: item.title,
        summary: cleanSummary,
        content: item.description, // RSS content usually contains full HTML
        thumbnailUrl: thumbnailUrl,
        images: [thumbnailUrl], // Naver RSS mostly gives one main image easily, others require complex parsing
        date: formattedDate,
        category: category,
        naverUrl: item.link,
        tags: categories.length > 0 ? categories : ['NAVER BLOG'],
      }];
    });

  } catch (error) {
    console.error('Error fetching Naver Blog posts:', error);
    return [];
  }
};