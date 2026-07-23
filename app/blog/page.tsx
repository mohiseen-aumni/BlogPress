import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAllPosts } from '@/lib/mdx';

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold tracking-tighter mb-12">All Posts</h1>
          
          {posts.length === 0 && <p>No posts found.</p>}
          
          <div className="space-y-12">
            {posts.map((post) => (
              <div key={post.slug} className="border-b pb-10">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  <h2 className="text-4xl font-semibold">{post.title}</h2>
                </Link>
                <p className="mt-3 text-muted-foreground">{post.description}</p>
                <p className="text-sm text-muted-foreground mt-4">
                  {new Date(post.date).toLocaleDateString()} • {post.readingTime}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}