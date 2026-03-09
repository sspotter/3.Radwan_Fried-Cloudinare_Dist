import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-white/5 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-black italic text-white tracking-widest uppercase">
              Engineered<span className="text-[#c8a72c]">.</span>
            </Link>
          </div>
          <nav className="flex space-x-10">
            <Link
              href="/"
              className="text-xs font-bold uppercase tracking-widest text-[#767676] hover:text-[#c8a72c] transition-all"
            >
              The Catalog
            </Link>
            <Link
              href="/user"
              className="text-xs font-bold uppercase tracking-widest text-[#767676] hover:text-[#c8a72c] transition-all"
            >
              User Access
            </Link>
            <Link
              href="/admin"
              className="text-xs font-bold uppercase tracking-widest text-[#767676] hover:text-[#c8a72c] transition-all"
            >
              Management
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
