import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAllPosts } from '@/lib/mdx';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

// Map of slug → image (from the MDX posts)
const postImages: Record<string, string> = {
  'seo-strategies-2026': 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80',
  'ai-powered-content-creation': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
  'modern-web-development-trends': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
  'hello-world': 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
  'next-js-15': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
};

export default async function Home() {
  const posts = await getAllPosts();
  const featuredPosts = posts.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-b from-background to-muted/40">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm mb-8">
            <span className="text-primary font-medium">✨ New</span>
            <span>Modern Blogging Platform</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-none mb-6">
            Thoughts that<br />matter.
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            A clean and fast blogging platform built with Next.js 15, MDX and modern design principles.
          </p>

          <Link
            href="/blog"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-medium hover:bg-primary/90 transition"
          >
            Explore Posts
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
                Featured
              </p>
              <h2 className="text-4xl font-semibold tracking-tight">Latest Stories</h2>
            </div>
            <Link
              href="/blog"
              className="hidden sm:flex items-center gap-2 text-sm hover:text-primary transition"
            >
              View all <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => {
              const imageUrl =
                postImages[post.slug] ||
                'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80';

              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col bg-card border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Real Blog Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        {post.readingTime}
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                      {post.description}
                    </p>

                    <div className="mt-auto flex flex-wrap gap-2">
                      {post.categories.slice(0, 2).map((cat) => (
                        <span
                          key={cat}
                          className="text-xs px-2.5 py-1 rounded-full bg-muted"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}