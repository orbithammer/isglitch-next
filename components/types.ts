// types.ts
export interface Article {
    id: string;
    title: string;
    category: string;
    tags: string[];
  }
  
  export interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
  }
  
  export interface HeaderProps {
    articlesData?: Article[];
  }