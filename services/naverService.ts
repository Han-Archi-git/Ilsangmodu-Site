import { BlogPost, ProjectCategory } from '../types';

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

/**
 * Fetches the latest blog posts from Naver Blog RSS feed.
 * 
 * Note: Naver blocks direct frontend fetch due to CORS. 
 * We use 'https://api.rss2json.com' as a public proxy to convert RSS XML to JSON.
 * This is suitable for a simple portfolio, but for high traffic, a dedicated backend is recommended.
 */
export const fetchNaverBlogPosts = async (blogId: string): Promise<BlogPost[]> => {
  if (!blogId || blogId === 'YOUR_NAVER_ID') {
    return [];
  }

  // Add cache buster to bypass rss2json caching
  const rssUrl = `https://rss.blog.naver.com/${blogId}?t=${new Date().getTime()}`;
  // Using api.rss2json.com to parse XML to JSON and bypass CORS
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

  try {
    const response = await fetch(apiUrl);
    const data: RssResponse = await response.json();

    if (data.status !== 'ok') {
      console.warn('Failed to fetch Naver Blog RSS');
      return [];
    }

    return data.items.map((item, index) => {
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

      // 2. Determine Category: RSS Categories (Priority) > Title Keywords used as fallback
      let category = ProjectCategory.PLAN;
      const categories = item.categories || [];
      const titleLower = item.title.toLowerCase();

      // Priority 1: Check RSS Categories (Most accurate from Naver Blog)
      if (categories.some(c => c.includes('공사') || c.includes('시공') || c.includes('현장'))) {
        category = ProjectCategory.CONSTRUCTION;
      } else if (categories.some(c => c.includes('완공') || c.includes('준공') || c.includes('실적'))) {
        category = ProjectCategory.COMPLETED;
      } else if (categories.some(c => c.includes('계획') || c.includes('설계') || c.includes('제안') || c.includes('프로젝트'))) {
        category = ProjectCategory.PLAN;
      }
      // Priority 2: Fallback to Title keywords if RSS category is ambiguous or missing
      else if (titleLower.includes('공사') || titleLower.includes('현장') || titleLower.includes('착공') || titleLower.includes('시공')) {
        category = ProjectCategory.CONSTRUCTION;
      } else if (titleLower.includes('완공') || titleLower.includes('준공') || titleLower.includes('입주') || titleLower.includes('사용승인')) {
        category = ProjectCategory.COMPLETED;
      } else if (titleLower.includes('계획') || titleLower.includes('설계') || titleLower.includes('제안') || titleLower.includes('test')) {
        category = ProjectCategory.PLAN;
      }

      // 3. Clean up summary (remove HTML tags)
      const cleanSummary = item.description.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...';

      // 4. Clean up date (YYYY-MM-DD HH:mm:ss -> YYYY.MM.DD)
      const dateObj = new Date(item.pubDate);
      const formattedDate = `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(2, '0')}.${String(dateObj.getDate()).padStart(2, '0')}`;

      return {
        id: `naver-${index}`,
        title: item.title,
        summary: cleanSummary,
        content: item.description, // RSS content usually contains full HTML
        thumbnailUrl: thumbnailUrl,
        images: [thumbnailUrl], // Naver RSS mostly gives one main image easily, others require complex parsing
        date: formattedDate,
        category: category,
        naverUrl: item.link,
        tags: categories.length > 0 ? categories : ['NAVER BLOG'],
      };
    });

  } catch (error) {
    console.error('Error fetching Naver Blog posts:', error);
    return [];
  }
};