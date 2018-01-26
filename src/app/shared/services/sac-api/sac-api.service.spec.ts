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
  ResponseOptions,
  RequestMethod
} from '@angular/http';

// Platform Testing Imports
import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';

// App Imports
import { SACAPIService } from './sac-api.service';
import { APIRequestOptions } from './api-request-options.interface';
import environment from '../../../../environments/environment';

describe('SharedModule | SACAPIService', () => {
  /**
   * –– Global Variables
   */
  let serviceSubscription, backendSubscription;

  /**
   * –– Global Functions
   */
  beforeEach(() => {
    // configures our module.
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        SACAPIService,
        MockBackend,
        BaseRequestOptions,
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
  });

  afterEach(() => {
    let result;
    if (serviceSubscription) {
      result = serviceSubscription.unsubscribe
        ? serviceSubscription.unsubscribe()
        : serviceSubscription.dispose();
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
    'should make a successful request',
    async(
      inject(
        [SACAPIService, MockBackend],
        (sacapiService: SACAPIService, backend: MockBackend) => {
          // Creates backend response.
          backendSubscription = backend.connections.subscribe(connection => {
            const response = new ResponseOptions({
              body: '{"response": true, "message": "OK" }',
              status: 200
            });
            connection.mockRespond(new Response(response));
          });

          serviceSubscription = sacapiService.get('/session').subscribe(
            (response: { response: any; message: string }) => {
              expect(response).toBeDefined();
              expect(response.response).toEqual(true);
              expect(response.message).toEqual('OK');
            },
            error => {
              fail('SACAPIService should push a valid response.');
            }
          );
        }
      )
    )
  );

  it(
    'should catch server errors',
    async(
      inject(
        [SACAPIService, MockBackend],
        (sacapiService: SACAPIService, backend: MockBackend) => {
          // Creates backend response.
          const path = '/session';

          backendSubscription = backend.connections.subscribe(connection => {
            expect(connection.request.url).toEqual(environment.API_URL + path);
            const response = new ResponseOptions({
              body: '"NOT FOUND"',
              status: 404
            });
            connection.mockError(new Response(response));
          });

          serviceSubscription = sacapiService.get(path).subscribe(
            response => {
              fail('SACAPIService should catch and handle invalid values.');
            },
            error => {
              expect(error).toBeDefined();
              expect(error.code).toBe(404);
              expect(error.data).toEqual('NOT FOUND');
            }
          );
        }
      )
    )
  );

  it(
    'should catch local errors',
    async(
      inject(
        [SACAPIService, MockBackend],
        (sacapiService: SACAPIService, backend: MockBackend) => {
          // Creates backend response.
          const path = '/session';

          backendSubscription = backend.connections.subscribe(connection => {
            expect(connection.request.url).toEqual(environment.API_URL + path);
            const response = new ResponseOptions({
              body: '{ invalidKey: "Valid Value" }',
              status: 200
            });
            connection.mockRespond(new Response(response));
          });

          serviceSubscription = sacapiService.get(path).subscribe(
            response => {
              fail('SACAPIService should handle unexpected errors.');
            },
            error => {
              expect(error).toBeDefined();
              expect(error.code).toBe(500);
              expect(error.data.message).toEqual('Unexpected local error');
            }
          );
        }
      )
    )
  );

  it(
    'should add default headers to requests',
    async(
      inject(
        [SACAPIService, MockBackend],
        (sacapiService: SACAPIService, backend: MockBackend) => {
          // Creates backend response.
          const path = '/session';

          backendSubscription = backend.connections.subscribe(connection => {
            expect(connection.request.headers.get('Content-Type')).toEqual(
              'application/json'
            );
          });

          serviceSubscription = sacapiService.get(path);
        }
      )
    )
  );

  it(
    'should make a GET request',
    async(
      inject(
        [SACAPIService, MockBackend],
        (sacapiService: SACAPIService, backend: MockBackend) => {
          // Creates backend response.
          const path = '/session';

          backendSubscription = backend.connections.subscribe(connection => {
            expect(connection.request.url).toEqual(environment.API_URL + path);
            expect(connection.request.method).toEqual(RequestMethod.Get);
          });

          serviceSubscription = sacapiService.get(path);
        }
      )
    )
  );

  it(
    'should apply query string parameters',
    async(
      inject(
        [SACAPIService, MockBackend],
        (sacapiService: SACAPIService, backend: MockBackend) => {
          // Creates backend response.
          const path = '/session',
            options = <APIRequestOptions>{
              params: { id: 4953, name: 'Gabriel & Sofia' }
            };

          backendSubscription = backend.connections.subscribe(connection => {
            const queryString = Object.keys(options.params)
              .map(
                paramKey =>
                  `${encodeURIComponent(paramKey)}=${encodeURIComponent(
                    options.params[paramKey]
                  )}`
              )
              .join('&');

            expect(connection.request.url).toEqual(
              `${environment.API_URL}${path}?${queryString}`
            );
          });

          serviceSubscription = sacapiService.get(path, options);
        }
      )
    )
  );

  it(
    'should not apply query string parameters',
    async(
      inject(
        [SACAPIService, MockBackend],
        (sacapiService: SACAPIService, backend: MockBackend) => {
          // Creates backend response.
          const path = '/session',
            options = <APIRequestOptions>{};

          backendSubscription = backend.connections.subscribe(connection => {
            expect(connection.request.url).toEqual(
              `${environment.API_URL}${path}`
            );
          });

          serviceSubscription = sacapiService.get(path, options);
          serviceSubscription.unsubscribe();

          options.params = {};
          serviceSubscription = sacapiService.get(path, options);

          serviceSubscription.unsubscribe();

          options.params = { id: 49945 };
          serviceSubscription = sacapiService.post(path, {}, options);
        }
      )
    )
  );

  it(
    'should make a POST request',
    async(
      inject(
        [SACAPIService, MockBackend],
        (sacapiService: SACAPIService, backend: MockBackend) => {
          // Creates backend response.
          const path = '/session',
            data = { username: 'fakename', password: 'Vwi4idfjd?GJ' },
            options = { authorization: 'FKNJNJeivinjncjuv*&^fjvjfvbfhvbhf' };

          backendSubscription = backend.connections.subscribe(connection => {
            expect(connection.request.url).toEqual(environment.API_URL + path);
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request._body).toEqual(JSON.stringify(data));
          });

          serviceSubscription = sacapiService.post(path, data, options);
        }
      )
    )
  );

  it(
    'should apply Authorization header to requests',
    async(
      inject(
        [SACAPIService, MockBackend],
        (sacapiService: SACAPIService, backend: MockBackend) => {
          // Creates backend response.
          const path = '/session',
            data = {},
            options = { authorization: 'FKNJNJeivinjncjuv*&^fjvjfvbfhvbhf' };

          backendSubscription = backend.connections.subscribe(connection => {
            expect(connection.request.headers.get('Authorization')).toEqual(
              'FKNJNJeivinjncjuv*&^fjvjfvbfhvbhf'
            );
          });

          serviceSubscription = sacapiService.get(path, options);
          serviceSubscription.unsubscribe();
          serviceSubscription = sacapiService.post(path, data, options);
        }
      )
    )
  );

  it(
    'should not apply Authorization header to requests',
    async(
      inject(
        [SACAPIService, MockBackend],
        (sacapiService: SACAPIService, backend: MockBackend) => {
          // Creates backend response.
          const path = '/session',
            data = { username: 'fakename', password: 'Vwi4idfjd?GJ' },
            options = <APIRequestOptions>{};

          backendSubscription = backend.connections.subscribe(connection => {
            expect(connection.request.headers.get('Authorization')).toBeNull();
          });

          serviceSubscription = sacapiService.get(path);
          serviceSubscription.unsubscribe();
          serviceSubscription = sacapiService.post(path, data, options);
          serviceSubscription.unsubscribe();

          options.authorization = null;
          serviceSubscription = sacapiService.post(path, data, options);
        }
      )
    )
  );
});
