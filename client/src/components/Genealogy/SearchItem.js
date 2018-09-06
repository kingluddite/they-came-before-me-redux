import React from 'react';
import { Link } from 'react-router-dom';

const SearchItem = ({ _id, firstName, lastName, likes }) => {
  return (
    <li>
      <Link to={`/genealogy/${_id}`}>
        <h4>
          {firstName} {lastName}
        </h4>
      </Link>
      <p>Likes: {likes}</p>
    </li>
  );
};

export default SearchItem;
