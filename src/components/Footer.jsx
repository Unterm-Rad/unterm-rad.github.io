import { Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-10 mt-auto bg-zinc-950">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="flex flex-col items-center gap-4">
          <a 
            href="mailto:your@email.com" 
            className="inline-flex items-center gap-3 text-zinc-400 hover:text-blue-400 transition-all hover:scale-105"
          >
            <Mail size={22} />
            <span className="text-lg hover:underline">94968944748@proton.me</span>
          </a>

          <p className="text-zinc-500 text-sm">
            © 2026 Zephyr Yang
          </p>
        </div>
      </div>
    </footer>
  )
}