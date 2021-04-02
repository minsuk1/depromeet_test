import * as express from 'express';
import {RequestHandler} from 'express';
import User from '../../models/user';
import Post from '../../models/post';


interface IUser extends User {
    PostCount: number;

  }

// export const find: RequestHandler = async (req, res, next) => {
//   try {
//     console.log(req.params.id);
//     const user = await User.findOne({

//       where: {id: parseInt(req.params.id, 10)},
//       include: [{
//         model: Post,
//         as: 'Posts',
//         attributes: ['id'],
//       }],
//     });
//     if (!user) return res.status(404).send('no user');
//     const jsonUser = user.toJSON() as IUser;
//     jsonUser.PostCount = jsonUser.Posts ? jsonUser.Posts.length : 0;
//     return res.json(jsonUser);
//   } catch (err) {
//     next(err);
//   }
// };



export const find: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const user = await User.findOne({

      where: {id: parseInt(req.params.id, 10)},
      include: [{
        model: Post,
        as: 'Posts',
        attributes: ['id'],
      }],
    });
    if (!user) return res.status(404).send('no user');
    const jsonUser = user.toJSON() as IUser;
    jsonUser.PostCount = jsonUser.Posts ? jsonUser.Posts.length : 0;
    return res.json(jsonUser);
  } catch (err) {
    next(err);
  }
};