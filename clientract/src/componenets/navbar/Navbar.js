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
import { FaRegCirclePlay } from "react-icons/fa6";

import { lighten } from "polished";
import { FaRightFromBracket } from "react-icons/fa6";
import { FaFolderOpen } from "react-icons/fa6";

import { NavLink } from "react-router-dom";
import "./Navbar.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { FaRegAddressBook } from "react-icons/fa6";
import { FaMoneyBill } from "react-icons/fa6";
import { FaGears } from "react-icons/fa6";

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
      icon: <FaFolderOpen />,
      cName: "nav-text",
    },
    {
      title: "Notice",
      path: "/notice",
      icon: <FaRegCirclePlay />,
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
      icon: <FaIcons.FaRegAddressBook />,
      cName: "nav-text",
    },
    {
      title: "Expenses",
      path: "/expenses",
      icon: <FaMoneyBill />,
      cName: "nav-text",
    },

    {
      title: "Setting",
      path: "/setting",
      icon: <FaGears />,
      cName: "nav-text",
    },
   /*  {
      title: "Support",
      path: "/support",
      icon: <IoIcons.IoMdHelpCircle />,
      cName: "nav-text",
    }, */
    {
      title: "Logout",
      path: "/Logout",
      icon: <FaRightFromBracket />,
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
          <div
            style={{ marginLeft: isOpen ? "50px" : "0px", cursor: "pointer" }}
            className="bars"
          >
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
