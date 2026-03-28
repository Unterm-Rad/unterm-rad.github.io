import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Hash } from 'lucide-react';

export default function Tags() {
  const [tagStats, setTagStats] = useState({});

  useEffect(() => {
    const fetchTags = async () => {
      const modules = import.meta.glob('../posts/*.md', { as: 'raw', eager: true });
      const stats = {};

      Object.values(modules).forEach((rawContent) => {
        const tagsMatch = rawContent.match(/tags:\s*\[([^\]]+)\]/i);
        if (tagsMatch) {
          const tags = tagsMatch[1].split(',').map(t => t.trim().replace(/['"]/g, ''));
          tags.forEach(tag => {
            stats[tag] = (stats[tag] || 0) + 1;
          });
        }
      });
      setTagStats(stats);
    };
    fetchTags();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="flex items-center gap-3 mb-12">
        <Hash className="text-blue-400" size={32} />
        <h1 className="text-4xl font-bold">标签索引</h1>
      </div>

      <div className="flex flex-wrap gap-4">
        {Object.entries(tagStats).map(([tag, count]) => (
          <Link
            key={tag}
            to={`/tags/${tag}`}
            className="group flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-6 py-3 rounded-2xl hover:border-blue-500/50 transition-all"
          >
            <Tag size={16} className="text-zinc-500 group-hover:text-blue-400" />
            <span className="text-lg font-medium">{tag}</span>
            <span className="bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded-md text-sm">
              {count}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}