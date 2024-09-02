import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './Tags.css';

export default function Tags({ tags, forFoodPage }) {
  const { tagName } = useParams(); // Get the tagName from the URL parameters

  return (
    <div className={`tags-container over-slider ${tagName === 'All' ? 'highlight-all' : ''}`}>
      {tags.map(tag => (
        <Link key={tag.name} to={`/tag/${tag.name}`} className={`tag-link ${tagName === tag.name ? 'active-tag' : ''}`}>
          {tag.name}
          {!forFoodPage && ` (${tag.count})`}
        </Link>
      ))}
    </div>
  );
}
