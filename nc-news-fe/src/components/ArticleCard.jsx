import React from 'react'
import '../styles/ArticleCard.css'
function ArticleCard({ article }) {
    article.created_at = new Date(article.created_at)
    const formattedDate = article.created_at.toLocaleDateString()
  return (
    
    <section className='article-card'>
        <h4>{article.title}</h4>
        <p>Written by {article.author} on {formattedDate}</p>
        <p>Related to {article.topic}</p>
        <p>{article.comment_count} comments</p>
        <button>View Article</button>
    </section>
  )
}

export default ArticleCard