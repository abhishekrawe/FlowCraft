import { getTextDimensions, getTextVariables } from './textUtils';

test('extracts, trims, and deduplicates valid variables', () => {
  expect(getTextVariables('Hello {{firstName}} {{ lastName }} {{firstName}}')).toEqual([
    'firstName',
    'lastName',
  ]);
});

test('ignores malformed and invalid variables', () => {
  expect(getTextVariables('{{123name}} {{user-name}} {{hello.world}} {{')).toEqual([]);
});

test('supports empty and multiline text without unbounded growth', () => {
  expect(getTextVariables('')).toEqual([]);
  expect(getTextDimensions('')).toEqual({ width: 220, height: 44 });
  expect(getTextDimensions('one\ntwo\nthree').height).toBeGreaterThan(44);
  expect(getTextDimensions('a'.repeat(1000))).toEqual({ width: 440, height: 190 });
});