import LRUCache from "../src/lru-cache";

const key = 'key';
const value = 'value';

describe("read", () => {
  test("reading a key that does not exist returns null", () => {
    const cache = new LRUCache();

    expect(cache.read(2)).toBeNull();
  });

  test("reading a key that exists returns the value", () => {
    const cache = new LRUCache();

    cache.write(key, value);

    expect(cache.read(key)).toEqual(value);
  });
});

describe("write", () => {
  test("writes a key to the cache successfully", () => {
    const cache = new LRUCache();

    cache.write(key, value);

    expect(cache.read(key)).toEqual(value);
  });

  test("writing the same key more than once sets the current value as the last write", () => {
    const cache = new LRUCache();
    const expectedValue = 40;

    cache.write(key, value);
    cache.write(key, expectedValue);

    expect(cache.read(key)).toEqual(expectedValue);
  });

  test("writing the same key more than once does not increment the size of the cache", () => {
    const cache = new LRUCache();

    cache.write(key, value);
    cache.write(key, 40);

    expect(cache.size).toBe(1);
  });
});

describe("remove", () => {
  test("removes a key from the cache", () => {
    const cache = new LRUCache();

    cache.write(key, value);
    cache.remove(key);

    expect(cache.read(key)).toBeNull();
  });
});


describe("when cache is full", () => {
  const capacity = 3;
  const cache = new LRUCache(capacity);

  beforeEach(() => {
    for (let a = 1; a <= 3; a++) {
      cache.write(a, a);
    }
  });

  test("write does not increase the size pass the capacity", () => {
    cache.write(4, 4);

    expect(cache.size).toBe(capacity);
  });

  test("write removes the least recently used item", () => {
    cache.write(4, 4);

    expect(cache.read(1)).toBeNull();
    expect(cache.read(4)).not.toBeNull();
  });

  test("write removes only the least recently read item", () => {
    cache.read(1);
    cache.read(2);
    cache.write(4, 4);

    expect(cache.read(3)).toBeNull();
  });
});