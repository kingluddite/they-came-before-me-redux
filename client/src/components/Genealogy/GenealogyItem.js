import React from 'react';
import { Link } from 'react-router-dom';
import pose from 'react-pose';

const GenealogyItem = pose.li({
  shown: { opacity: 1 },
  hidden: { opacity: 0 },
});

export default ({ _id, firstName, lastName, imageUrl, category }) => {
  return (
    <GenealogyItem
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
    </GenealogyItem>
  );
};
