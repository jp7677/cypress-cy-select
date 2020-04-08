import { formatSelectors } from '../../src/lib'

test.each([
  ['p', 'p'],
  ['div', 'div'],
  ['cy|my-custom-selector', '[data-cy="my-custom-selector"]'],
  ['cy|my-custom-selector + p', '[data-cy="my-custom-selector"] + p'],
  ['cy|my-custom-selector:disabled', '[data-cy="my-custom-selector"]:disabled'],
  ['cy|my-custom-selector|=some', '[data-cy="my-custom-selector"]|=some'],
  [
    'cy|my-custom-selector:disabled > p:disabled',
    '[data-cy="my-custom-selector"]:disabled > p:disabled',
  ],
  [
    'body > .modal cy|my-custom-selector > .some-class cy|my-custom-selector-child cy|my-custom-selector-grand-child',
    'body > .modal [data-cy="my-custom-selector"] > .some-class [data-cy="my-custom-selector-child"] [data-cy="my-custom-selector-grand-child"]',
  ],
  ['other-cy|my-custom-selector', 'other-cy|my-custom-selector'],
])(
  'should format the cy selector `%s` to proper data-cy selectors `%s`',
  (selectors, expectedResult) => {
    expect(formatSelectors(selectors)).toBe(expectedResult)
  },
)

test('should allow developers to specify their own config', () => {
  const selectors =
    'body > .modal e2e:my-custom-selector > .some-class e2e:my-custom-selector-child e2e:my-custom-selector-grand-child'
  const expectedResult =
    'body > .modal [data-e2e="my-custom-selector"] > .some-class [data-e2e="my-custom-selector-child"] [data-e2e="my-custom-selector-grand-child"]'
  expect(formatSelectors(selectors, { name: 'e2e', separator: ':' })).toBe(
    expectedResult,
  )
})
