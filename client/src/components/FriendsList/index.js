import React from 'react';
import { Link } from 'react-router-dom';

const FriendsList = ({ friendCount, username, friends }) => {
    if (!friends || !friends.length ) {
        return <p className="bg-dark text-light p-3">{username}, its time to make friends!</p>
    }

    return(
        <div>
            <h5>
                {username}'s {friendCount} {friendCount === 1 ? 'friend' : 'friends'}
            </h5>
            {friends.map(friend => (
                <button className="btn w-100 display-block mb-2" key={friend.id}>
                    <Link to={`/profile/${friend.username}`}>{friend.username}</Link>
                </button>
            ))}
        </div>
    )
}

export default FriendsList;