export enum ProjectCategory {
  ARCHITECTURE = 'ARCHITECTURE',
  RESIDENTIAL = 'RESIDENTIAL',
  COMMERCIAL = 'COMMERCIAL',
  OFFICE = 'OFFICE',
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string; // HTML or Markdown content simulation
  thumbnailUrl: string;
  images: string[];
  date: string;
  category: ProjectCategory;
  naverUrl: string; // Link to the actual Naver blog post
  tags: string[];
}

export interface InquiryFormData {
  name: string;
  contact: string;
  message: string;
}
