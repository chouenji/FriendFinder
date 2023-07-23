import { Request, Response } from 'express';
import {
  users,
  user,
  postUserDescription,
  postUserLikes,
  getUserLikes,
  getUserMatches,
} from '../controllers/users';

const mockRequest = (params = {}, body = {}) =>
  ({
    params,
    body,
  } as Request);

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('users', () => {
  it('should return a list of users', async () => {
    const req = mockRequest();
    const res = mockResponse();

    await users(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });
});

describe('user', () => {
  it('should return a user', async () => {
    const req = mockRequest({ id: 1 });
    const res = mockResponse();

    await user(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
  });
});

describe('postUserDescription', () => {
  it('should return a user', async () => {
    const req = mockRequest({}, { userId: 1, likedUserId: 2 });
    const res = mockResponse();

    await postUserLikes(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
  });
});

describe('postUserLikes', () => {
  it('should return a user', async () => {
    const req = mockRequest({}, { userId: 1, userLikedId: 2 });
    const res = mockResponse();

    await postUserLikes(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
  });
});

describe('getUserLikes', () => {
  it('should return a user', async () => {
    const req = mockRequest({ id: 1 });
    const res = mockResponse();

    await getUserLikes(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
  });
});

describe('getUserMatches', () => {
  it('should return a user', async () => {
    const req: Request = mockRequest({ id: 1 });
    const res: Response = mockResponse();

    await getUserMatches(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
  });
});
