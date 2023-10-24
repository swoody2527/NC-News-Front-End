import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, isRouteErrorResponse } from "react-router-dom";
import "../styles/SelectedArticle.css";
import CommentSection from "./CommentSection";
import ErrorComponent from "./ErrorComponent";

function SelectedArticle() {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null)
  const { article_id } = useParams();

  useEffect(() => {
    axios
      .get(`https://be-nc-news-sopv.onrender.com/api/articles/${article_id}`)
      .then((response) => {
        setIsLoading(false);
        setArticle(response.data.article);
      })
      .catch((err) => {
        setIsLoading(false)
        setError(err)
      });
  }, []);


  if (isLoading) {
    return <p>Loading Article...</p>;
  }

  if (error) {
    return (<ErrorComponent error={error}/>)
  }
  return (
    <section className="selected-article">
      <h2>{article.title}</h2>
      <p>Written by {article.author}</p>
      <p>Related to {article.topic}</p>
      <img src={article.article_img_url}></img>
      <p className="article-body">{article.body}</p>
      <p>{article.votes} votes</p>
      <Link to="/articles">
        <button>Back To Articles</button>
      </Link>
      <CommentSection
        article_id={article_id}
        comment_count={article.comment_count}
      />
    </section>
  );
}

export default SelectedArticle;
