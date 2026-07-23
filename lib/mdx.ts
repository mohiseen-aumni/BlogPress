import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { BlogPost, Frontmatter } from './types';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export async function getAllPosts(): Promise<BlogPost[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  
  const posts = await Promise.all(
    fileNames
      .filter(fileName => fileName.endsWith('.mdx'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.mdx$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        const rt = readingTime(content);

        return {
          slug,
          ...(data as Frontmatter),
          readingTime: `${Math.ceil(rt.minutes)} min read`,
          content,
        } as BlogPost;
      })
  );

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const rt = readingTime(content);

    return {
      slug,
      ...(data as Frontmatter),
      readingTime: `${Math.ceil(rt.minutes)} min read`,
      content,
    } as BlogPost;
  } catch {
    return null;
  }
}

export async function getAllCategories() {
  const posts = await getAllPosts();
  const cats = new Set(posts.flatMap(p => p.categories));
  return Array.from(cats);
}

export async function getAllTags() {
  const posts = await getAllPosts();
  const tags = new Set(posts.flatMap(p => p.tags));
  return Array.from(tags);
}