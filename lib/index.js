/**
 *
 * @param {number[]} origin
 * @param {number[]} development
 * @param {number[]} values
 * @returns {Map<number, Map<number, number>>}
 */
export function getTriangleMapFromYears(development, origin, values) {
  const triangle = new Map()
  for (const [i, originYear] of origin.entries()) {
    const developmentYear = development[i]
    const value = values[i]
    if (!triangle.has(originYear)) {
      triangle.set(originYear, new Map())
    }

    if (triangle.get(originYear).has(developmentYear)) {
      throw new Error(
        `duplicate origin/development year pair: ${originYear}/${developmentYear}`
      )
    }

    triangle.get(originYear).set(developmentYear, value)
  }

  return triangle
}

/**
 *
 * @param {Map<number, Map<number, number>>} triangle
 * @returns {number[][]}
 */
export function getTriangleArrayFromTriangleMap(triangle) {
  const originYears = Array.from(triangle.keys()).sort()
  const developmentYearsSet = new Set(
    Array.from(triangle.values()).flatMap((x) => Array.from(x.keys()))
  )
  const developmentYears = Array.from(developmentYearsSet).sort()
  const excelArray = []
  for (const originYear of originYears) {
    const row = []
    const originYearMap = /** @type {Map<number, number>} */ (
      triangle.get(originYear)
    )
    // Filter for development years greater than or equal to origin year, slow O(n^2) for big triangle
    const developmentGreaterThanOrigin = developmentYears.filter(
      (x) => x >= originYear
    )
    for (const developmentYear of developmentGreaterThanOrigin) {
      if (originYearMap.has(developmentYear)) {
        row.push(/** @type {number} */ (originYearMap.get(developmentYear)))
      } else {
        row.push(0)
      }
    }

    removeTrailingZerosMutable(row)
    excelArray.push(row)
  }

  return excelArray
}

/**
 *
 * @param {number[]} origin
 * @param {number[]} development
 * @param {number[]} values
 * @returns {number[][]}
 */
export function getTriangleArrayFromYears(origin, development, values) {
  const triangle = getTriangleMapFromYears(development, origin, values)
  return getTriangleArrayFromTriangleMap(triangle)
}

/**
 * @param {number[]} array
 */
function removeTrailingZerosMutable(array) {
  while (array.length > 0 && array.at(-1) === 0) {
    array.pop()
  }
}
