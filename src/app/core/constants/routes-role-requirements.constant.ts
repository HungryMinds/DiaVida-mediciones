/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

import { USER_ROLES } from '../../shared/shared.constants';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••         INTERFACE DECLARATION         •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
interface RoleRequirement {
  ROUTE: string;
  REQUIRED_ROLES: string[];
}
interface RouteRoleRequirement {
  ADMIN: RoleRequirement;
  REQUESTS: RoleRequirement;
}

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••         CONSTANTS DECLARATION         •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

export const ROUTES_ROLE_REQUIREMENTS: RouteRoleRequirement = {
  ADMIN: { ROUTE: 'admin', REQUIRED_ROLES: ['Administrator'] },
  REQUESTS: { ROUTE: 'requests', REQUIRED_ROLES: ['Specialist'] }
};
