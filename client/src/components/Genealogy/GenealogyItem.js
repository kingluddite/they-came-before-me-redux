import React from 'react';
import { Link } from 'react-router-dom';

const GenealogyItem = ({ _id, firstName, lastName, imageUrl, category }) => {
  return (
    <li
      style={{
        background: `url(${imageUrl}) center center / cover no-repeat`,
      }}
      className="card"
    >
      <span className={category}>{category}</span>
      <div className="card-text">
        <Link to={`/genealogy/${_id}`}>
          <h4>
            Name: {firstName} {lastName}
          </h4>
        </Link>
      </div>
    </li>
  );
};

export default GenealogyItem;
