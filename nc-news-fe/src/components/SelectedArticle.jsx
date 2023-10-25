import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, isRouteErrorResponse } from "react-router-dom";
import "../styles/SelectedArticle.css";
import CommentSection from "./CommentSection";
import ErrorComponent from "./ErrorComponent";

function SelectedArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [votes, setVotes] = useState(0);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownVoted, setHasDownvoted] = useState(false);
  const [patchError, setPatchError] = useState(null);
  const [isVotePatching, setIsVotePatching] = useState(false);

  useEffect(() => {
    axios
      .get(`https://be-nc-news-sopv.onrender.com/api/articles/${article_id}`)
      .then((response) => {
        setIsLoading(false);
        setArticle(response.data.article);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, [article_id]);

  useEffect(() => {
    setVotes(article.votes);
  }, [article]);

  const handleUpvote = () => {
    const votesPatchObject = {inc_votes: 1}
    setIsVotePatching(true);
    setVotes(votes + 1);
    if (hasDownVoted) {
      setVotes(votes + 2)
      votesPatchObject.inc_votes = 2

    } 
    axios
      .patch(
        `https://be-nc-news-sopv.onrender.com/api/articles/${article_id}`, votesPatchObject
      )
      .then(() => {
        setPatchError(null);
        setHasUpvoted(true);
        setHasDownvoted(false);
        setIsVotePatching(false);
      })
      .catch((err) => {
        console.log(err);
        setVotes(article.votes)
        setHasUpvoted(false);
        setIsVotePatching(false);
        setPatchError("Error processing vote, please refresh and try again");
      });
  };

  const handleDownvote = () => {
    const votesPatchObject = {inc_votes: -1}
    setIsVotePatching(true);
    setVotes(votes - 1);
    if (hasUpvoted) {
      setVotes(votes - 2)
      votesPatchObject.inc_votes = -2
    } 
    axios
      .patch(
        `https://be-nc-news-sopv.onrender.com/api/articles/${article_id}`, votesPatchObject
      )
      .then(() => {
        setPatchError(null);
        setHasDownvoted(true);
        setHasUpvoted(false);
        setIsVotePatching(false);
      })
      .catch((err) => {
        console.log(err);
        setVotes(article.votes)
        setHasDownvoted(false);
        setIsVotePatching(false);
        setPatchError("Error processing vote, please refresh and try again");
      });
  };


  if (isLoading) {
    return <p>Loading Article...</p>;
  }

  if (error) {
    return <ErrorComponent error={error} />;
  }
  return (
    <section className="selected-article">
      <h2>{article.title}</h2>
      <p>Written by {article.author}</p>
      <p>Related to {article.topic}</p>
      <img src={article.article_img_url}></img>
      <p className="article-body">{article.body}</p>
      <div className="votes-counter">
        <p>{votes} votes</p>
      </div>
      {isVotePatching ? (
        <p className="voting-msg">Voting...</p>
      ) : patchError ? (
        <p className="patch-error-msg">{patchError}</p>
      ) : (
        <div className="voting-buttons">
          <button
            className="upvote-btn"
            onClick={handleUpvote}
            disabled={hasUpvoted}>
            Upvote
          </button>
          <button
            className="downvote-btn"
            onClick={handleDownvote}
            disabled={hasDownVoted}>
            Downvote
          </button>
        </div>
      )}
      <div className="back-btn">
        <Link to="/articles">
          <button>Back To Articles</button>
        </Link>
      </div>
      <CommentSection
        article_id={article_id}
        comment_count={article.comment_count}
      />
    </section>
  );
}

export default SelectedArticle;
