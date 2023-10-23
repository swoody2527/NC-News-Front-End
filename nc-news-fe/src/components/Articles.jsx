import React, { useEffect, useState } from "react";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import '../styles/Articles.css'

function Articles() {
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    axios
      .get("https://be-nc-news-sopv.onrender.com/api/articles")
      .then((response) => setArticleList(response.data.articles))
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className="article-container">
        {articleList.map((article) => {
            return (
                <ArticleCard key={article.article_id} article={article}></ArticleCard>
            )
        })}
    </section>
  );
}

export default Articles;
