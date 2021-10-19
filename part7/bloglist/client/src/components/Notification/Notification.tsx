import { useEffect } from 'react'

import { INotification } from '../../interfaces/INotification'

type NotificationProps = {
  notification: INotification
  setNotification: React.Dispatch<React.SetStateAction<INotification>>
}

const Notification = ({
  notification,
  setNotification,
}: NotificationProps): JSX.Element => {
  useEffect(() => {
    let timer: NodeJS.Timeout

    if (notification.message) {
      timer = setTimeout(() => {
        setNotification({ message: '', type: '' })
      }, 5000)
    }

    return (): void => {
      clearTimeout(timer)
    }
  }, [notification, setNotification])

  return (
    <>
      <p className={notification.type}>{notification.message}</p>
    </>
  )
}

export { Notification }
