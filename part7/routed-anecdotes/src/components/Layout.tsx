import { Menu } from './Menu'
import { Notification } from './Notification'
import { Footer } from './Footer'

type LayoutProps = {
  children: React.ReactNode
  notification?: string
}

const Layout = ({ children, notification }: LayoutProps) => {
  return (
    <>
      <Menu />
      {notification && <Notification notification={notification} />}
      {children}
      <Footer />
    </>
  )
}

export { Layout }
