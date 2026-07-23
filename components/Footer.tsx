import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t py-12 bg-muted/30 mt-auto">
      <div className="max-w-7xl mx-auto px-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} BlogPress. All rights reserved.
      </div>
    </footer>
  );
}