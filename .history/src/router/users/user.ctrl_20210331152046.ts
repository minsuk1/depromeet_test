import {RequestHandler} from 'express';
import User from '../../models/user';
import Post from '../../models/post';
import NotFoundException from '../../exceptions/NotFoundException';
import logger from '../../winston';

interface IUser extends User {
    PostCount: number;

  }

export const find: RequestHandler = async (req, res) => {
    console.log(req.params.id);
    logger.info('no user');
    const user = await User.findOne({

      where: {id: parseInt(req.params.id, 10)},
      include: [{
        model: Post,
        as: 'Posts',
        attributes: ['id'],
      }],
    });
    if (!user) {
      throw new NotFoundException('no user');
    }
    const jsonUser = user.toJSON() as IUser;
    jsonUser.PostCount = jsonUser.Posts ? jsonUser.Posts.length : 0;
    return res.json(jsonUser);
};


export const insert: RequestHandler = async (req, res) => {
  await User.create(req.body);

  res.json({'message': '추가성공'});
};