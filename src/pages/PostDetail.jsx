import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'github-markdown-css/github-markdown.css';
import { ArrowLeft, Calendar, Tag, ArrowUp } from 'lucide-react'; // 1. 引入 ArrowUp 图标
import rehypeRaw from 'rehype-raw';

export default function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // 2. 新增：控制按钮显示/隐藏的状态
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // 3. 监听滚动事件
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 4. 新增：回到顶部的平滑滚动函数
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const loadPost = async () => {
      try {
        const modules = import.meta.glob('../posts/*.md', { 
          query: '?raw',
          import: 'default',
          eager: false 
        });

        const filePath = `../posts/${slug}.md`;
        
        if (!modules[filePath]) {
          setPost({ error: true });
          return;
        }

        const rawContent = await modules[filePath]();
        
        const frontmatterMatch = rawContent.match(/---\s*([\s\S]*?)\s*---/);
        let frontmatter = { title: slug, date: '', tags: [] };
        let content = rawContent;

        if (frontmatterMatch) {
          const fm = frontmatterMatch[1];
          content = rawContent.replace(/---[\s\S]*?---/, '').trim();

          const titleMatch = fm.match(/title:\s*["']?([^"'\n]+)/i);
          const dateMatch = fm.match(/date:\s*["']?([^"'\n]+)/i);
          const tagsMatch = fm.match(/tags:\s*\[([^\]]+)\]/i);

          frontmatter = {
            title: titleMatch ? titleMatch[1].trim() : slug,
            date: dateMatch ? dateMatch[1].trim() : '',
            tags: tagsMatch 
              ? tagsMatch[1].split(',').map(t => t.trim().replace(/['"]/g, '')) 
              : [],
          };
        }

        setPost({ frontmatter, content });
      } catch (error) {
        setPost({ error: true });
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) return <div className="text-center py-20 text-zinc-400">正在加载...</div>;
  if (!post || post.error) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-4">文章未找到</h1>
        <Link to="/blog" className="text-blue-400">← 返回列表</Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-16 relative">
      <Link to="/blog" className="inline-flex items-center gap-2 text-zinc-400 hover:text-blue-400 mb-10">
        <ArrowLeft size={18} /> 返回博客列表
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-6">{post.frontmatter.title}</h1>
        <div className="flex flex-wrap gap-6 text-sm text-zinc-400">
          {post.frontmatter.date && (
            <div className="flex items-center gap-2">
              <Calendar size={16}/>
              {post.frontmatter.date}
            </div>
          )}
          
          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="flex items-center gap-2">
              <Tag size={16} />
              <div className="flex gap-2">
                {post.frontmatter.tags.map((tag, i) => (
                  <Link 
                    key={i} 
                    to={`/tags/${tag}`}
                    className="bg-zinc-800 text-blue-300 px-3 py-1 rounded-full text-xs hover:bg-blue-500/20 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="prose prose-invert prose-zinc max-w-none markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {post.content}
        </ReactMarkdown>
      </div>

      {/* 5. 新增：回到顶部按钮组件 */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-10 right-10 p-3 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 text-blue-400 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 hover:border-blue-500/50 hover:text-blue-300 z-50 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Back to Top"
      >
        <ArrowUp size={24} />
      </button>
    </article>
  );
}