"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import styles from "./Sidebar.module.css";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useRouter } from "next/navigation";
import sidebarData from "./sidebarData";


const SidebarComponent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <main>
      <div className={styles.sidebarWrapper}>
        <Sidebar
          className={styles.sidebar}
          width="200px"
          collapsed={collapsed}
          collapsedWidth="80px"
          transitionDuration={300}
        >
          <div className={styles.sidebarHeader}>
            <Menu>
              <MenuItem
                className={styles.hamburgerMenu}
                icon={<MenuRoundedIcon />}
                onClick={toggleSidebar}
              />
            </Menu>
          </div>

          <Menu>
            {sidebarData?.map((item, index) => (
              <React.Fragment key={index}>
                {item.href ? (
                  <Link href={item.href} className={styles.link}>
                    <MenuItem icon={item.icon} className={styles.menuItem}>
                      {item.label}
                    </MenuItem>
                  </Link>
                ) : (
                  <SubMenu
                    label={item.label}
                    icon={item.icon}
                    className={styles.menuItem}
                  >
                    {item.subItems?.map((subItem, subIndex) => (
                      
                      <MenuItem
                        key={subIndex}
                        icon={subItem.icon}
                        className={styles.subMenuItem}
                        onClick={() => {
                          router.push(subItem.href);
                        }}
                      >
                        {subItem.label}
                      </MenuItem>
                    ))}
                  </SubMenu>
                )}
              </React.Fragment>
            ))}
          </Menu>

          <Menu>
            <MenuItem
              icon={<ExitToAppIcon />}
              className={styles.LogOutmenuItem}
              //when clicked, log out the user
              onClick={() => {
                document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
                router.push("/auth/login");
              }}
            >
              Log out
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </main>
  );
};

export default SidebarComponent;
