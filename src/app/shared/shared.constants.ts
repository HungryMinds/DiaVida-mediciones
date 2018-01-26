/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••          CONSTANTS DEFINITION         •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

export const USER_ROLES = {
  ADMINISTRATOR: {
    ID: 1,
    LABEL: 'Administrator'
  },
  SPECIALIST: {
    ID: 2,
    LABEL: 'Specialist'
  },
  COLLABORATOR: {
    ID: 3,
    LABEL: 'Collaborator'
  }
};

export const ATTACHMENTS_TYPES = {
  REQUEST: 'request',
  RESPONSE: 'response'
};

export const QUESTION_TYPES = {
  NUMBER: 'number',
  TEXT: 'text',
  BOOLEAN: 'bool'
};

export const QUESTION_BOOLEAN = {
  TRUE: 'True',
  FALSE: 'False'
};

export const ERROR_MESSAGES = {
  UNAVAILABLE_CATEGORIES:
    'No pudimos obtener las categorías. Inténtelo mas tarde',
  UNAVAILABLE_REQUEST_TYPES:
    'No pudimos obtener las subcategorías. Inténtelo mas tarde.',
  UNAVAILABLE_REQUESTS:
    'No pudimos obtener las gestiones. Pasa de nuevo más tarde.',
  UNAVAILABLE_USERS: 'No pudimos obtener usuarios. Inténtalo más tarde.',

  ASSIGN_ERROR: 'No fue posible asignar las gestiones. Inténtelo de nuevo.',
  RESOLUTION_ERROR: 'No pudimos responder la gestión. Inténtelo de nuevo.',
  DOWNLOAD_ERROR:
    'No pudimos descargar los archivos adjuntos. Inténtelo de nuevo.'
};

export const SUCCESS_MESSAGES = {
  ASSIGNED_REQUESTS: 'Gestiones asignadas exitosamente.',
  RESOLUTION_SUCCESS: 'Respuesta registrada exitosamente.',
  DOWNLOAD_SUCCESS: 'Archivos descargados exitosamente.'
};
