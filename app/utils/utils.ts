export const DateTimePerfect = () => {
  const now = new Date();
  now.setHours(now.getHours() + 3);
  const datetime = now.toISOString().slice(0, 19).replace('T', ' ');
  return datetime;
};

export const DateInvoice = () => {
  let resultId = '';
  const characters = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  const charactersLength = characters.length;
  let counter = 0;

  while (counter < 4) {
    resultId += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }

  let date = new Date();
  let year = String(date.getFullYear()).slice(-2); // Obtenir les deux derniers chiffres de l'année
  let month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0 en JS, donc nous ajoutons 1
  let day = String(date.getDate()).padStart(2, '0');
  let formattedDate = `${year}${month}${day}-${resultId}-`;

  return formattedDate;
};

export const makeid = (length: number) => {
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  let counter = 0;

  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }

  return result;
};

export const isSandbox = () => {
  let toUppercase = process.env.CONFIG?.toLowerCase();

  switch (toUppercase) {
    case 'local':
    case 'test':
      return 1;

    case 'testprod':
    case 'localprod':
    case 'prod':
      return 0;

    default:
      return 0;
  }
};

export const DateTimeShort = () => {
  const now = new Date();
  now.setHours(now.getHours() + 3);
  const datetime = now.toISOString().slice(0, 10);
  return datetime;
};

export const decryptStatutTransfert = (statut: string) => {
  switch (parseInt(statut)) {
    case 0:
      return 'Aucune Action';

    case 1:
      return 'Payé';

    case 2:
      return 'à payer';

    case 3:
      return 'à envoyer';

    default:
      return 'DEFAULT TYPAGE ALERT';
  }
};

export const decryptStatutProvider = (statut: string) => {
  switch (parseInt(statut)) {
    case 0:
      return 'Null:Default';

    case 1:
      return 'recu';

    case 2:
      return 'Commande envoyé en attente';

    case 3:
      return 'à envoyer';

    default:
      return 'DEFAULT TYPAGE ALERT';
  }
};

export const decryptStatutFond = (statut: string) => {
  switch (parseInt(statut)) {
    case 0:
      return 'Null:Default';
    case 1:
      return 'Fonds recu';
    case 2:
      return 'en verification';
    case 3:
      return 'annulation';
    default:
      return 'DEFAULT TYPAGE ALERT';
  }
};
