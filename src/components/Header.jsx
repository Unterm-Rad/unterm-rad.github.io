import { Link, useLocation } from 'react-router-dom'
import { Home, BookOpen, User, Book } from 'lucide-react'

export default function Header() {
  const location = useLocation()

  const navLinks = [
    { path: '/', label: '首页', icon: Home },
    { path: '/blog', label: '博客', icon: BookOpen },
    { path: '/bookshelf', label: '书架', icon: Book },
    { path: '/about', label: '关于', icon: User },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-yellow-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl transition-transform group-hover:rotate-12">
            蕪
          </div>
          <div>
            <span className="text-2xl font-semibold tracking-tight text-blue-100">Bukawa</span>
            <p className="text-[10px] text-blue-400 -mt-1 tracking-widest">蕪川</p>
          </div>
        </Link>

        {/* 导航栏 */}
        <nav className="flex items-center gap-8 text-sm">
          {navLinks.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-2 hover:text-blue-400 transition-colors ${
                location.pathname === path 
                  ? 'text-blue-400 font-medium' 
                  : 'text-zinc-400'
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}