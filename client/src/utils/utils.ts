// Get all users
export async function getUsers() {
  try {
    const response = await fetch('http://localhost:8080/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

// Get user by id
export async function getUserById(userId: number) {
  try {
    const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

// Get the users that the current user has liked
export async function getUserLikes(userId: number) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/users/${userId}/likes`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Get the users that the current user has matched with
export async function getUserMatches(userId: number) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/users/${userId}/matches`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getUserChats(id: string, token: string) {
  const response = await fetch(`http://localhost:8080/api/chats/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  return data;
}

export async function postUserChats(
  userId: number,
  token: string,
  matchedId: number,
  message: string
) {
  await fetch(`http://localhost:8080/api/chats/${matchedId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId: userId,
      matchedId: matchedId,
      message: message,
    }),
  });
}
