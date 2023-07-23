import { getUsers, getUserById, getUserMatches } from '../utils/utils';

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
    const user = await getUserById(11);

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
    const users = await getUserMatches(11);

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
