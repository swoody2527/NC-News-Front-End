import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/TopicFilter.css"

function TopicFilter() {
  const [topics, setTopics] = useState([]);
  const [topicQuery, setTopicQuery] = useState("");

  useEffect(() => {
    axios
      .get("https://be-nc-news-sopv.onrender.com/api/topics")
      .then((response) => {
        setTopics(response.data.topics);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="topic-filter-form">
    <form onSubmit={handleSubmit}>
      <select
        name="topic"
        id="topic"
        onChange={(e) => setTopicQuery(e.target.value)}>
        <option value={""}>All</option>
        {topics.map((topic) => {
          return (
            <option value={topic.slug} key={topic.slug}>
              {topic.slug}
            </option>
          );
        })}
      </select>
      <Link
        to={{
          pathname: "/articles",
          search: topicQuery ? `?topic=${topicQuery}` : "",
        }}>
        <button type="submit">Search</button>
      </Link>
    </form>
    </div>
  );
}

export default TopicFilter;
