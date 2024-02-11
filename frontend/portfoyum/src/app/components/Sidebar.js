"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import styles from "./Sidebar.module.css";

import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AssessmentIcon from "@mui/icons-material/Assessment";
import WorkIcon from "@mui/icons-material/Work";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const SidebarComponent = () => {
  const [collapsed, setCollapsed] = useState(false);

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
            <Link href="/dashboard" className={styles.link}>
              <MenuItem icon={<HomeIcon />} className={styles.menuItem}>
                Dashboard
              </MenuItem>
            </Link>
            <SubMenu
              label="Reports"
              icon={<DashboardIcon />}
              className={styles.menuItem}
            >
              <MenuItem
                icon={<AssessmentIcon />}
                className={styles.subMenuItem}
              >
                Overview
              </MenuItem>
              <MenuItem
                icon={<AssessmentIcon />}
                className={styles.subMenuItem}
              >
                Detailed Reports
              </MenuItem>
            </SubMenu>

            <Link href="/projects" className={styles.link}>
              <MenuItem icon={<WorkIcon />} className={styles.menuItem}>
                Projects
              </MenuItem>
            </Link>
            <MenuItem icon={<WorkIcon />} className={styles.menuItem}>
              Tasks
            </MenuItem>

            <SubMenu
              label="Settings"
              icon={<SettingsIcon />}
              className={styles.menuItem}
            >
              <MenuItem icon={<SettingsIcon />} className={styles.subMenuItem}>
                <div className="flex items-center">
                  <span>General</span>
                </div>
              </MenuItem>
              <MenuItem
                icon={<AccountCircleIcon />}
                className={styles.subMenuItem}
              >
                <div className="flex items-center">
                  <span>Profile</span>
                </div>
              </MenuItem>
            </SubMenu>

            <MenuItem
              icon={<ExitToAppIcon />}
              className={styles.LogOutmenuItem}
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
