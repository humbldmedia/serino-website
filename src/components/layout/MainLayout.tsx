import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'

/** Wraps the main marketing site with the global nav + footer. */
export default function MainLayout() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  )
}
