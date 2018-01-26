/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
// Framework imports
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

// Service Imports
import { SessionService } from '../services';

// Constants Imports
import { USER_ROLES } from '../../shared/shared.constants';
import { User } from '../../shared/models';
import { ROUTES_ACCESS } from '../constants/routes-access.constant';
import { ROUTES_ROLE_REQUIREMENTS } from '../constants/routes-role-requirements.constant';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••           GUARD DEFINITION            •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
@Injectable()
export class AuthGuard implements CanActivate {
  /** –––
   *  –– Constructor
   */
  constructor(private sessionService: SessionService, private router: Router) {}

  /** –––
   *  –– Helper methods
   */

  isIncludedRoute(searchedRoutes: string[], routes: ActivatedRouteSnapshot[]) {
    return routes.some(
      (activatedRoute: ActivatedRouteSnapshot) =>
        !!activatedRoute.url.length &&
        searchedRoutes.includes(activatedRoute.url[0].path)
    );
  }

  isRouteValidUser(routeRequirements: string[], sessionUser: User) {
    return routeRequirements.every(requirement =>
      sessionUser.hasRole(requirement)
    );
  }

  /** –––
   *  –– Lifecycle Hooks
   */
  canActivate(nextState: ActivatedRouteSnapshot) {
    const session = this.sessionService.getCurrent(),
      isLoggedUser = session !== null;

    if (
      !isLoggedUser &&
      this.isIncludedRoute(ROUTES_ACCESS.AUTH_REQ, nextState.pathFromRoot)
    ) {
      this.router.navigate(['/login']);
    }

    if (
      isLoggedUser &&
      this.isIncludedRoute(ROUTES_ACCESS.PUBLIC, nextState.pathFromRoot)
    ) {
      if (session.user.hasRole(USER_ROLES.SPECIALIST.LABEL)) {
        this.router.navigate(['/requests']);
      } else if (session.user.hasRole(USER_ROLES.ADMINISTRATOR.LABEL)) {
        this.router.navigate(['/admin']);
      } else {
        this.sessionService.destroySession();
      }
    }

    if (
      isLoggedUser &&
      this.isIncludedRoute(ROUTES_ACCESS.AUTH_REQ, nextState.pathFromRoot)
    ) {
      // Checks for user role requirements.
      // Request validations.
      if (
        this.isIncludedRoute(
          [ROUTES_ROLE_REQUIREMENTS.REQUESTS.ROUTE],
          nextState.pathFromRoot
        ) &&
        !this.isRouteValidUser(
          ROUTES_ROLE_REQUIREMENTS.REQUESTS.REQUIRED_ROLES,
          session.user
        )
      ) {
        if (
          this.isRouteValidUser(
            ROUTES_ROLE_REQUIREMENTS.ADMIN.REQUIRED_ROLES,
            session.user
          )
        ) {
          this.router.navigate(['/admin']);
        } else {
          this.sessionService.destroySession();
          this.router.navigate(['/']);
        }
      }

      if (
        this.isIncludedRoute(
          [ROUTES_ROLE_REQUIREMENTS.ADMIN.ROUTE],
          nextState.pathFromRoot
        ) &&
        !this.isRouteValidUser(
          ROUTES_ROLE_REQUIREMENTS.ADMIN.REQUIRED_ROLES,
          session.user
        )
      ) {
        if (
          this.isRouteValidUser(
            ROUTES_ROLE_REQUIREMENTS.REQUESTS.REQUIRED_ROLES,
            session.user
          )
        ) {
          this.router.navigate(['/requests']);
        } else {
          this.sessionService.destroySession();
          this.router.navigate(['/']);
        }
      }
    }

    return true;
  }
}
