// types.ts
export interface Article {
  id: number;
  articleUrl: string;
  category: string;
  img: string;
  alt: string;
  header: string;
  subhead: string;
  tags: string[];
  author: string;
  datePublished: Date;
  articleBody: string[];
}
  
export interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export interface HeaderProps {
  articlesData?: Article[];
}