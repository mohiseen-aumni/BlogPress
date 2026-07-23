export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  categories: string[];
  tags: string[];
  readingTime: string;
  content: string;
}

export interface Frontmatter {
  title: string;
  date: string;
  description: string;
  categories: string[];
  tags: string[];
}