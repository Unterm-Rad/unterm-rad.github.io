import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag } from 'lucide-react';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllPosts = async () => {
      try {
        // 从 pages 目录正确读取 src/posts/*.md 文件
        const modules = import.meta.glob('../posts/*.md', {
          eager: true,
          query: '?raw',    // 修改這裡：從 as 改為 query
          import: 'default' // 新增這一行
        });

        const loadedPosts = Object.keys(modules).map((filePath) => {
          const slug = filePath.split('/').pop().replace('.md', ''); // 获取文件名作为 slug
          const rawContent = modules[filePath];

          // 解析 frontmatter
          const frontmatterMatch = rawContent.match(/---\s*([\s\S]*?)\s*---/);
          let frontmatter = {
            title: slug,
            date: '',
            tags: [],
            excerpt: ''
          };

          if (frontmatterMatch) {
            const fm = frontmatterMatch[1];

            const titleMatch = fm.match(/title:\s*["']?([^"'\n]+)/i);
            const dateMatch = fm.match(/date:\s*["']?([^"'\n]+)/i);
            const tagsMatch = fm.match(/tags:\s*\[([^\]]+)\]/i);
            const excerptMatch = fm.match(/excerpt:\s*["']?([^"'\n]+)/i);

            frontmatter = {
              title: titleMatch ? titleMatch[1].trim() : slug,
              date: dateMatch ? dateMatch[1].trim() : '',
              tags: tagsMatch 
                ? tagsMatch[1].split(',').map(t => t.trim().replace(/['"]/g, '')) 
                : [],
              excerpt: excerptMatch ? excerptMatch[1].trim() : '',
            };
          }

          // 自动提取并清洗摘要
          if (!frontmatter.excerpt) {
            const bodyText = rawContent
              .replace(/---[\s\S]*?---/, '') // 移除 frontmatter
              .replace(/<[^>]*>/g, '')         // 2. 去掉 HTML 标签 (如 <p>, <span>)
              .replace(/[#*`~>]/g, '')       // 移除 #, *, `, ~, > 等 MD 符号
              .replace(/!\[.*?\]\(.*?\)/g, '') // 移除图片描述
              .replace(/\[.*?\]\(.*?\)/g, '') // 移除链接描述
              .trim()
              .replace(/\n+/g, ' ');
            
            frontmatter.excerpt = bodyText.substring(0, 120) + '...';
          }

          return {
            slug,
            ...frontmatter,
          };
        });

        // 按日期从新到旧排序
        loadedPosts.sort((a, b) => {
          const dateA = new Date(a.date || '1900-01-01');
          const dateB = new Date(b.date || '1900-01-01');
          return dateB - dateA;
        });

        setPosts(loadedPosts);
      } catch (error) {
        console.error('加载博客文章失败:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAllPosts();
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-20 text-center">
        <p className="text-zinc-400">正在加载文章...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-3">博客</h1>
        <p className="text-zinc-400 text-lg">记录思考与成长</p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-32">
          <p className="text-zinc-400 text-xl">还没有文章，赶快写第一篇吧！</p>
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group block bg-zinc-900/60 border border-zinc-800 rounded-3xl p-8 hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-4 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-zinc-400 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex-shrink-0 mt-2 md:mt-1">
                  {post.date && (
                    <div className="flex items-center gap-2 text-sm text-zinc-500 whitespace-nowrap">
                      <Calendar size={16} />
                      {post.date}
                    </div>
                  )}
                </div>
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {post.tags.map((tag, index) => (
                    <Link
                      key={index}
                      to={`/tags/${tag}`}
                      onClick={(e) => e.stopPropagation()} // 关键：防止点击标签时同时也触发了跳转到文章详情页
                      className="text-xs bg-zinc-800 text-blue-300 px-4 py-1.5 rounded-full hover:bg-blue-500/20 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}