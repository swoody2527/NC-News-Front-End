import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import '../styles/SelectedArticle.css'
import CommentSection from "./CommentSection";

function SelectedArticle() {
  const [article, setArticle] = useState([]);
  const { article_id } = useParams();

  useEffect(() => {
    axios
      .get(`https://be-nc-news-sopv.onrender.com/api/articles/${article_id}`)
      .then((response) => setArticle(response.data.article));
  }, []);
  return (
    <section className="selected-article">
        <h2>{article.title}</h2>
        <p>Written by {article.author}</p>
        <p>Related to {article.topic}</p>
        <img src={article.article_img_url}></img>
        <p>{article.body}</p>
        <p>{article.votes} votes</p>
        <Link to="/articles"><button>Back To Articles</button></Link>
        <CommentSection article_id={article_id} comment_count={article.comment_count}/>
    </section>
  );
}

export default SelectedArticle;
