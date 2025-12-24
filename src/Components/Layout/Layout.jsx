import React from 'react'
import SideNav from '../SideNav/SideNav'
import Footer from '../Footer/Footer'
import {Outlet} from 'react-router-dom'

export default function Layout() {
  return <>
  <div className="flex min-h-screen bg-[#F4F2EE]">
  
      <SideNav />

    
      <div className="flex flex-col flex-1">
      
        <main className="flex-grow">
          <Outlet />
        </main>

      
        <Footer />
      </div>
    </div>
  
  
  
  
  </>
}
