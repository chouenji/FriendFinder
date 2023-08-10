import React, { useEffect, useState } from 'react';
import { useRoute } from 'wouter';
import { postUserChats, getUserChats } from '../utils/utils';
import io from 'socket.io-client';

export default function Chat(props: { user: User; token: string }) {
  const [message, setMessage] = useState('');
  const [match, params] = useRoute('/chats/:id');
  const [messages, setMessages] = useState<Chat[]>([]);

  function formatTimestamp(timestamp: Date) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  const sendMessage = async () => {
    try {
      if (!message) return; // If there is no message, don't send anything

      await postUserChats(props.user.id, props.token, params!.id, message);

      // Emit the message to the server with recipient's user ID (matchedId)
      const socket = io('http://localhost:3000');
      socket.emit('message', {
        userId: props.user.id,
        matchedId: parseInt(params!.id),
        message: [
          {
            id: messages.length + 1,
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

  const getChat = async () => {
    try {
      const response = await getUserChats(params!.id, props.token);
      const data = await response;
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChat();

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
        matchedId: parseInt(message.matchedId),
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
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col ${
              message.userId === props.user.id ? 'items-end' : 'items-start'
            }`}
          >
            <div className="flex flex-col">
              <div className="flex flex-row">
                <img
                  className="w-10 h-10 rounded-full mr-2"
                  src="https://picsum.photos/200/300"
                  alt="Profile"
                />
                <div
                  className={`p-2 rounded-lg ${
                    message.userId === props.user.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-black'
                  }`}
                >
                  {message.message[0].message}
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
