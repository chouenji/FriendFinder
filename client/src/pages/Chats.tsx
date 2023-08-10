import React, { useState, useEffect } from 'react';

export default function Chats(props: { user: User; token: string }) {
  const [chat, setChat] = useState<Chat[]>([]);

  useEffect(() => {
    const getChats = async () => {
      try {
        const chats = await fetch('http://localhost:8080/chats', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'GET',
        });

        const chatsJson = await chats.json();

        console.log(chatsJson);

        const getUserChats = chatsJson.filter((chat: Chat) => {
          return chat.userId === props.user.id;
        });

        setChat(getUserChats);
      } catch (error) {
        console.log(error);
      }
    };

    getChats();
  }, []);

  return (
    <div className="text-center">
      <h1>Chats</h1>
      <div className="flex flex-col">
        {chat.map((chat) => {
          return <div className="flex flex-col" key={chat.id}></div>;
        })}
      </div>
    </div>
  );
}
