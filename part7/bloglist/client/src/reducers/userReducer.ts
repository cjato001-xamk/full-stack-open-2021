import { ThunkDispatch } from 'redux-thunk'

import { IUser } from '../interfaces/IUser'
import { authService } from '../services/auth'
import { userService } from '../services/users'
import { RootState } from '../store'
import { addNotification, IAddNotification } from './notificationReducer'

enum UsersActionType {
  LOGIN = 'LOGIN',
  AUTH_IN_PROGRESS = 'AUTH_IN_PROGRESS',
  LOGOUT = 'LOGOUT',
  INIT_USERS = 'INIT_USERS',
  LOADING_USERS = 'LOADING_USERS',
}

interface UsersState {
  users: IUser[]
  loading: boolean
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

interface ILoadingUsers {
  type: UsersActionType.LOADING_USERS
  data: boolean
}

interface IInitializeUsers {
  type: UsersActionType.INIT_USERS
  data: IUser[]
}

type UsersActionInterfaces =
  | ILogin
  | ILogout
  | IAuthInProgress
  | ILoadingUsers
  | IInitializeUsers

const initialState: UsersState = {
  users: [],
  loading: false,
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

    case UsersActionType.LOADING_USERS:
      return {
        ...state,
        loading: action.data,
      }

    case UsersActionType.INIT_USERS:
      return {
        ...state,
        users: action.data,
      }

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

        authService.setUser(user)

        return
      }

      if (username && password) {
        const userFromServer = await authService.login({
          username,
          password,
        })

        if (userFromServer.data.data) {
          user = userFromServer.data.data

          dispatch({
            type: UsersActionType.LOGIN,
            data: userFromServer.data.data,
          })

          authService.setUser(user)
        }
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

const setLoadingUsers = (loading: boolean) => {
  return (dispatch: ThunkDispatch<RootState, void, ILoadingUsers>): void => {
    dispatch({
      type: UsersActionType.LOADING_USERS,
      data: loading,
    })
  }
}

const initializeUsers = () => {
  return async (
    dispatch: ThunkDispatch<
      RootState,
      void,
      IInitializeUsers | IAddNotification
    >
  ): Promise<void> => {
    dispatch(setLoadingUsers(true))

    try {
      const users = await userService.getAll()
      dispatch({
        type: UsersActionType.INIT_USERS,
        data: users.data?.data || [],
      })
    } catch (error: any) {
      dispatch(
        addNotification({
          message:
            error?.response?.data?.error?.message || 'Failed to fetch users.',
          type: 'error',
        })
      )
    }

    dispatch(setLoadingUsers(false))
  }
}

export { usersReducer, login, logout, initializeUsers }
