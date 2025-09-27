import React from 'react';
import { motion } from 'framer-motion';
import { BLOG_POSTS } from '../../lib/constants';
import { BlogPost } from '../../types';

const BlogCard: React.FC<{ post: BlogPost; index: number }> = ({ post, index }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-brand-secondary rounded-2xl overflow-hidden border border-transparent hover:border-brand-accent transition-all duration-300 group cursor-pointer"
    >
      <div className="relative">
        <motion.img
          src={post.imageUrl}
          alt={post.title}
          loading="lazy"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-brand-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
          <span>{post.author}</span>
          <span>•</span>
          <span>{formatDate(post.publishedAt)}</span>
          <span>•</span>
          <span>{post.readTime} min read</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-accent transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map(tag => (
            <motion.span
              key={tag}
              whileHover={{ scale: 1.05 }}
              className="text-xs bg-brand-primary/60 text-gray-300 px-2 py-1 rounded-full border border-brand-primary/40"
            >
              {tag}
            </motion.span>
          ))}
          {post.tags.length > 3 && (
            <span className="text-xs text-gray-500">+{post.tags.length - 3} more</span>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const BlogSection: React.FC = () => {
  return (
    <section id="blog" className="py-20 bg-brand-primary/95" style={{backgroundImage: 'radial-gradient(circle at top, #2B2B4F, #030213)'}}>
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white">Latest Insights</h2>
          <p className="text-lg text-gray-400 mt-2">Thought leadership, technical tutorials, and industry insights from our team.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-brand-accent text-white px-8 py-3 rounded-full hover:bg-blue-500 transition-colors duration-300 font-semibold text-lg"
          >
            View All Posts
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
