import React, { useState, useEffect } from 'react';
import { getUserById, getUserMatches } from '../utils/utils';
import { useLocation } from 'wouter';

export default function Chats(props: { user: User }) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [matchedUser, setMatchedUser] = useState<any>({});

  useEffect(() => {
    const getChatsAndUserInfo = async () => {
      try {
        const chats: Chat[] = await getUserMatches(props.user.id);
        console.log(chats);

        const uniqueMatchedUserIds = Array.from(
          new Set(chats.map((chat) => chat.matchedId))
        );

        const matchedUsersPromises = uniqueMatchedUserIds.map(
          async (matchedId: number) => {
            const matchedUser = await getUserById(matchedId);
            return {
              id: matchedUser.id,
              name: matchedUser.name,
              picture: matchedUser.picture,
            };
          }
        );

        const matchedUsersPictures = await Promise.all(matchedUsersPromises);
        setMatchedUser(matchedUsersPictures);
      } catch (err) {
        console.log(err);
      }
    };

    getChatsAndUserInfo();
  }, []);

  const [, navigate] = useLocation(); // Destructuring to get navigate

  const redirectToChat = (matchedId: number) => {
    navigate(`/chats/${matchedId}`);
  };

  return (
    <div className="text-center">
      <h1>Chats</h1>
      <br />
      <div className="flex justify-around">
        {matchedUser.length > 0 &&
          matchedUser.map((user: User, index: number) => {
            return (
              <div key={index}>
                <img
                  className="w-40 h-40 rounded-full"
                  src={`data:image/png;base64,${user.picture}`}
                  alt={user.name}
                />
                <p>{user.name}</p>
                <br />
                <button
                  onClick={() => redirectToChat(user.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded"
                >
                  Chat
                </button>
              </div>
            );
          })}
        {matchedUser.length === 0 && <h1>You have no chats at the moment!</h1>}
      </div>
    </div>
  );
}
