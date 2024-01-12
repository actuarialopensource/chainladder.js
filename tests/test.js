import assert from 'node:assert/strict'
import test from 'node:test'
import {getTriangleArrayFromYears} from 'chainladder'

test('basic happy path', () => {
  const origin = [1, 1, 2]
  const development = [1, 2, 2]
  const values = [100, 90, 120]
  const triangle = getTriangleArrayFromYears(origin, development, values)
  assert.deepEqual(triangle, [[100, 90], [120]])
})

test('empty development year', () => {
  const origin = [1, 2]
  const development = [1, 2]
  const values = [90, 120]
  const triangle = getTriangleArrayFromYears(origin, development, values)
  assert.deepEqual(triangle, [[90], [120]])
})

test('duplicate (origin, development) pair causes error', () => {
  const origin = [1, 1]
  const development = [1, 1]
  const values = [90, 120]
  assert.throws(() => {
    getTriangleArrayFromYears(origin, development, values)
  })
})
