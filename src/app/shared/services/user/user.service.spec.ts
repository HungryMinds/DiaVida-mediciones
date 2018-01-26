/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

// Platform Imports
import { Router } from '@angular/router';
import {
  HttpModule,
  Http,
  ConnectionBackend,
  BaseRequestOptions,
  Response,
  ResponseOptions
} from '@angular/http';

// Platform Testing Imports
import { TestBed, async, fakeAsync, inject, tick } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

// App Testing Imports
import { MockLoggedSessionService } from '../../../../test/services.helper';
import {
  MockLoginComponent,
  MockRequestComponent
} from '../../../../test/components.helper';

// App Imports
import { SharedModule } from '../../../';

import { User } from '../../models';
import { AppComponent } from '../../../../sac.component';
import { UserService } from './user.service';
import { SessionService } from '../../../core/services';
import { SACAPIService, LocalStorageService } from '../../../shared/services';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••          SUITE DECLARATION            •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

describe('SharedModule | UserService', () => {
  /**
   * –– Global Variables
   */
  let backendSubscription, userSubscription;

  /**
   * –– Global Functions
   */
  beforeEach(() => {
    // configures our module.
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: MockLoginComponent },
          { path: 'requests', component: MockRequestComponent },
          { path: '', pathMatch: 'full', redirectTo: 'requests' }
        ])
      ],
      declarations: [AppComponent, MockLoginComponent, MockRequestComponent],
      providers: [
        LocalStorageService,

        UserService,
        MockBackend,
        BaseRequestOptions,
        SACAPIService,
        {
          provide: SessionService,
          useClass: MockLoggedSessionService
        },
        // Setup our mocked backend.
        {
          provide: Http,
          useFactory: (
            backend: ConnectionBackend,
            options: BaseRequestOptions
          ) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });

    const fixture = TestBed.createComponent(AppComponent);
  });

  afterEach(() => {
    let result;
    if (userSubscription) {
      result = userSubscription.unsubscribe
        ? userSubscription.unsubscribe()
        : userSubscription.dispose();
    }
    if (backendSubscription) {
      result = backendSubscription.unsubscribe
        ? backendSubscription.unsubscribe()
        : backendSubscription.dispose();
    }
  });

  /**
   * –– Specs definitions
   */
  it(
    'should successfully retrieve users',
    async(
      inject(
        [UserService, MockBackend],
        (userService: UserService, backend: MockBackend) => {
          const usersBody =
            '[{ "id": 1, "name": "Larry", "lastname": "Cobb" }, { "id": 2, "name": "Herman", "lastname": "Summers" }, { "id": 3, "name": "Bryan", "lastname": "Campbell" }, { "id": 4, "name": "Gene", "lastname": "Nguyen" }, {"id": 5, "name": "Polly", "lastname": "Taylor"}]';
          // Creates backend response.
          backendSubscription = backend.connections.subscribe(connection => {
            const response = new ResponseOptions({
              body: usersBody,
              status: 200
            });
            connection.mockRespond(new Response(response));
          });

          userSubscription = userService.getUsers().subscribe(
            (users: User[]) => {
              expect(users.length).toEqual(5);
              expect(users[2].id).toEqual(3);
              expect(users[1].getFullName()).toEqual('Herman Summers');
              expect(users[4].id).toEqual(5);
              expect(users[4].getFullName()).toEqual('Polly Taylor');
            },
            error => fail('UserService should retrieve users successfully')
          );
        }
      )
    )
  );

  it(
    'should redirect session with unauthenticated response',
    fakeAsync(
      inject(
        [UserService, MockBackend, Router],
        (userService: UserService, backend: MockBackend, router: Router) => {
          router.navigate(['requests']);
          tick(200);

          // Creates backend response.
          backendSubscription = backend.connections.subscribe(connection => {
            const response = new ResponseOptions({
              body: '"UNAUTHENTICATED"',
              status: 401
            });
            connection.mockError(new Response(response));
          });

          userSubscription = userService.getUsers().subscribe(
            () => {
              fail('UserService should delegate errors');
            },
            error => {
              expect(error.code).toEqual(401);
              expect(error.data).toEqual('UNAUTHENTICATED');
            }
          );

          tick(400);
          expect(router.url).toEqual('/login');
        }
      )
    )
  );

  it(
    'should delegate error messages',
    async(
      inject(
        [UserService, MockBackend],
        (userService: UserService, backend: MockBackend) => {
          // Creates backend response.
          backendSubscription = backend.connections.subscribe(connection => {
            const response = new ResponseOptions({
              body: '"NOT FOUND"',
              status: 404
            });
            connection.mockError(new Response(response));
          });

          userSubscription = userService.getUsers().subscribe(
            () => fail('UserService should delegate errors'),
            error => {
              expect(error.code).toEqual(404);
              expect(error.data).toEqual('NOT FOUND');
            }
          );
        }
      )
    )
  );
});
