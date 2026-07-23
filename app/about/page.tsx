import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 px-6 max-w-3xl mx-auto">
        <h1 className="text-6xl font-bold tracking-tighter mb-8">About BlogPress</h1>
        <p className="text-2xl text-muted-foreground">
          A production-grade blogging platform built with Next.js 15, TypeScript, MDX, and Tailwind CSS.
        </p>
      </main>
      <Footer />
    </div>
  );
}