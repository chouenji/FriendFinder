import {
  getUsers,
  getUserById,
  getUserMatches,
  getUserChats,
  getUserLikes,
} from '../utils/utils';

// Mock the entire mock/mock.ts module
jest.mock('../utils/mock/mock.ts');

describe('getUsers', () => {
  it('should return an array of users', async () => {
    const users = await getUsers();

    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          description: expect.any(String),
          picture: expect.any(String),
        }),
      ])
    );
  });
});

describe('getUserById', () => {
  it('should return a user', async () => {
    const user = await getUserById(1);

    expect(user).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String),
        picture: expect.any(String),
      })
    );

    const user2 = await getUserById(-1);

    expect(user2).toEqual({ error: 'User not found' });
  });
});

describe('getUserMatches', () => {
  it('should return an array of users', async () => {
    const users = await getUserMatches(1);

    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          userId: expect.any(Number),
          matchedId: expect.any(Number),
        }),
      ])
    );

    const users2 = await getUserMatches(-1);

    expect(users2).toEqual({ error: 'User not found' });
  });
});

describe('getUserLikes', () => {
  it('should return an array of users', async () => {
    const users = await getUserLikes(1);

    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          userId: expect.any(Number),
          likedId: expect.any(Number),
        }),
      ])
    );

    const users2 = await getUserLikes(-1);

    expect(users2).toEqual({ error: 'User not found' });
  });
});

describe('getUserChats', () => {
  it('should return an error when an invalid token is provided', async () => {
    // Create a mock response
    const mockErrorResponse = {
      json: async () => ({ error: 'Invalid token' }),
    };

    // Mock the fetch function
    const fetchMock = jest.spyOn(global, 'fetch');
    fetchMock.mockResolvedValueOnce(mockErrorResponse as Response);

    const userId = '11';
    const token = 'invalid_token'; // Invalid token intentionally

    const result = await getUserChats(userId, token);

    expect(result).toEqual({ error: 'Invalid token' });

    // Verify that fetch was called with the correct URL and headers
    expect(fetchMock).toHaveBeenCalledWith(
      `http://localhost:8080/api/chats/${userId}`,
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      })
    );

    // Restore the original fetch function
    fetchMock.mockRestore();
  });
});
