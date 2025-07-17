import Sider from "antd/es/layout/Sider";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import useWindowSize from "../../hooks/useWindowSize";
import logo from "../../assets/logo.png";
import { Menu } from "antd";
import { items } from "./MenuItems";
import { AvatarFallback, AvatarImage,Avatar } from "../UI/Avtar";
import { useAuthStore } from "../../store/useAuthStore";

interface SidebarProps {
  collapsed: boolean;
  toggle: () => void;
}

const SideBar: React.FC<SidebarProps> = ({collapsed }) => {
    const { user } = useAuthStore();
    const navigate = useNavigate();
  const { width } = useWindowSize();
  const path = useLocation().pathname;

  const getDefaultOpenKeys = () => {
    return [];
  };

  const logoutHandler = async () => {

  };

    return (
        <div className="h-[100vh] overflow-hidden relative sidebar border-r border-gray-200">
            <Sider
                trigger={null}
                collapsible
                
                width={250}
                collapsed={width < 768 ? false : collapsed}
                collapsedWidth={width < 768 ? 0 : 80}
                className="side-bar"
                style={{
                    backgroundColor: "white",
                    position: width < 768 ? "fixed" : "relative",
                    zIndex: 99,
                }}
            >
                <div className="logo rounded-lg flex flex-row py-4 gap-2 justify-center items-center">
                    <div
                        className="flex justify-center items-center bg-gradient-primary rounded-lg w-[45px] h-[45px]"
                    >
                        <img
                            src={logo || "/placeholder.svg"}
                            alt="logo"
                            className="h-[35px] rounded-lg m-auto"
                        />
                    </div>
                    <h2 className="company font-bold text-gradient-primary">IRIS</h2>
                </div>
                <Menu
                style={{
                    backgroundColor: "white",
                    overflowY: "auto",
                    height: "calc(88vh - 10vh)",
                    paddingTop: "20px",
                }}
                defaultOpenKeys={getDefaultOpenKeys()}
                className="menu-main"
                defaultSelectedKeys={[path.split("/")[1] || "profile"]}
                mode="inline"
                items={
                  items
                }
                onSelect={(item) => {
                    const path = item?.keyPath;
                    if (item?.keyPath[1]) {
                    navigate(`/${path[1]}/${path[0]}`);
                    } else if (item?.keyPath[0]) {
                    if (path[0] === "logout") {
                        logoutHandler();
                    } else {
                        navigate(`/${path[0]}`);
                    }
                    }
                }}
                />
                <button
                    className="toggle-container border-t border-gray-300"
                    style={{
                        bottom: "0px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height:"10vh"
                    }}
                    >
                    <div className="flex justify-center items-center gap-2">
                        <Avatar>
                            <AvatarImage src={
                                user?.profileImg || "/placeholder.svg"
                            } />
                            <AvatarFallback>
                                <span className="text-sm">U</span>
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-base">@{user?.username?.replace(' ','') || "Guest"}</p>
                        </div>
                    </div>

                </button>
            </Sider>
    </div>
    );
}

export default SideBar;