import { describe, test } from 'node:test';
import assert from 'node:assert';
import { slugify } from './utils.js';

describe('slugify utility', () => {
  test('converts simple text to lowercased hyphenated slug', () => {
    assert.strictEqual(slugify('Hello World'), 'hello-world');
  });

  test('handles multiple consecutive spaces', () => {
    assert.strictEqual(slugify('Hello   World'), 'hello-world');
  });

  test('removes special non-word characters', () => {
    assert.strictEqual(slugify('Hello World! @2026 #cool'), 'hello-world-2026-cool');
  });

  test('replaces multiple hyphens with a single hyphen', () => {
    assert.strictEqual(slugify('hello---world'), 'hello-world');
  });

  test('trims leading and trailing hyphens', () => {
    assert.strictEqual(slugify('---hello world---'), 'hello-world');
  });

  test('handles numbers and non-string types gracefully via .toString()', () => {
    assert.strictEqual(slugify(12345), '12345');
  });

  test('handles empty string', () => {
    assert.strictEqual(slugify(''), '');
  });
});
