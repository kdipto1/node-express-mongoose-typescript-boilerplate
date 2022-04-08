import httpStatus from 'http-status';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import pick from '../utils/pick';
import * as userService from './user.service';

export const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});
export const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});
export const getUser = catchAsync(async (req, res) => {
  if (typeof req.params.userId === 'string') {
    const user = await userService.getUserById(new mongoose.Types.ObjectId(req.params.userId));
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.send(user);
  }
});
export const updateUser = catchAsync(async (req, res) => {
  if (typeof req.params.userId === 'string') {
    const user = await userService.updateUserById(new mongoose.Types.ObjectId(req.params.userId), req.body);
    res.send(user);
  }
});
export const deleteUser = catchAsync(async (req, res) => {
  if (typeof req.params.userId === 'string') {
    await userService.deleteUserById(new mongoose.Types.ObjectId(req.params.userId));
    res.status(httpStatus.NO_CONTENT).send();
  }
});
// # sourceMappingURL=user.controller.js.map