import { useState, useEffect } from 'react';
import { getUsers, getUserLikes } from '../utils/utils';

function Home(props: { user: User; token: string }) {
  const [users, setUsers] = useState<User[]>([]);
  const [friendChoices, setFriendChoices] = useState<User[]>([]);

  useEffect(() => {
    // If there is no token, return
    if (!props.token) {
      return;
    }

    const fetchUsers = async () => {
      const allUsers: User[] = await getUsers();
      setUsers(allUsers);
    };

    fetchUsers();
  }, [props.token]);

  useEffect(() => {
    // If there is no token, return
    if (!props.token) {
      return;
    }

    // Get the users that the current user has liked
    const fetchLikes = async () => {
      const userLikes = await getUserLikes(props.user.id);
      return userLikes;
    };

    const displayUsers = async () => {
      // Get the users that the current user has liked
      const userLikes = await fetchLikes();

      // Filter out the users that the current user has liked
      const filteredLikedUsers = users.filter((user: User) => {
        if (user.id === props.user.id) {
          return user.id !== props.user.id;
        }

        return !userLikes.some((userLike: Like) => {
          return userLike.likedId === user.id;
        });
      });

      setFriendChoices(filteredLikedUsers);
    };

    displayUsers();
  }, [props.token, props.user.id, users]);

  const likeUser = async (likedUserId: number) => {
    try {
      await fetch(`http://localhost:8080/api/users/${props.user.id}/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: props.user.id,
          likedUserId: likedUserId,
        }),
      });

      setFriendChoices(friendChoices.filter((user) => user.id !== likedUserId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full">
      {props.token && (
        <>
          <h1 className="text-center">These are your possible matches!</h1>
          <br />
          <div className="flex flex-col sm:flex-row sm:justify-around">
            {friendChoices.length > 0 &&
              friendChoices.map((friendChoice: User) => {
                return (
                  <div className="mx-auto text-center" key={friendChoice.id}>
                    <img
                      className="w-64 h-64 rounded-full"
                      src={`data:image/png;base64, ${friendChoice.picture}`}
                      alt={friendChoice.name}
                    />
                    <br />
                    <h3>{friendChoice.name}</h3>
                    <br />
                    <h3>{friendChoice.description}</h3>
                    <br />
                    <button
                      id={friendChoice.id?.toString()}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded"
                      onClick={() => likeUser(friendChoice.id as number)}
                    >
                      Like
                    </button>
                  </div>
                );
              })}
          </div>
        </>
      )}

      {!props.token && (
        <div className="flex justify-center">
          <h1>Welcome to Friend Finder!</h1>
        </div>
      )}
    </div>
  );
}

export default Home;
