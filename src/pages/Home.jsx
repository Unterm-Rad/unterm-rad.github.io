import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      {/* Hero 区域 */}
      <section className="pt-24 pb-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6">
            欢迎来到<br />
            <span className="bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              Bukawa's Blog
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-zinc-400 mb-10 leading-relaxed">
            记录我的技术思考、学习笔记与生活感悟。<br />
            一起探索代码与世界的美好。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/blog"
              className="group inline-flex items-center gap-3 bg-blue-500 hover:bg-blue-700 px-8 py-4 rounded-2xl text-lg font-medium transition-all active:scale-95"
            >
              浏览所有文章
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/about"
              className="inline-flex items-center gap-3 border border-zinc-700 hover:border-zinc-500 px-8 py-4 rounded-2xl text-lg font-medium transition-colors"
            >
              关于我
            </Link>
          </div>
        </div>
      </section>

      {/* 特色模块 */}
      <section className="py-16 border-t border-zinc-800">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 hover:border-violet-500/30 transition-colors">
            <div className="w-12 h-12 bg-violet-500/10 rounded-2xl flex items-center justify-center mb-6">
              <Calendar className="w-6 h-6 text-violet-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">最新文章</h3>
            <p className="text-zinc-400">
              分享前端开发等学习经验，和我感兴趣的计算机网络技术学习分享。
            </p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 hover:border-violet-500/30 transition-colors">
            <div className="w-12 h-12 bg-fuchsia-500/10 rounded-2xl flex items-center justify-center mb-6">
              <Clock className="w-6 h-6 text-fuchsia-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">思考与笔记</h3>
            <p className="text-zinc-400">
              记录阅读心得、人生感悟，以及对技术的深度思考。
            </p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 hover:border-violet-500/30 transition-colors">
            <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6">
              🌱
            </div>
            <h3 className="text-2xl font-semibold mb-3">生活记录</h3>
            <p className="text-zinc-400">
              摄影、旅行、日常碎片，以及对生活的热爱。
            </p>
          </div>
        </div>
      </section>

      {/* 快速入口 */}
      <section className="py-20 border-t border-zinc-800 text-center">
        <h2 className="text-4xl font-semibold mb-4">准备好开始阅读了吗？</h2>
        <p className="text-zinc-400 mb-10 max-w-md mx-auto">
          点击下方按钮，进入我的博客列表，探索更多内容。
        </p>
        
        <Link
          to="/blog"
          className="inline-flex items-center gap-3 bg-white text-zinc-950 hover:bg-zinc-200 px-10 py-5 rounded-2xl text-lg font-semibold transition-all active:scale-95"
        >
          进入博客
          <ArrowRight />
        </Link>
      </section>
    </div>
  );
}