import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Tags() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold tracking-tighter mb-8">Tags</h1>
          <p className="text-xl text-muted-foreground">Coming soon...</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}