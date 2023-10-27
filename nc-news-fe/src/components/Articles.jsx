import React, { useEffect, useState } from "react";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import TopicFilter from "./TopicFilter";
import SortingFilter from "./SortingFilter";
import '../styles/Articles.css'


import { useSearchParams } from "react-router-dom";

function Articles() {
  const [articleList, setArticleList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams()

  const topicQuery = searchParams.get("topic")
  const sortByQuery = searchParams.get("sortby")
  const orderQuery = searchParams.get("order")

  useEffect(() => {
    axios
      .get("https://be-nc-news-sopv.onrender.com/api/articles", {
        params: {
          topic: topicQuery,
          sortby: sortByQuery,
          order: orderQuery
        }
      })
      .then((response) => setArticleList(response.data.articles))
      .catch((error) => console.log(error));
  }, [topicQuery, sortByQuery, orderQuery]);

  return (
    <section>
      <TopicFilter />
      <SortingFilter topic={topicQuery}/>
      {!topicQuery ? <h3>Viewing all articles</h3> : <h3>Viewing {topicQuery} articles</h3>}
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
