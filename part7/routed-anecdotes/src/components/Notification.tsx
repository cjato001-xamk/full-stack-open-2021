type NotificationProps = {
  notification: string
}

const Notification = ({ notification }: NotificationProps) => {
  return <p>{notification}</p>
}

export { Notification }
