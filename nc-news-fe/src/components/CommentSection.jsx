import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../styles/CommentSection.css";
import { UserContext } from "../contexts/UserContext";
function CommentSection({ article_id, comment_count }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newCommentCount, setNewCommentCount] = useState(0);
  const [isCommentPosted, setIsCommentPosted] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [isCommentDeleted, setIsCommentDeleted] = useState(false)
  const [isCommentDeleting, setIsCommentDeleting] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(
        `https://be-nc-news-sopv.onrender.com/api/articles/${article_id}/comments`
      )
      .then((response) => setComments(response.data.articleComments))
      .catch((error) => console.log(error));
  }, [newCommentCount]);

  const handleNewComment = (e) => {
    e.preventDefault();
    setIsPosting(true);
    setIsCommentDeleted(false)
    axios
      .post(
        `https://be-nc-news-sopv.onrender.com/api/articles/${article_id}/comments`,
        {
          username: user.username,
          body: newComment,
        }
      )
      .then((response) => {
        setError(null);
        setNewComment("");
        setIsCommentPosted(true);
        setIsPosting(false);
        setNewCommentCount(newCommentCount + 1);
        setComments([...comments, response.data.postedComment]);
      })
      .catch((err) => {
        setError("Error posting comment, please try again");
        setIsPosting(false);
      });
  };

  const handleDeleteComment = (comment_id) => {
    setIsCommentPosted(false)
    setIsCommentDeleting(true);
    axios
      .delete(`https://be-nc-news-sopv.onrender.com/api/comments/${comment_id}`)
      .then((response) => {
        setError(null);
        setIsCommentDeleting(false);
        setIsCommentDeleted(true)
        setNewCommentCount(newCommentCount - 1);
      })
      .catch((error) => {
        setIsCommentDeleting(false);
        setError("Error deleting comment, please try again");
      });
  };

  return (
    <section className="comments-section">
      <h3>{comment_count} Comments</h3>
      {isCommentPosted ? (
        <h4 className="post-success-msg">Comment Posted!</h4>
      ) : isCommentDeleted ? (
        <h4 className="delete-success-msg">Comment Deleted!</h4>
      ) : null}
      {error ? <h4 className="post-error-msg">{error}</h4> : null}
      <form onSubmit={handleNewComment}>
        <label htmlFor="comment-body">Comment:</label>
        <textarea
          id="comment-body"
          name="comment-body"
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => {
            setIsCommentPosted(false);
            setNewComment(e.target.value);
          }}></textarea>
        <button type="submit" disabled={!newComment.trim() || isPosting}>
          {isPosting ? "Posting..." : "Post"}
        </button>
      </form>
      {comments.map((comment) => {
        comment.created_at = new Date(comment.created_at);
        const formattedDate = comment.created_at.toLocaleDateString();
        return (
          <section key={comment.comment_id} className="comment">
            <p>
              @{comment.author} {formattedDate}
            </p>
            <p>{comment.body}</p>
            {comment.author === user.username ? (
              <button
                disabled={isCommentDeleting}
                onClick={() => handleDeleteComment(comment.comment_id)}
                className="delete-comment-btn">
                {isCommentDeleting ? "Deleting..." : "X"}
              </button>
            ) : null}
          </section>
        );
      })}
    </section>
  );
}

export default CommentSection;
