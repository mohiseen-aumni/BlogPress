import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ReadingProgress from '@/components/ReadingProgress';
import { Calendar, Clock, Mail, MapPin } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import Link from 'next/link';
import { Callout } from '@/components/Callout';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// ================= DYNAMIC SOCIAL META TAGS =================
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const url = `https://blog-press-beta.vercel.app/blog/${post.slug}`;
  const image = 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&q=80'; // You can make this dynamic later

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags.join(', '),
    authors: [{ name: 'Admin' }],
    
    // Open Graph (Facebook, LinkedIn, etc.)
    openGraph: {
      title: post.title,
      description: post.description,
      url: url,
      siteName: 'BlogPress',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.date,
    },

    // Twitter Cards
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [image],
      creator: '@yourtwitterhandle',
    },

    // Extra
    alternates: {
      canonical: url,
    },
  };
}

// ================= PAGE COMPONENT =================
export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const allPosts = await getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 4);
  const shareUrl = `https://blog-press-beta.vercel.app/blog/${post.slug}`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <ReadingProgress />

      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content */}
          <article className="lg:col-span-8">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-10">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                {post.readingTime}
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none prose-p:leading-relaxed">
              <MDXRemote
                source={post.content}
                components={{ Callout }}
                options={{
                  mdxOptions: {
                    rehypePlugins: [[rehypePrettyCode, { theme: 'github-dark' }]],
                  },
                }}
              />
            </div>

            {/* Tags */}
<div className="mt-12 pt-6 border-t flex flex-wrap gap-2">
  {post.tags.map((tag) => (
    <span
      key={tag}
      className="text-sm text-muted-foreground"
    >
      #{tag}
    </span>
  ))}
</div>

            {/* Social Share Buttons */}
            <div className="mt-10 pt-8 border-t">
              <h3 className="text-lg font-semibold mb-4">Share this article</h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-lg bg-[#1877F2] text-white text-sm font-medium hover:opacity-90 transition"
                >
                  Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:opacity-90 transition"
                >
                  Twitter / X
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-lg bg-[#0A66C2] text-white text-sm font-medium hover:opacity-90 transition"
                >
                  LinkedIn
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + ' ' + shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-lg bg-[#25D366] text-white text-sm font-medium hover:opacity-90 transition"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Admin Card */}
            <div className="border border-zinc-700 rounded-2xl p-6 bg-black text-white shadow-sm sticky top-28">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                  A
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-white">Admin</h3>
                  <p className="text-sm text-zinc-400">Blog Author</p>
                </div>
              </div>
              <p className="text-sm text-zinc-300 mb-4">
                Writing about technology, safety and practical solutions for modern living.
              </p>
              <div className="space-y-2 text-sm text-zinc-400">
                <div className="flex items-center gap-2">
                  <Mail size={14} /> admin@blogpress.com
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} /> Auckland, New Zealand
                </div>
              </div>
            </div>

            {/* Related Posts */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Popular posts from this blog</h3>
              <div className="space-y-5">
                {relatedPosts.map((related) => (
                  <div key={related.slug} className="border rounded-xl p-5 hover:shadow-md transition-shadow bg-card">
                    <Link href={`/blog/${related.slug}`}>
                      <h4 className="font-medium leading-snug hover:text-primary transition-colors">
                        {related.title}
                      </h4>
                    </Link>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(related.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                      {related.description}
                    </p>
                    <Link href={`/blog/${related.slug}`} className="inline-block mt-3 text-sm text-primary hover:underline">
                      Read more →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}