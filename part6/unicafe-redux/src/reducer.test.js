import deepFreeze from 'deep-freeze'
import { counterReducer } from './reducer'

describe('Unicafe counterReducer', () => {
  const initialState = {
    good: 0,
    neutral: 0,
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
      neutral: 0,
      bad: 0,
    })
  })

  it('should increment NEUTRAL', () => {
    const action = {
      type: 'NEUTRAL',
    }

    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      neutral: 1,
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
      neutral: 0,
      bad: 1,
    })
  })

  it('should RESET all', () => {
    const action = {
      type: 'RESET',
    }

    const state = {
      good: 1,
      neutral: 2,
      bad: 3,
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      neutral: 0,
      bad: 0,
    })
  })
})
