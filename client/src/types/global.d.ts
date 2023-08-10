export {};

declare global {
  type User = {
    id: number;
    name?: string;
    email?: string;
    password?: string;
    picture?: string;
    description?: string;
    likes?: string;
    createdAt?: Date;
    updatedAt?: Date;
  };

  type Like = {
    id: number;
    userId: number;
    likedId: number;
    createdAt?: Date;
    updatedAt?: Date;
  };

  type Match = {
    id: number;
    userId: number;
    matchedId: number;
    createdAt?: Date;
    updatedAt?: Date;
  };

  type Message = {
    id: number;
    message: string;
    senderId: number;
    createdAt: Date;
  };

  type Chat = {
    id: number;
    userId: number;
    matchedId: number;
    message: Message[];
    createdAt?: Date;
    updatedAt?: Date;
  };
}
