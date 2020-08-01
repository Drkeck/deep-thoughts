import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import ThoughtList from '../components/ThoughtList';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import FriendsList from '../components/FriendsList';
import Auth from '../utils/Auth';

const Profile = () => {
  const { username: userParam} = useParams()

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: {username: userParam }
  });
  console.log(userParam)
  const user = data?.me || data?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().data.username.toLowerCase() === `${userParam ? userParam.toLowerCase() : ''}`) {
    return <Redirect to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user?.username) {
    return <h4>You need to be logged in to view this page! use the navigation above to log in or sign up!</h4>
  }

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {userParam ?  `${user.usernames}'s` : 'your'} profile.
        </h2>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <ThoughtList thoughts={user.thoughts} title={`${user.username}'s Thoughts..`} />
        </div>

        <div className="col-12 col-lg-3 mb-3">{
          <FriendsList 
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
           />
        }</div>
      </div>
    </div>
  );
};

export default Profile;
