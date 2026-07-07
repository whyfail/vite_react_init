import { cn } from './utils';

describe('shared class utilities', () => {
  it('merges conditional class names and resolves tailwind conflicts', () => {
    expect(cn('px-2', false && 'hidden', 'px-4')).toBe('px-4');
  });
});
