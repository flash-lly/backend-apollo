export enum ResponseCodes {
  //200
  OK = 'OK',
  CREATED = 'CREATED',
  DELETED = 'DELETED',

  //300
  REDIRECT = 'REDIRECT',

  //400
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  I_AM_NOT_A_TEAPOT = 'I_AM_NOT_A_TEAPOT',
  TOO_MANY_REQUESTS = 'TOO_MANY_REQUESTS',
  UNAVAILABLE_FOR_LEGAL_REASONS = 'UNAVAILABLE_FOR_LEGAL_REASONS',

  //500
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',

  //default
  SOMETHING_WENT_WRONG = 'Something went wrong.',

  // individual

  USER_ALREADY_EXISTS = 'User already exists',
  INCORRECT_EMAIL_OR_PASSWORD = 'Incorrect email or password',

  RETRIEVING_TRANSACTION = 'Some error occurred while retrieving transactions.',

  RETRIEVING_NOTIFICATION = 'Error retrieving Notification.',
  CREATING_NOTIFICATION = 'Some error occurred while creating the transaction.',
  CANNOT_EMPTY = 'Content can not be empty!',

  UPDATING = 'Some error occurred while updating.',
  CREATING = 'Some error occurred while creating.',
  DELETING = 'Some error occurred while deleting.',
  RETRIEVING = 'Some error occurred while retrieving.',

  BITY_ORDER = 'Some error occurred while creating the bity order.',

  KYT_UPDATED = 'KYT ERROR UPDATED',
  IBAN_VALIDATOR = 'api IBAN VALIDATOR ECHEC',
}

export enum ResponseStatuses {
  // 200
  OK = '200',
  CREATED = '201',
  DELETED = '204',

  // 300
  REDIRECT = '302',

  //400
  BAD_REQUEST = '400',
  UNAUTHORIZED = '401',
  FORBIDDEN = '403',
  NOT_FOUND = '404',
  CONFLICT = '409',
  I_AM_NOT_A_TEAPOT = '418',
  TOO_MANY_REQUESTS = '429',
  UNAVAILABLE_FOR_LEGAL_REASONS = '451',

  //500
  INTERNAL_SERVER_ERROR = '500',
}
