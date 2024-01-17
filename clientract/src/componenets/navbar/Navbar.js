/* import React, { useState } from "react";

import { Link } from "react-router-dom";
import { SidebarData } from "./Sidebardata";
import "./Navbar.css";

import { Box, Container, Grid } from "@mui/material";
import Drawer from "@mui/material/Drawer";

import Toolbar from "@mui/material/Toolbar";
import { lighten } from "polished";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../Home";
import Case from "../Case/Case";

import Steppercase from "../Case/create-case/Steppercase";
import Customer from "../Customer/Customer";
import CreateCustomer from "../Customer/create-customer/CreateCustomer";
import Employee from "../Employee/Employee";
import CreateEmployee from "../Employee/create-employee/CreateEmployee";
import Setting from "../Setting/Setting";
import Casedetail from "../Case/Casedetail/Casedetail";
import Expenses from "../Expenses/Expenses";
import Beforecase from "../Beforecase/Beforecase";
import Insertbefore from "../Beforecase/Insertbeforecase/Insertbefore";
import InsertExpenses from "../Expenses/InsertExpenses/InsertExpenses";
import Testsendline from "../Setting/SettingLine/Testsendline";
import Notice from "../InsertNotice/Notice/Notice";
import InsertNotice from "../InsertNotice/InsertNotice";
import BeforebaseSetting from "../Beforecase/BeforecaseSetting/BeforebaseSetting";
function Navbar({ navbarColor, loaddata }) {
  const drawerWidth = 240;
  const [sidebar, setSidebar] = useState(true);

  const showSidebar = () => setSidebar(!sidebar);
  const hover = lighten(0.2, navbarColor);

  return (
    <>
      <style>
        {`
      .nav-text a:hover {
        background-color: ${hover};
      }`}
      </style>
      <Box sx={{ display: "flex" }}>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />

          <nav
            className="nav-menu active"
            style={{ backgroundColor: navbarColor }}
          >
            <ul className="nav-menu-items" onClick={showSidebar}>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </Drawer>

        <Container maxWidth="xl" sx={{ flexGrow: 1, p: 3 }}>
          
        </Container>
      </Box>
    </>
  );
}

export default Navbar;
 */

import React, { useState } from "react";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
} from "react-icons/fa";
import { lighten } from "polished";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
const Navbar = ({ children, navbarColor, loaddata }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const hover = lighten(0.2, navbarColor);
  const menuItem = [
    {
      title: "Home",
      path: "/",
      icon: <AiIcons.AiFillHome />,
      cName: "nav-text",
    },
    {
      title: "BeforeCase",
      path: "/beforecase",
      icon: <IoIcons.IoIosPaper />,
      cName: "nav-text",
    },
    {
      title: "Case",
      path: "/case",
      icon: <IoIcons.IoIosPaper />,
      cName: "nav-text",
    },
    {
      title: "Customer",
      path: "/Customer",
      icon: <FaIcons.FaCartPlus />,
      cName: "nav-text",
    },
    {
      title: "Expenses",
      path: "/expenses",
      icon: <IoIcons.IoMdPeople />,
      cName: "nav-text",
    },
    {
      title: "Notice",
      path: "/notice",
      icon: <IoIcons.IoMdPeople />,
      cName: "nav-text",
    },

    {
      title: "Setting",
      path: "/setting",
      icon: <FaIcons.FaEnvelopeOpenText />,
      cName: "nav-text",
    },
    {
      title: "Support",
      path: "/support",
      icon: <IoIcons.IoMdHelpCircle />,
      cName: "nav-text",
    },
  ];
  return (
    <div className="container">
      <style>
        {`
      .nav-text a:hover {
        background-color: ${hover};
      }.link:hover{
        background-color: ${hover};
      }
      .active{
        background-color: ${hover};
      }
      
      `}
      </style>
      <div
        style={{
          width: isOpen ? "200px" : "50px",
          backgroundColor: navbarColor,
        }}
        className="sidebar"
      >
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Lawyer
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" ,cursor:'pointer'}} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.title}
            </div>
          </NavLink>
        ))}
      </div>
      <main className="scrollable-content">{children}</main>
    </div>
  );
};

export default Navbar;
