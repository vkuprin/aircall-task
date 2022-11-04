import getFromLocalStorage from '../../src/utils/helpers/storage';
import isHttpError from '../../src/utils/api/statusCode';

describe('getFromLocalStorage', () => {
  it('should return null if no key is provided', () => {
    expect(getFromLocalStorage('')).toBeNull();
  });
  it('should return null if key is not found', () => {
    expect(getFromLocalStorage('test')).toBeNull();
  });
  it('should return value if key is found', () => {
    localStorage.setItem('test', 'test');
    expect(getFromLocalStorage('test')).toBe('test');
  });
});

describe('statusCode', () => {
  describe('isHttpError', () => {
    it('should return true if string starts with 4', () => {
      expect(isHttpError('400')).toBe(true);
    });

    it('should return true if string starts with 5', () => {
      expect(isHttpError('500')).toBe(true);
    });

    it('should return false if string starts with 3', () => {
      expect(isHttpError('300')).toBe(false);
    });

    it('should return false if string starts with 2', () => {
      expect(isHttpError('200')).toBe(false);
    });

    it('should return false if string is empty', () => {
      expect(isHttpError('')).toBe(false);
    });
  });
});
