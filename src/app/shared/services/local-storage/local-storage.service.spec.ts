/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

// Platform Testing Imports
import { TestBed, async, fakeAsync, inject } from '@angular/core/testing';

// App Imports
import { LocalStorageService } from '../';

describe('SharedModule | LocalStorageService', () => {
  /**
   * –– Global Variables
   */
  const DEFAULT_PRIMITIVE_KEY = 'defaultPrimitiveValue',
    DEFAULT_PRIMITIVE_VALUE = '496949645',
    DEFAULT_OBJECT_KEY = 'defaultObjectValue',
    DEFAULT_OBJECT_VALUE = { property: '456', property2: 456, property3: true },
    UNEXISTING_KEY = 'defaultUnexistingKey';

  /**
   * –– Global Functions
   */
  beforeEach(() => {
    // configures our module.
    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    });

    // Sets some default values into LocalStorage.
    // !! This may be change when other client storage API get included as options.
    localStorage.setItem(
      DEFAULT_PRIMITIVE_KEY,
      JSON.stringify(DEFAULT_PRIMITIVE_VALUE)
    );
    localStorage.setItem(
      DEFAULT_OBJECT_KEY,
      JSON.stringify(DEFAULT_OBJECT_VALUE)
    );
  });

  afterEach(() => {
    localStorage.removeItem(DEFAULT_PRIMITIVE_KEY);
    localStorage.removeItem(DEFAULT_OBJECT_KEY);
  });

  /**
   * –– Specs definitions
   */
  it(
    'should get stored values',
    async(
      inject(
        [LocalStorageService],
        (localSotrageService: LocalStorageService) => {
          let storedValue = localSotrageService.getValue(DEFAULT_PRIMITIVE_KEY);

          expect(storedValue).toBeDefined();
          expect(storedValue).toEqual(DEFAULT_PRIMITIVE_VALUE);

          storedValue = localSotrageService.getValue(DEFAULT_OBJECT_KEY);

          expect(storedValue).toBeDefined();
          expect(storedValue).toEqual(DEFAULT_OBJECT_VALUE);
        }
      )
    )
  );

  it(
    'should return null for unexisting keys',
    async(
      inject(
        [LocalStorageService],
        (localSotrageService: LocalStorageService) => {
          const unexistingValue = localSotrageService.getValue(UNEXISTING_KEY);
          expect(unexistingValue).toBeNull();

          const emptyKeyValue = localSotrageService.getValue('');
          expect(emptyKeyValue).toBeNull();
        }
      )
    )
  );

  it(
    'should store values into localStorage',
    async(
      inject(
        [LocalStorageService],
        (localSotrageService: LocalStorageService) => {
          let object = { user: 'Sofia', id: 5837538 },
            key = 'objectTestingKey';

          let result = localSotrageService.storeValue(key, object);

          expect(result).toBe(true);
          expect(localStorage.getItem(key)).toEqual(JSON.stringify(object));

          const array = [
            'Administrator',
            'Collaborator',
            'Assistant',
            45,
            undefined,
            null,
            true
          ];
          key = 'arrayTestingKey';

          result = localSotrageService.storeValue(key, array);

          expect(result).toBe(true);
          expect(localStorage.getItem(key)).toEqual(JSON.stringify(array));

          const number = 395932958293523;
          key = 'numberTestingKey';

          result = localSotrageService.storeValue(key, number);

          expect(result).toBe(true);
          expect(localStorage.getItem(key)).toEqual(JSON.stringify(number));

          const string = 'My beautiful string';
          key = 'stringTestingKey';

          result = localSotrageService.storeValue(key, string);

          expect(result).toBe(true);
          expect(localStorage.getItem(key)).toEqual(JSON.stringify(string));

          const boolean = false;
          key = 'booleanTestingKey';

          result = localSotrageService.storeValue(key, boolean);

          expect(result).toBe(true);
          expect(localStorage.getItem(key)).toEqual(JSON.stringify(boolean));
        }
      )
    )
  );

  it(
    'should not store values into localStorage',
    async(
      inject(
        [LocalStorageService],
        (localSotrageService: LocalStorageService) => {
          let object = { user: 'Sofia', id: 5837538 },
            key = '',
            result = localSotrageService.storeValue(key, object);

          expect(result).toBe(false);

          key = undefined;
          result = localSotrageService.storeValue(key, object);

          expect(result).toBe(false);

          key = null;
          result = localSotrageService.storeValue(key, object);

          expect(result).toBe(false);
        }
      )
    )
  );

  it(
    'should remove stored values',
    async(
      inject(
        [LocalStorageService],
        (localSotrageService: LocalStorageService) => {
          let removedValue = localSotrageService.removeValue(
            DEFAULT_PRIMITIVE_KEY
          );
          expect(removedValue).toEqual(DEFAULT_PRIMITIVE_VALUE);

          removedValue = localSotrageService.removeValue(DEFAULT_PRIMITIVE_KEY);
          expect(removedValue).toBe(true);

          removedValue = localSotrageService.removeValue(DEFAULT_OBJECT_KEY);
          expect(removedValue).toEqual(DEFAULT_OBJECT_VALUE);

          removedValue = localSotrageService.removeValue(UNEXISTING_KEY);
          expect(removedValue).toBe(true);
        }
      )
    )
  );

  it(
    'should not remove stored values',
    async(
      inject(
        [LocalStorageService],
        (localSotrageService: LocalStorageService) => {
          let key = '',
            result = localSotrageService.removeValue(key);
          expect(result).toBe(false);

          key = undefined;
          result = localSotrageService.removeValue(key);
          expect(result).toBe(false);

          key = null;
          result = localSotrageService.removeValue(key);
          expect(result).toBe(false);
        }
      )
    )
  );
});
