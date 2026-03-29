import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';

export default function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        // 1. 获取所有文章模块
        const modules = import.meta.glob('../posts/*.md', { 
          query: '?raw',    // 修改這裡
          import: 'default', // 新增這一行
          eager: false 
        });

        // 2. 匹配当前路径
        const filePath = `../posts/${slug}.md`;
        
        if (!modules[filePath]) {
          console.error('未找到文件:', filePath);
          setPost({ error: true });
          return;
        }

        // 3. 读取原始内容
        const rawContent = await modules[filePath]();
        
        // 4. 使用正则解析 Frontmatter (与 Blog.jsx 逻辑一致)
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
        console.error('解析文章失败:', error);
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
    <article className="max-w-3xl mx-auto px-6 py-16">
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
          
          {/* 新增：渲染可点击的标签列表 */}
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

      {/* 渲染正文 */}
      <div className="prose prose-invert prose-zinc max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}