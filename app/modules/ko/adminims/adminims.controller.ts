import { AdminimsModel } from './adminims.model';
import { config } from '../../../config/config';
import { configEnv } from '../../../config/config.env';
import { Request, Response } from 'express';
import { ResponseCodes } from '../../../utils/responses';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const adminimsController = {
  login: async (req: Request, res: Response) => {
    if (!req.body) return res.status(400).json({ message: ResponseCodes.CANNOT_EMPTY });

    const adminimsModel = new AdminimsModel();

    adminimsModel.findUser(
      { e_courriel: req.body.email, sisma: req.body.password },
      async (err: any, data: any) => {
        if (err)
          return res
            .status(401)
            .json({ message: ResponseCodes.INCORRECT_EMAIL_OR_PASSWORD });

        let sismaDB = req.body.password;
        let sismaInput = data?.sisma;
        const isSame = await bcrypt.compare(sismaDB, sismaInput);

        if (!isSame)
          return res
            .status(400)
            .json({ message: ResponseCodes.INCORRECT_EMAIL_OR_PASSWORD });

        let token = jwt.sign(
          {
            userId: data.idadminims,
            role: data.role,
            email: data.e_courriel,
          },
          configEnv.TOKEN_SECRET_KEY,
          { expiresIn: config.expireToken },
        );

        return res.status(200).json({ token: token });
      },
    );
  },

  signup: async (req: Request, res: Response) => {
    if (!req.body) return res.status(400).json({ message: ResponseCodes.CANNOT_EMPTY });

    const hashPassword = await bcrypt.hash(req.body.password, 15);

    const adminimsModel = new AdminimsModel();

    adminimsModel.create(
      { e_courriel: req.body.email, sisma: hashPassword },
      (err: any) => {
        if (!err) res.status(201).send({ message: 'ok' });

        return res.status(500).send({ message: err.message || ResponseCodes.CREATING });
      },
    );
  },
};
