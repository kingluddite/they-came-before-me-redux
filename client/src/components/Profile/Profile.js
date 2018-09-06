import React from 'react';

// components
import UserInfo from './UserInfo';
import UserGenealogies from './UserGenealogies';
import withAuth from '../withAuth';

const Profile = ({ session }) => {
  return (
    <div className="App">
      <UserInfo session={session} />
      <UserGenealogies username={session.getCurrentUser.username} />
    </div>
  );
};

export default withAuth(session => session && session.getCurrentUser)(Profile);
