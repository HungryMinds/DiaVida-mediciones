/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••          CONSTANTS DEFINITION         •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

const monthsMap = new Map<number, string>();

monthsMap.set(0, 'enero');
monthsMap.set(1, 'febrero');
monthsMap.set(2, 'marzo');
monthsMap.set(3, 'abril');
monthsMap.set(4, 'mayo');
monthsMap.set(5, 'junio');
monthsMap.set(6, 'julio');
monthsMap.set(7, 'agosto');
monthsMap.set(8, 'septiembre');
monthsMap.set(9, 'octubre');
monthsMap.set(10, 'noviembre');
monthsMap.set(11, 'diciembre');

export const DATE_I18N_DICTIONARY = {
  ES_CR: {
    MONTHS: monthsMap
  }
};
