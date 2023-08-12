import { useState, useEffect } from 'react';
import { getUsers, getUserMatches } from '../utils/utils';
function Matches(props: { user: User }) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // If there is no token, return
    if (!props.user.token) {
      return;
    }

    // Get the users that the current user has liked
    const getMatches = async () => {
      const userMatches = await getUserMatches(props.user.id);
      return userMatches;
    };

    // Display the users that the current user has matched with
    const displayUsers = async () => {
      const matches = await getMatches();

      const allUsers: User[] = await getUsers();

      const filteredUsers = allUsers.filter((user: User) => {
        return matches.some((match: Match) => {
          return match.matchedId === user.id;
        });
      });

      setUsers(filteredUsers);
    };

    displayUsers();
  }, [props.user.token, props.user.id]);

  return (
    <div>
      {props.user.token && (
        <>
          <h1 className="text-2xl text-center font-bold mb-3">Your Matches</h1>
          <div className="flex justify-center flex-wrap">
            {users.map((user: User) => {
              return (
                <div
                  key={user.id}
                  className="flex flex-col items-center justify-center w-1/4 p-4"
                >
                  <img
                    src={`data:image/png;base64, ${user.picture}`}
                    alt={`${user.name}'s profile`}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                  <p className="text-center">{user.name}</p>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      window.location.href = `/profile/${user.id}`;
                    }}
                  >
                    View Profile
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}

      {!props.user.token && (
        <>
          <h1 className="text-center">Please log in to see your matches!</h1>
        </>
      )}
    </div>
  );
}

export default Matches;
