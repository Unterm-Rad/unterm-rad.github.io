export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="prose prose-invert max-w-none">
        <h1 className="text-5xl font-bold mb-6">关于我</h1>
        
        <p className="text-xl text-zinc-400 mb-8">
          你好，我是 Zephyr。
        </p>
        
        <p className="text-zinc-300 leading-relaxed">
          这里是我的个人博客空间。我会在这里分享技术文章、生活思考、读书笔记，以及一些有趣的实验和项目。
        </p>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">目前主要方向</h2>
          <ul className="list-disc list-inside space-y-2 text-zinc-400">
            <li>前端开发</li>
            <li>个人知识管理与笔记系统</li>
            <li>一些有趣的生活记录</li>
          </ul>
        </div>
      </div>
    </div>
  )
}