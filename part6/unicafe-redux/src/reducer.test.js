import deepFreeze from 'deep-freeze'
import { counterReducer } from './reducer'

describe('Unicafe counterReducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  }

  it('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING',
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  it('should increment GOOD', () => {
    const action = {
      type: 'GOOD',
    }

    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    })
  })

  it('should increment OK', () => {
    const action = {
      type: 'OK',
    }

    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0,
    })
  })

  it('should increment BAD', () => {
    const action = {
      type: 'BAD',
    }

    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1,
    })
  })

  it('should reset all with action ZERO', () => {
    const action = {
      type: 'ZERO',
    }

    const state = {
      good: 1,
      ok: 2,
      bad: 3,
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0,
    })
  })
})
