import { pool } from '../../config/db';

export class OldNotificationModel {
  getAllNotifications = (result: any) => {
    pool.query(
      `SELECT * FROM defaultdb.notifications ORDER BY defaultdb.notifications.date DESC  ;`,
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(null, err);
          return;
        }

        result(null, res);
      },
    );
  };

  getNotificationsByIdOrder = (idOrder: any, result: any) => {
    pool.query(
      `
  SELECT * FROM defaultdb.notifications 
  WHERE order_id = ?
  ORDER BY defaultdb.notifications.date DESC  ;`,
      [idOrder],
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(null, err);
          return;
        }

        // console.log("transactions: ", res);
        result(null, res);
      },
    );
  };

  create = (notif: any, result: any) => {
    // console.log('notif: ',notif)

    pool.query(`INSERT INTO notifications SET ?`, [notif], (err, resultat: any) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      console.log('created user: ', resultat);
      // return 'ok'
      if (resultat.affectedRows > 0) {
        result(null, { status: 'ok' });
      }
    });
  };

  createWithReturn = (notif: any, result: any) => {
    // console.log('notif: ',notif)

    pool.query(`INSERT INTO notifications SET ?`, [notif], (err, resultat: any) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      console.log('created user: ', resultat);
      // return 'ok'
      if (resultat.affectedRows > 0) {
        result(null, resultat.affectedRows);
      }
    });
  };
}
