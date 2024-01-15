import { pool } from '../../../config/db';

interface Admin {
  idadminims: string;
  e_courriel: string;
  sisma: string;
  role: any;
}

export class AdminimsModel {
  idadminims?: string;
  e_courriel?: string;
  sisma?: string;
  role?: any;

  constructor(admin?: Admin) {
    this.idadminims = admin?.idadminims;
    this.e_courriel = admin?.e_courriel;
    this.sisma = admin?.sisma;
    this.role = admin?.role;
  }

  create = (admin: any, result: any) => {
    pool.query(`INSERT INTO adminims SET ?`, [admin], (err: any, res: any) => {
      if (err) return result(err, null);
      result(null, { status: 'ok' });
    });
  };

  findUser = (objectFromController: any, result: any) => {
    pool.query(
      `SELECT * FROM adminims WHERE e_courriel= ? ;`,
      [objectFromController.e_courriel],
      (err: any, res: any) => {
        if (err) return result(err, null);

        if (res) {
          if (res.length === 0) {
            result('not found', null);
          } else {
            result(null, res[0]);
            return;
          }
        }
      },
    );
  };
}
