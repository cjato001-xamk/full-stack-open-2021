import { Menu } from './Menu'
import { Footer } from './Footer'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Menu />
      {children}
      <Footer />
    </>
  )
}

export { Layout }
