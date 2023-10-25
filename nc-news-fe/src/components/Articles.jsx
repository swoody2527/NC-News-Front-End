import React, { useEffect, useState } from "react";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import TopicFilter from "./TopicFilter";
import '../styles/Articles.css'
import { useSearchParams } from "react-router-dom";

function Articles() {
  const [articleList, setArticleList] = useState([]);
  const [searchParamas, setSearchParams] = useSearchParams()

  const topicQuery = searchParamas.get("topic")

  useEffect(() => {
    axios
      .get("https://be-nc-news-sopv.onrender.com/api/articles", {
        params: {
          topic: topicQuery
        }
      })
      .then((response) => setArticleList(response.data.articles))
      .catch((error) => console.log(error));
  }, [topicQuery]);

  return (
    <section>
      <div className="topic-filter-form">
      <TopicFilter />
      </div>
      <div className="articles-container">
        {articleList.map((article) => {
            return (
                <ArticleCard key={article.article_id} article={article}></ArticleCard>
            )
        })}
        </div>
    </section>
  );
}

export default Articles;
