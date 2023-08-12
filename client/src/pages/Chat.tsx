import React, { useEffect, useState } from 'react';
import { useRoute } from 'wouter';
import { postUserChats, getUserChats } from '../utils/utils';
import io from 'socket.io-client';
import { getUserById } from '../utils/utils';

export default function Chat(props: { user: User }) {
  const [message, setMessage] = useState('');
  const [, params] = useRoute('/chats/:id');
  const [messages, setMessages] = useState<Chat[]>([]);
  const [userProfile, setUserProfile] = useState<User>();
  const [matchedUserProfile, setMatchedUserProfile] = useState<User>();

  function formatTimestamp(timestamp: Date) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  const sendMessage = async () => {
    try {
      if (!message) return; // If there is no message, don't send anything

      await postUserChats(
        props.user.id,
        props.user.token,
        parseInt(params!.id),
        message
      );

      // Emit the message to the server with recipient's user ID (matchedId)
      const socket = io('http://localhost:3000');
      socket.emit('message', {
        userId: props.user.id,
        matchedId: parseInt(params!.id),
        message: [
          {
            senderId: props.user.id,
            message: message,
          },
        ],
        createdAt: new Date(),
      });

      setMessage(''); // Clear the input field
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getChat = async () => {
      try {
        const response = await getUserChats(params!.id, props.user.token);
        const data = await response;

        // If there are no messages, don't set the state
        if (data.length === 0) {
          return;
        }

        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUser = async () => {
      const user: User = await getUserById(props.user.id);
      const matchedUser: User = await getUserById(parseInt(params!.id));
      setUserProfile(user);
      setMatchedUserProfile(matchedUser);
    };

    getChat();
    fetchUser();

    const socket = io('http://localhost:3000');

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('message', (message) => {
      const structuredMessage: Chat = {
        id: message.id,
        userId: message.userId,
        matchedId: message.matchedId,
        message: message.message.map((msg: Chat) => ({
          id: msg.id,
          senderId: msg.userId,
          message: msg.message,
          createdAt: msg.createdAt,
        })),
        createdAt: message.createdAt,
        updatedAt: message.updatedAt,
      };

      setMessages((prevMessages) => [...prevMessages, structuredMessage]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col flex-grow overflow-y-scroll">
        {messages.length > 0 &&
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex flex-col ${
                message.userId === props.user.id ? 'items-end' : 'items-start'
              }`}
            >
              <div className="flex flex-col">
                <div className="flex flex-row">
                  {message.userId !== props.user.id && (
                    <img
                      className="w-8 h-8 rounded-full"
                      src={`data:image/png;base64, ${matchedUserProfile?.picture}`}
                      alt={matchedUserProfile?.picture}
                    />
                  )}

                  <div
                    className={`${
                      message.userId === props.user.id
                        ? 'flex justify-end w-full'
                        : ''
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        message.userId === props.user.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-black'
                      }`}
                    >
                      {message?.message[0]?.message}
                    </div>
                    {message.userId === props.user.id && (
                      <img
                        className="w-8 h-8 rounded-full"
                        src={`data:image/png;base64, ${userProfile?.picture}`}
                        alt={userProfile?.picture}
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="text-xs text-gray-500">
                    {formatTimestamp(message.createdAt as Date)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        <div className="flex items-center justify-center p-4">
          <input
            className="border border-gray-400 w-full p-2"
            type="text"
            placeholder="Message"
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
