import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/SortingFilter.css'

function SortingFilter({ topic }) {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("DESC");

  const handleSortByChange = (e) => {
    const selectedSortBy = e.target.value
    setSortBy(selectedSortBy);
    switchUrl(selectedSortBy, sortOrder)
  };

  const handleOrderChange = (e) => {
    const selectedSortOrder = e.target.value
    setSortOrder(selectedSortOrder)
    switchUrl(sortBy, selectedSortOrder)
  }

  const switchUrl = (sortBy, sortOrder) => {
    let queryString = `?sortby=${sortBy}&order=${sortOrder}`

    if (topic) {
        queryString += `&topic=${topic}`
    }
    navigate({
        pathname: "/articles",
        search: queryString
    })
  }

  return (
    <form className="sorting-form">
      <select
        name="sort-category"
        id="sort-category"
        onChange={handleSortByChange}
        defaultValue={"created_at"}>
        <option value="created_at">Date </option>
        <option value="comment_count">Comment Count </option>
        <option value="votes">Votes </option>
      </select>
      <select
      name="sort-order"
      id="sort-order"
      onChange={handleOrderChange}>
        <option value="DESC">High To Low</option>
        <option value="ASC">Low To High</option>
      </select>
    </form>
  );
}

export default SortingFilter;
