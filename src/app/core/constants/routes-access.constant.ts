/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••         INTERFACE DECLARATION         •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
interface RoutesAccess {
  PUBLIC: string[];
  AUTH_REQ: string[];
}

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••         CONSTANTS DECLARATION         •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

export const ROUTES_ACCESS: RoutesAccess = {
  PUBLIC: ['login'],
  AUTH_REQ: ['requests', 'admin']
};
