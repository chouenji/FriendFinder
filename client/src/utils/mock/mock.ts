export async function getUsers() {
  return [
    {
      id: 1,
      name: 'User 1',
      description: 'Description 1',
      picture: 'picture-url',
    },
    {
      id: 2,
      name: 'User 2',
      description: 'Description 2',
      picture: 'picture-url',
    },
  ];
}

export async function getUserById(id: number) {
  return {
    id: 1,
    name: 'User 1',
    description: 'Description 1',
    picture: 'picture-url',
  };
}

export async function getUserLikes(id: number) {
  return [{ userId: 1, likedId: 2 }];
}

export async function getUserMatches(id: number) {
  return [{ userId: 1, matchedId: 2 }];
}

export async function getUserChats(id: number, token: string) {
  return [{ userId: 1, matchedId: 2 }];
}
