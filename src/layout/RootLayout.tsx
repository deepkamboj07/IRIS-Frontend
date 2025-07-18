import React, { useEffect } from "react"
import { Layout } from "antd"
import SideBar from "../components/Sidebar/SideBar"
import useWindowSize from "../hooks/useWindowSize"
import { Content } from "antd/es/layout/layout"
import { Outlet, useLocation } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"
import { useUIStore } from "../store/useUIStore"

export const RootLayout = () => {

    const location = useLocation();
    const { width } = useWindowSize()
    const { openModal } = useUIStore();
    const collapsedCalculator = () => {
        if (width > 768) return false
        else return true
    }
  const [collapsed, setCollapsed] = React.useState(collapsedCalculator())
  
  const toggle = () => {
    setCollapsed(!collapsed)
  }

  const handleCreateClick = () => {
    if (location.pathname.includes('/profile')) {
        openModal('post')
    } else if (location.pathname.split('/').at(-1) === 'tasks') {
        openModal('project')
    } else if (location.pathname.split('/').at(-1) === 'projectTasks') {
        openModal('task')
    } else {
        openModal(null)
    }
    }


  useEffect(() => {
    console.log("Location:", location);
  }, [])


    return (
      <Layout style={{ height: "100vh", position: "relative", overflow: "hidden" }}>
        <div className="flex">
            <SideBar collapsed={collapsed} toggle={toggle} />
        </div>
        {collapsed || width > 768 ? null : (
            <button onClick={() => setCollapsed(!collapsed)} className="fixed inset-0 bg-black opacity-50 z-[8]"></button>
        )}
        <Layout className="site-layout h-full overflow-hidden">
            <Navbar collapsed={collapsed} toggle={toggle} 
                    onClickOnCreate={handleCreateClick}
                />
            <Content
                className="overflow-auto bg-[#F7FBFD] h-[90vh]"
                style={{
                    minHeight: 280,
                }}
            >
                <Outlet />
            </Content>
        </Layout>
    </Layout>
    )
}