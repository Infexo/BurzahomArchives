'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, FolderOpen, Users, Globe } from 'lucide-react';

interface BrowseItem {
  name: string;
  slug: string;
  count?: number;
}

interface BrowseSectionProps {
  title: string;
  iconType: 'genre' | 'author' | 'language';
  items: BrowseItem[];
  basePath: string;
  showMore?: {
    href: string;
    label: string;
  };
}

// Map icon types to actual icons
const iconMap = {
  genre: FolderOpen,
  author: Users,
  language: Globe,
};

export default function BrowseSection({
  title,
  iconType,
  items,
  basePath,
  showMore
}: BrowseSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = iconMap[iconType];

  return (
    <div className="border border-archive-tan rounded-sm bg-white overflow-hidden">
      {/* Header - Clickable */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-archive-paper transition-colors"
      >
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5 text-archive-brown" />
          <span className="text-lg font-serif font-medium text-archive-dark">
            {title}
          </span>
          <span className="text-sm text-archive-accent">
            ({items.length})
          </span>
        </div>

        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-archive-accent" />
        ) : (
          <ChevronDown className="h-5 w-5 text-archive-accent" />
        )}
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="border-t border-archive-tan p-4">
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <Link
                key={item.slug}
                href={`${basePath}/${item.slug}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-archive-paper hover:bg-archive-tan text-archive-dark text-sm rounded-sm transition-colors"
              >
                {item.name}
                {item.count !== undefined && (
                  <span className="text-archive-accent text-xs">
                    ({item.count})
                  </span>
                )}
              </Link>
            ))}
          </div>

          {showMore && (
            <div className="mt-4 pt-4 border-t border-archive-tan">
              <Link
                href={showMore.href}
                className="text-archive-brown hover:text-archive-dark transition-colors text-sm"
              >
                {showMore.label} →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}