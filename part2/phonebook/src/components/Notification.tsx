import { useEffect } from 'react'
import { INotification } from '../interfaces/INotification'

type NotificationProps = {
  notification: INotification
  setNotification: React.Dispatch<React.SetStateAction<INotification>>
}

const Notification = ({
  notification,
  setNotification,
}: NotificationProps): JSX.Element => {
  useEffect(() => {
    setTimeout(() => {
      setNotification({ message: '', type: '' })
    }, 4000)
  }, [notification, setNotification])

  return (
    <>
      <p className={notification.type}>{notification.message}</p>
    </>
  )
}

export { Notification }
