import { ThunkDispatch } from 'redux-thunk'

import { IUser } from '../interfaces/IUser'
import { authService } from '../services/auth'
import { RootState } from '../store'
import { addNotification, IAddNotification } from './notificationReducer'

enum UsersActionType {
  LOGIN = 'LOGIN',
  AUTH_IN_PROGRESS = 'AUTH_IN_PROGRESS',
  LOGOUT = 'LOGOUT',
}

interface UsersState {
  users: IUser[]
  loggedInUser: IUser | null
  authInProgress: boolean
}

interface ILogin {
  type: UsersActionType.LOGIN
  data: IUser | null
}

interface ILogout {
  type: UsersActionType.LOGOUT
  data: undefined
}

interface IAuthInProgress {
  type: UsersActionType.AUTH_IN_PROGRESS
  data: { authInProgress: boolean }
}

type UsersActionInterfaces = ILogin | ILogout | IAuthInProgress

const initialState: UsersState = {
  users: [],
  loggedInUser: null,
  authInProgress: false,
}

const usersReducer = (
  state = initialState,
  action: UsersActionInterfaces
): UsersState => {
  switch (action.type) {
    case UsersActionType.LOGIN: {
      return {
        ...state,
        loggedInUser: action.data,
      }
    }

    case UsersActionType.LOGOUT:
      return { ...state, loggedInUser: null }

    case UsersActionType.AUTH_IN_PROGRESS:
      return { ...state, authInProgress: action.data.authInProgress }

    default:
      return state
  }
}

const login = ({
  user,
  username,
  password,
}: {
  user?: IUser | null
  username?: string
  password?: string
}) => {
  return async (
    dispatch: ThunkDispatch<RootState, void, ILogin | IAddNotification>
  ): Promise<void> => {
    dispatch(setAuthInProgress(true))

    try {
      if (user) {
        dispatch({
          type: UsersActionType.LOGIN,
          data: user,
        })

        return
      }

      if (username && password) {
        const userFromServer = await authService.login({
          username,
          password,
        })

        dispatch({
          type: UsersActionType.LOGIN,
          data: userFromServer.data.data || null,
        })

        return
      }
    } catch (error: any) {
      dispatch(
        addNotification({
          message: error?.response?.data?.error?.message || 'Failed to login.',
          type: 'error',
        })
      )
    }

    dispatch(setAuthInProgress(false))
  }
}

const logout = (): void => {
  // @ts-ignore // FIXME What's wrong with this?
  return (dispatch: ThunkDispatch<RootState, void, ILogout>): void => {
    authService.logout()

    dispatch({
      type: UsersActionType.LOGOUT,
      data: undefined,
    })
  }
}

const setAuthInProgress = (authInProgress: boolean) => {
  return (dispatch: ThunkDispatch<RootState, void, IAuthInProgress>): void => {
    dispatch({
      type: UsersActionType.AUTH_IN_PROGRESS,
      data: { authInProgress },
    })
  }
}

export { usersReducer, login, logout }
