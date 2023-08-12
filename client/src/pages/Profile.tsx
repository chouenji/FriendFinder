import { useState, useEffect } from 'react';
import { getUserById } from '../utils/utils';
import { useRoute } from 'wouter';

function Profile(props: { user: User }) {
  const [userProfile, setUserProfile] = useState<User>();
  const [, params] = useRoute('/profile/:id');
  const userId = params ? +params.id : 0;

  useEffect(() => {
    // If there is no token, return
    if (!props.user.token) {
      return;
    }

    const fetchUser = async () => {
      const user: User = await getUserById(userId);
      setUserProfile(user);
    };

    fetchUser();
  }, [props.user.token, userId, userProfile]);

  const redirectChat = () => {
    window.location.href = `/chats/${userId}`;
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl text-center font-bold mb-3">Profile</h1>
      <div className="flex flex-col items-center justify-center w-1/4 p-4">
        <img
          className="w-64 h-64 rounded-full"
          src={`data:image/png;base64, ${userProfile?.picture}`}
          alt={userProfile?.name}
        />
        <p className="text-center">{userProfile?.name}</p>
        <p className="text-center">{userProfile?.description}</p>
        <br />
        <button
          onClick={redirectChat}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Chat
        </button>
      </div>
    </div>
  );
}

export default Profile;
