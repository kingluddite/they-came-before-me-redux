import React from 'react';
import { Mutation } from 'react-apollo';

import { UPDATE_USER_GENEALOGY } from '../../queries';

const EditGenealogyModal = ({ handleSubmit, genealogy, handleChange, closeModal }) => (
  <Mutation mutation={UPDATE_USER_GENEALOGY} variables={{ _id: genealogy._id, firstName: genealogy.firstName, lastName: genealogy.lastName, imageUrl: genealogy.imageUrl, category: genealogy.category, description: genealogy.description }}>
    {updateUserGenealogy => (
      <div className="modal modal-open">
        <div className="modal-inner">
          <div className="modal-content">
            <form className="modal-content-inner" onSubmit={(event) => handleSubmit(event, updateUserGenealogy)}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                onChange={handleChange}
                value={genealogy.firstName}
              />
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                value={genealogy.lastName}
              />
              <label htmlFor="imageUrl">Genealogy Image URL</label>
              <input
                type="text"
                name="imageUrl"
                onChange={handleChange}
                value={genealogy.imageUrl}
              />
              <label htmlFor="category">Category of Genealogy</label>
              <select
                name="category"
                onChange={handleChange}
                value={genealogy.category}
              >
                <option value="Family">Family</option>
                <option value="Church">Church</option>
                <option value="Ethnic">Ethnic</option>
                <option value="Historic">Historic</option>
                <option value="Miscellany">Miscellany</option>
              </select>
              <label htmlFor="description">Add Description</label>
              <textarea
                name="description"
                onChange={handleChange}
                value={genealogy.description}
              />
              <hr />
              <div className="modal-buttons">
                <button type="submit" className="button-primary">
                  Update
                </button>
                <button onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}
  </Mutation>
);

export default EditGenealogyModal;
