/**
 * format any matched attribute to its proper css selector notation
 * e.g. "-cy:my-selector-name" will be replaced by [data-cy="my-selector-name"]
 *
 * config example:
 * const config = {
 *    name: “”
 *    prefix: “”
 *    separator: “:”
 * }
 *
 * @param  {string}  selectors         the css selectors
 * @param  {object}  config            the options
 * @param  {string}  config.name       the attribute name - default is 'cy'
 * @param  {string}  config.prefix     the attribute prefix - default is 'data-'
 * @param  {string}  config.separator  the separator between the attribute and its value - default is '|'
 * @return {string}                    the formatted selectors
 */
export const formatSelectors = (
  selectors,
  { name = 'cy', prefix = 'data-', separator = '|' } = {},
) => {
  const shortNotation = name + separator
  if (!selectors.includes(shortNotation)) return selectors

  const escapedName = name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
  const escapedSeparator = separator.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
  const regexp = new RegExp(`^(${escapedName}${escapedSeparator})([\\w-]+)(\S*)`)
  const attr = prefix + name

  const formatted = []
  selectors.split(' ').forEach(selector => {
    if (selector.length === 1) {
      formatted.push(selector)
    } else {
      formatted.push(selector.replace(regexp, `[${attr}=\"$2\"]$3`))
    }
  })
  return formatted.join(' ')
}
