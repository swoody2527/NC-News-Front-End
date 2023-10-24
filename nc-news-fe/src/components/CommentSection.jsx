import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/CommentSection.css";
function CommentSection({ article_id, comment_count }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newCommentCount, setNewCommentCount] = useState(0)

  useEffect(() => {
    axios
      .get(
        `https://be-nc-news-sopv.onrender.com/api/articles/${article_id}/comments`
      )
      .then((response) => setComments(response.data.articleComments))
      .catch((error) => console.log(error));
  }, [newCommentCount]);

  const handleNewComment = (e) => {
    e.preventDefault()
    axios.post(`https://be-nc-news-sopv.onrender.com/api/articles/${article_id}/comments`, {
      username: "grumpy19",
      body: newComment,
    })
    .then((response) => {
      setNewCommentCount(newCommentCount + 1)
      setComments([...comments, response.data.postedComment])
      setNewComment("")
    })
  };

  return (
    <section className="comments-section">
      <h3>{comment_count} Comments</h3>
      <form onSubmit={handleNewComment}>
        <label htmlFor="comment-body">Comment:</label>
        <textarea
          id="comment-body"
          name="comment-body"
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => {setNewComment(e.target.value)}}></textarea>
        <button type="submit">Post</button>
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
          </section>
        );
      })}
    </section>
  );
}

export default CommentSection;
