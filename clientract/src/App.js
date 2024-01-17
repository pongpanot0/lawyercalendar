import logo from "./logo.svg";
import "./App.css";
import Navbar from "./componenets/navbar/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./componenets/Home";
import Case from "./componenets/Case/Case";

import Steppercase from "./componenets/Case/create-case/Steppercase";
import Customer from "./componenets/Customer/Customer";
import CreateCustomer from "./componenets/Customer/create-customer/CreateCustomer";
import Employee from "./componenets/Employee/Employee";
import CreateEmployee from "./componenets/Employee/create-employee/CreateEmployee";

import Casedetail from "./componenets/Case/Casedetail/Casedetail";
import Expenses from "./componenets/Expenses/Expenses";
import Beforecase from "./componenets/Beforecase/Beforecase";
import Insertbefore from "./componenets/Beforecase/Insertbeforecase/Insertbefore";
import InsertExpenses from "./componenets/Expenses/InsertExpenses/InsertExpenses";
import Testsendline from "./componenets/Setting/SettingLine/Testsendline";
import Notice from "./componenets/InsertNotice/Notice/Notice";
import InsertNotice from "./componenets/InsertNotice/InsertNotice";
import BeforebaseSetting from "./componenets/Beforecase/BeforecaseSetting/BeforebaseSetting";
import { Container, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useState } from "react";
import apiService from "./componenets/Shared/Apiserver";
import Setting from "./componenets/Setting/Setting";
import { lighten } from "polished";
import Loader from "./componenets/Loader/Loader";
import Login from "./componenets/Login/Login";
import BeforeCaseTocase from "./componenets/Beforecase/BeforecaseToCase/BeforeCaseTocase";
function App() {
  const [themeSettings, setthemeSettings] = React.useState([
    {
      settingsusers_primarybutton: "#0062b1",
      settingsusers_primarycolor: "#4d4d4d",
      settingsusers_fontsize: 20,
      settingsusers_fontcolor: "#ffffff",
      settingsusers_fontbuttoncolor: "#ffffff",
      settingsusers_backgroundcolor: "#ffffff",
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  React.useEffect(() => {
    getThemdata();
    const fetchData = async () => {
      try {
        // Your data loading logic here...

        // Simulate a delay of 2 seconds (you can adjust this according to your needs)
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Set isLoading to false to hide the loader
        setIsLoading(false);

        // Check if the user is authenticated (e.g., has a token in localStorage)
        const token = localStorage.getItem("token");
        setIsAuthenticated(token !== null);
      } catch (error) {
        console.error("Error loading data:", error);
        // Handle errors here...
        setIsLoading(false);
      }
    };
    /*     fetchData(); */
  }, []);
  const hover = lighten(0.2, themeSettings[0]?.settingsusers_primarybutton);
  const getThemdata = async () => {
    try {
      const response = await apiService.getsetting(1);

      setthemeSettings(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching setting:", error);
    }
  };
  function LoadData() {
    getThemdata();
  }
  const MuiDataGridOverride = {
    row: ({ theme }) => ({
      backgroundColor: themeSettings[0]?.settingsusers_backgroundcolor,
      color: themeSettings[0]?.settingsusers_fontcolor,
      fontSize: themeSettings[0]?.settingsusers_fontsize,
    }),
    root: ({ theme }) => ({
      backgroundColor: themeSettings[0]?.settingsusers_backgroundcolor,
      color: themeSettings[0]?.settingsusers_fontcolor,
      fontSize: themeSettings[0]?.settingsusers_fontsize,
    }),
    pagination: ({ theme }) => ({
      // Override specific pagination elements
      ".MuiDataGrid-pagination": {
        backgroundColor:
          themeSettings[0]?.settingsusers_pagination_backgroundcolor,
        color: themeSettings[0]?.settingsusers_pagination_fontcolor,
      },
      ".MuiSelect-select": {
        color: themeSettings[0]?.settingsusers_pagination_select_fontcolor,
      },
      ".MuiIconButton-root": {
        color: themeSettings[0]?.settingsusers_pagination_button_color,
      },
    }),
  };
  const MuiDataAccondinOverride = {
    root: ({ theme }) => ({
      backgroundColor: themeSettings[0]?.settingsusers_backgroundcolor,
      color: themeSettings[0]?.settingsusers_fontcolor,
      fontSize: themeSettings[0]?.settingsusers_fontsize,
    }),
  };
  const MuiDataCard = {
    root: ({ theme }) => ({
      backgroundColor: themeSettings[0]?.settingsusers_primarybutton,
      color: themeSettings[0]?.settingsusers_fontbuttoncolor,
      fontSize: themeSettings[0]?.settingsusers_fontsize,
    }),
  };
  const theme = createTheme({
    components: {
      MuiCardMedia: {
        styleOverrides: MuiDataCard,
      },
      MuiCardContent: {
        styleOverrides: MuiDataCard,
      },
      MuiDataGrid: {
        styleOverrides: MuiDataGridOverride,
      },
      MuiAccordion: {
        styleOverrides: MuiDataAccondinOverride,
      },
      MuiPaper: {
        styleOverrides: MuiDataAccondinOverride,
      },
      MuiCard: {
        styleOverrides: MuiDataCard,
      },
      MuiPagination: {
        styleOverrides: MuiDataAccondinOverride,
      },
      MuiSelect: {
        styleOverrides: MuiDataAccondinOverride,
      },
      MuiBottomNavigation: {
        styleOverrides: MuiDataAccondinOverride,
      },
      MuiTablePagination: {
        styleOverrides: MuiDataGridOverride,
      },
    },
    palette: {
      primary: {
        main: themeSettings[0]?.settingsusers_primarybutton,
        contrastText: themeSettings[0]?.settingsusers_fontbuttoncolor, //button text white instead of black
      },
      background: {
        default: themeSettings[0]?.settingsusers_backgroundcolor,
        paper: themeSettings[0]?.settingsusers_primarybutton,
      },
    },

    typography: {
      fontSize: themeSettings[0]?.settingsusers_fontsize,
      body1: {
        color: themeSettings[0]?.settingsusers_fontcolor,
      },
    },
    overrides: {
      MuiButton: {
        root: {
          backgroundColor: themeSettings[0]?.settingsusers_primarybutton,
          transition: "background-color 0.3s ease",
          fontSize: themeSettings[0]?.settingsusers_fontsize, // Font size for buttons
          color: themeSettings[0]?.settingsusers_fontbuttoncolor, // Font color for buttons
          "&:hover": {
            backgroundColor: hover,
          },
        },
      },
      Muicard: {
        root: {
          backgroundColor: themeSettings[0]?.settingsusers_primarybutton,
          transition: "background-color 0.3s ease",
          fontSize: themeSettings[0]?.settingsusers_fontsize, // Font size for buttons
          color: themeSettings[0]?.settingsusers_fontbuttoncolor, // Font color for buttons
          "&:hover": {
            backgroundColor: hover,
          },
        },
      },
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar
          navbarColor={themeSettings[0]?.settingsusers_primarycolor}
          loaddata={LoadData}
        >
          <div style={{ marginTop: 20 }}>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/case" element={<Case />} />
              <Route path="/Customer" element={<Customer />} />
              <Route path="/case-create" element={<Steppercase />} />
              <Route path="/customer-create" element={<CreateCustomer />} />
              <Route path="/employee" element={<Employee />} />
              <Route path="/employee-create" element={<CreateEmployee />} />
              <Route
                path="/setting"
                element={<Setting loaddata={LoadData} />}
              />
              <Route path="/casedetail/:id" element={<Casedetail />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/beforecase" element={<Beforecase />} />
              <Route path="/beforecasetocase" element={<BeforeCaseTocase />} />
              <Route
                path="/beforecase-setting/:id"
                element={<BeforebaseSetting />}
              />
              <Route path="/beforecase-create" element={<Insertbefore />} />
              <Route path="/expenses-create" element={<InsertExpenses />} />
              <Route path="/testsendline" element={<Testsendline />} />
              <Route path="/notice" element={<Notice />} />
              <Route path="/insert-notice" element={<InsertNotice />} />
            </Routes>
          </div>
        </Navbar>
        {/*    <Routes>
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login />}
          />
        </Routes>
        {isAuthenticated ? (
          // Render your content when isLoading is false and the user is authenticated
          <Navbar
            navbarColor={themeSettings[0]?.settingsusers_primarycolor}
            loaddata={LoadData}
          />
        ) : (
          // Redirect to login if the user is not authenticated
          <Navigate to="/login" />
        )} */}

        {/*   <Navbar
          navbarColor={themeSettings[0]?.settingsusers_primarycolor}
          loaddata={LoadData}
        /> */}
      </ThemeProvider>
    </div>
  );
}

export default App;