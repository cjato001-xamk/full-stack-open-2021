import { INotification } from '../interfaces/INotification'

enum NotificationActionType {
  ADD_NOTIFICATION = 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION',
}

interface NotificationState {
  notifications: INotification[]
}

export interface IAddNotification {
  type: NotificationActionType.ADD_NOTIFICATION
  data: { notification: INotification }
}

interface IRemoveNotification {
  type: NotificationActionType.REMOVE_NOTIFICATION
  data: {}
}

type NotificationActionInterfaces = IAddNotification | IRemoveNotification

const initialState: NotificationState = {
  notifications: [],
}

const notificationReducer = (
  state = initialState,
  action: NotificationActionInterfaces
): NotificationState => {
  switch (action.type) {
    case NotificationActionType.ADD_NOTIFICATION: {
      const notificationsAfterAdd = [...state.notifications]
      notificationsAfterAdd.push({
        type: action.data.notification.type || 'success',
        message: action.data.notification.message,
        timeout: action.data.notification.timeout,
      })

      return {
        ...state,
        notifications: notificationsAfterAdd,
      }
    }

    case NotificationActionType.REMOVE_NOTIFICATION: {
      // Simply removes the oldest item from the notifications array
      const notificationsAfterRemove = [...state.notifications]
      notificationsAfterRemove.shift()

      return { ...state, notifications: notificationsAfterRemove || [] }
    }

    default:
      return state
  }
}

const addNotification = (notification: INotification): IAddNotification => {
  return {
    type: NotificationActionType.ADD_NOTIFICATION,
    data: { notification },
  }
}

const removeNotification = (): IRemoveNotification => {
  return { type: NotificationActionType.REMOVE_NOTIFICATION, data: {} }
}

export { notificationReducer, addNotification, removeNotification }
