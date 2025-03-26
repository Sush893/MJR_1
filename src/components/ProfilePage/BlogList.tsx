import React from 'react';
import { BlogPost } from '../../types/profile';
import { Edit2, Trash2, Clock, Tag } from 'lucide-react';

interface BlogListProps {
  posts: BlogPost[];
  onEdit: (post: BlogPost) => void;
  onDelete: (postId: string) => void;
}

export function BlogList({ posts = [], onEdit, onDelete }: BlogListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <p className="text-gray-500 dark:text-gray-400">No blog posts yet. Write your first post!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <article key={post.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white hover:text-emerald-600 transition-colors cursor-pointer">
              {post.title}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(post)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                aria-label="Edit post"
              >
                <Edit2 className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
              <button
                onClick={() => onDelete(post.id)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                aria-label="Delete post"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed line-clamp-3">
            {post.content}
          </p>
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}