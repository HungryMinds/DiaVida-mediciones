/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

// Platform Imports
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
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';

// App Imports
import { SharedModule } from '../../../';

import { Session } from './session.interface';

import { SessionService } from './session.service';
import { SACAPIService, LocalStorageService } from '../../../shared/services';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••          SUITE DECLARATION            •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

describe('CoreModule | SessionService', () => {
  /**
   * –– Global Variables
   */
  let backendSubscription,
    sessionSubscription,
    loginBody =
      '{ "id": 1, "username": "szamora", "name": "Sofia", "lastname": "Zamora", "roles": ["Administrator"], "token": "example" }';

  /**
   * –– Global Functions
   */
  beforeEach(
    async(() => {
      // configures our module.
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes([
            { path: 'login', component: MockLoginComponent },
            { path: 'requests', component: MockRequestComponent }
          ])
        ],
        declarations: [MockLoginComponent, MockRequestComponent],
        providers: [
          SessionService,
          MockBackend,
          BaseRequestOptions,
          SACAPIService,
          LocalStorageService,
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
    })
  );

  afterEach(() => {
    let result;
    if (sessionSubscription) {
      result = sessionSubscription.unsubscribe
        ? sessionSubscription.unsubscribe()
        : sessionSubscription.dispose();
    }
    if (backendSubscription) {
      result = backendSubscription.unsubscribe
        ? backendSubscription.unsubscribe()
        : backendSubscription.dispose();
    }

    localStorage.clear();
  });

  /**
   * –– Specs definitions
   */
  it(
    'should successfully login a user',
    async(
      inject(
        [SessionService, MockBackend],
        (sessionService: SessionService, backend: MockBackend) => {
          // Creates backend response.
          backendSubscription = backend.connections.subscribe(connection => {
            const response = new ResponseOptions({
              body: loginBody,
              status: 200
            });
            connection.mockRespond(new Response(response));
          });

          sessionSubscription = sessionService
            .createSession('username', 'password')
            .subscribe(
              (session: Session) => {
                expect(session.user.name).toEqual('Sofia');
                expect(session.user.lastname).toEqual('Zamora');
                expect(session.user.username).toEqual('szamora');
                expect(session.user.roles).toContain('Administrator');
                expect(session.token).toEqual(
                  'example'
                );
              },
              error => {
                fail('SessionService should create a session successfully');
              }
            );
        }
      )
    )
  );

  it(
    'should handle unsuccessful login',
    async(
      inject(
        [SessionService, MockBackend],
        (sessionService: SessionService, backend: MockBackend) => {
          // Creates backend response.
          backendSubscription = backend.connections.subscribe(connection => {
            const response = new ResponseOptions({
              body: '{ "message": "USER NOT FOUND" }',
              status: 404
            });
            connection.mockError(new Response(response));
          });

          sessionSubscription = sessionService
            .createSession('username', 'password')
            .subscribe(
              (session: Session) =>
                fail('SessionService should handle fal login request'),
              error => expect(error.code).toBe(404)
            );
        }
      )
    )
  );

  it(
    'should retrieve current session',
    fakeAsync(
      inject(
        [SessionService, MockBackend],
        (sessionService: SessionService, backend: MockBackend) => {
          backendSubscription = backend.connections.subscribe(connection => {
            const response = new ResponseOptions({
              body: loginBody,
              status: 200
            });
            connection.mockRespond(new Response(response));
          });

          sessionSubscription = sessionService
            .createSession('username', 'password')
            .subscribe();

          tick(500);
          const session = sessionService.getCurrent();

          expect(session).toBeTruthy();
          expect(session.user.name).toEqual('Sofia');
          expect(session.user.lastname).toEqual('Zamora');
          expect(session.user.username).toEqual('szamora');
          expect(session.user.roles).toContain('Administrator');
          expect(session.token).toEqual(
            'example'
          );
        }
      )
    )
  );

  it(
    'should return null when there is no current session',
    async(
      inject([SessionService], (sessionService: SessionService) => {
        const session = sessionService.getCurrent();
        expect(session).toBeNull();
      })
    )
  );

  it(
    'should remove current session',
    fakeAsync(
      inject(
        [SessionService, MockBackend],
        (sessionService: SessionService, backend: MockBackend) => {
          backendSubscription = backend.connections.subscribe(connection => {
            const response = new ResponseOptions({
              body: loginBody,
              status: 200
            });
            connection.mockRespond(new Response(response));
          });

          sessionSubscription = sessionService
            .createSession('username', 'password')
            .subscribe();

          tick(500);
          let session = sessionService.getCurrent();
          expect(session).toBeTruthy();

          sessionService.destroySession();

          session = sessionService.getCurrent();
          expect(session).toBeNull();
        }
      )
    )
  );
});
