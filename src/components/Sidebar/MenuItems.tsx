import type { MenuProps } from "antd";
import { BulbOutlined, GlobalOutlined, InboxOutlined, MessageOutlined, OrderedListOutlined, RobotOutlined, UserOutlined } from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export const items: MenuItem[] = [
  getItem("My Profile", "profile", <UserOutlined/>),
   getItem("News Feed", "news", <GlobalOutlined/>),
  getItem("Task Manager", "tasks", <OrderedListOutlined/>),
  getItem("Repository", "repository", <InboxOutlined />),
  getItem("Learn", "learn", <BulbOutlined />),
  getItem("Ai Pal", "ai-pal", <RobotOutlined/>),
  getItem("Help Center", "help-center", <MessageOutlined />),
]
