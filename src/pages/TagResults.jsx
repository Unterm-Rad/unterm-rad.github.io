import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Tag as TagIcon } from 'lucide-react';

export default function TagResults() {
  const { tag } = useParams();
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const loadFilteredPosts = async () => {
    const modules = import.meta.glob('../posts/*.md', { 
      query: '?raw',    // 修改這裡
      import: 'default', // 新增這一行
      eager: true 
    });
      const posts = Object.keys(modules).map(path => {
        const slug = path.split('/').pop().replace('.md', '');
        const rawContent = modules[path];
        
        // 这里建议复用你 Blog.jsx 里的正则解析逻辑
        const titleMatch = rawContent.match(/title:\s*["']?([^"'\n]+)/i);
        const tagsMatch = rawContent.match(/tags:\s*\[([^\]]+)\]/i);
        
        return {
          slug,
          title: titleMatch ? titleMatch[1] : slug,
          tags: tagsMatch ? tagsMatch[1].split(',').map(t => t.trim().replace(/['"]/g, '')) : []
        };
      }).filter(post => post.tags.includes(tag));

      setFilteredPosts(posts);
    };
    loadFilteredPosts();
  }, [tag]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <Link to="/tags" className="inline-flex items-center gap-2 text-zinc-500 hover:text-blue-400 mb-8">
        <ArrowLeft size={18} /> 返回所有标签
      </Link>
      
      <div className="flex items-center gap-3 mb-12">
        <TagIcon className="text-blue-400" size={28} />
        <h1 className="text-3xl font-bold">标签: <span className="text-blue-400">#{tag}</span></h1>
      </div>

      <div className="grid gap-6">
        {filteredPosts.map(post => (
          <Link key={post.slug} to={`/blog/${post.slug}`} className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all">
            <h2 className="text-xl font-semibold">{post.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}