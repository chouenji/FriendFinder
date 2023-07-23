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
