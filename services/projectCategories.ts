import { BlogPost, ProjectCategory } from '../types';

export const COMPLETED_CATEGORIES: ProjectCategory[] = [
  ProjectCategory.ARCHITECTURE,
  ProjectCategory.RESIDENTIAL,
  ProjectCategory.COMMERCIAL,
  ProjectCategory.OFFICE,
];

/** 네이버 카테고리를 사이트 메뉴에 연결하고 알 수 없는 분류는 제외한다. */
export const resolveProjectCategory = (categories: string[]): ProjectCategory | null => {
  const normalized = categories.map(category => category.trim().toUpperCase().replace(/[\s_-]+/g, ''));
  if (normalized.some(category => ['ONSITE', '공사중', 'INPROGRESS'].includes(category))) {
    return ProjectCategory.ON_SITE;
  }
  if (normalized.includes('MAINTENANCE')) return ProjectCategory.MAINTENANCE;
  return COMPLETED_CATEGORIES.find(category => normalized.includes(category)) ?? null;
};

/** ALL에는 완성작 카테고리만 표시하고 현장 기록과 유지보수는 각각의 메뉴에 표시한다. */
export const filterProjectPosts = (posts: BlogPost[], filter: string): BlogPost[] => {
  return posts.filter(post => filter === 'ALL'
    ? COMPLETED_CATEGORIES.includes(post.category)
    : post.category === filter);
};
