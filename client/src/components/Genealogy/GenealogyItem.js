import React from 'react';
import { Link } from 'react-router-dom';

const GenealogyItem = ({ _id, firstName, lastName }) => {
  return (
    <li>
      <h4>
        <Link to={`/genealogy/${_id}`}>
          {firstName} {lastName}
        </Link>
      </h4>
    </li>
  );
};

export default GenealogyItem;
