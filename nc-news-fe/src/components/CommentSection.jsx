import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/CommentSection.css'
function CommentSection({ article_id, comment_count }) {
  const [comments, setComments] = useState([]);


  useEffect(() => {
    axios
      .get(
        `https://be-nc-news-sopv.onrender.com/api/articles/${article_id}/comments`
      )
      .then((response) => setComments(response.data.articleComments))
      .catch((error) => console.log(error));
  }, [article_id]);

  return (
    <section className="comments-section">
        <h3>{comment_count} Comments</h3>
      {comments.map((comment) => {
        comment.created_at = new Date(comment.created_at)
        const formattedDate = comment.created_at.toLocaleDateString()
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
