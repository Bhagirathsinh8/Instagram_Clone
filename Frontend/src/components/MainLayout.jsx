import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftSidebar from './LeftSidebar'

function MainLayout() {
  return (
    <div>
      {/* SideBar  */}
      <LeftSidebar/>

    {/* Render all Children of route and parent is mainLayout */}
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default MainLayout
