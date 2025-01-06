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

export interface Author {
  id: string
  name: string
  image: string
  imageAlt: string
  bio: string[]
}