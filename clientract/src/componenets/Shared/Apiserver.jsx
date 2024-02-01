// apiService.js
import axios from "axios";

/* https://mcon-oil.mconcrete.co.th/api_lawyer */

const baseURL = "https://mcon-oil.mconcrete.co.th/api_lawyer"; // Replace with your API base URL
const token = localStorage.getItem('token')
const axiosInstance = axios.create({
  baseURL,
  timeout: 5000, // Adjust timeout as needed
  headers: {
    "Content-Type": "application/json",
    "token":token
    // Add any other common headers here
  },
});

const apiService = {
  // Example API function
 
  
  async getDashboards(code,state) {
    try {
      const response = await axiosInstance.post("/dashboard/get");
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  async createLine(code,state) {
    try {
      const response = await axiosInstance.post("/line/create", {
        code,
        state,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  async getProfile(data) {
    try {
      const response = await axiosInstance.post("/get/profile", {
        data,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  async updateBeforecase(data) {
    try {
      const response = await axiosInstance.post("/beforecase/update", {
        data,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  async CreateBeforeCaseToCase(data) {
    try {
      const response = await axiosInstance.post("/BeforeCaseTocase/create", {
        data,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  async CreateBeforeCasecreateClose(data) {
    try {
      const response = await axiosInstance.post("/beforecasedocuments/createClose", {
        data,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  async CreateBeforeUpdatecase(data) {
    try {
      const response = await axiosInstance.post("/beforecasedocuments/updateOpenBeforecase", {
        data,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  
  async CreateCase(data) {
    try {
      const response = await axiosInstance.post("/case/create", { data });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  async getCase(data) {
    try {
      const response = await axiosInstance.post("/case/get");
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  async exportExcelCase(data) {
    try {
      const response = await axiosInstance.post("/exportExcelCase",{data});
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  async exportExcelExpenses(data) {
    try {
      const response = await axiosInstance.post("/excel/export",{data});
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  
  async createCloseDetail(data) {
    try {
      const response = await axiosInstance.post("/case/createClose", { data });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  async updateOpencase(data) {
    try {
      const response = await axiosInstance.post("/case/open", { data });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  
  async getCaseByid(data) {
    try {
      const response = await axiosInstance.post("/caseByid/get", { data });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },

  async createbeforecasedocuments(data) {
    try {
      const response = await axiosInstance.post("/beforecasedocuments/create", {
        data,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  async getbeforecasedocuments(data) {
    try {
      const response = await axiosInstance.get("/beforecasedocuments/get");
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  async getbeforecaseDocumentsbyID(data) {
    try {
      const response = await axiosInstance.post(
        "/beforecaseDocumentsbyID/get",
        {
          data,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },

  //caseType
  async CreateCaseType(data) {
    try {
      const response = await axiosInstance.post("/casetype/create", { data });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  async GetCaseType(data) {
    try {
      const response = await axiosInstance.get("/casetype/get");
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  //customerType
  async CreateCustomerType(data) {
    try {
      console.log(data);
      const response = await axiosInstance.post("/customertype/create", {
        data,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  async getCustomerType(data) {
    try {
      const response = await axiosInstance.get("/customertype/get");
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  // Employeejob

  async createEmployeejob(data) {
    try {
      const response = await axiosInstance.post("/employeejob/create", {
        data,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  async getEmployeejob(data) {
    try {
      const response = await axiosInstance.get("/employeejob/get");
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },

  //beforecase
  async createbeforecase(data) {
    try {
      const response = await axiosInstance.post("/beforecase/create", {
        data,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  async getbeforecase() {
    try {
      const response = await axiosInstance.get("/beforecase/get");
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },

  async createsetting(data) {
    try {
      const response = await axiosInstance.post("/setting/create", { data });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  async getsetting(data) {
    try {
      const response = await axiosInstance.post("/setting/get", { data });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },

  async createcustomer(data) {
    try {
      const response = await axiosInstance.post("/customer/create", { data });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  
  async gettsbref(data) {
    try {
      const response = await axiosInstance.get("/tsbref/get");
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  async getcustomer(data) {
    try {
      const response = await axiosInstance.get("/customer/get");
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  
  async customerresponsesAll(data) {
    try {
      const response = await axiosInstance.post("/customerresponses/get/all",{
        data
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  async customerresponses(data) {
    try {
      const response = await axiosInstance.post("/customerresponses/get",{
        data
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  
  //courts
  async getcourts(data) {
    try {
      const response = await axiosInstance.get("/courts/get");
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },

  //createemployees
  async createEmployee(data) {
    try {
      const response = await axiosInstance.post("/employee/create", { data });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  async getEmployee(data) {
    try {
      const response = await axiosInstance.get("/employee/get", { data });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },

  //role
  async getRole(data) {
    try {
      const response = await axiosInstance.get("/role/get");
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },

  //employeescaseType
  async createEmployeecaseType(data) {
    try {
      const response = await axiosInstance.post("/employeecasetype/create", {
        data,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  async getEmployeecaseType(data) {
    try {
      const response = await axiosInstance.get("/employeecasetype/get");
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },

  
  async creatcaseeExpantime(data) {
    try {
      const response = await axiosInstance.post("/Expantime/create", {
        data,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  async getcaseeExpantime(data) {
    try {
      const response = await axiosInstance.post("/Expantime/get", {
        data,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  
  async creatcaseeexpenses(data) {
    try {
      const response = await axiosInstance.post("/caseexpenses/create", {
        data,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  async getcaseexpenses(data) {
    try {
      const response = await axiosInstance.post("/caseexpenses/get", {
        data,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },

  //notice
  
  async createnotice(data) {
    try {
      const response = await axiosInstance.post("/notice/create", {
        data,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  async createwaitnotice(data) {
    try {
      const response = await axiosInstance.post("/noticewait/create", {
        data,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },

  
  async getNotice(data) {
    try {
      const response = await axiosInstance.get("/notice/get", {
        data,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  async getNoticeByDocumentID(data) {
    try {
      const response = await axiosInstance.post("/noticeBydocID/get", {
        data,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  //expensestype
  async createexpensesType(data) {
    try {
      const response = await axiosInstance.post("/expenses/create", {
        data,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  async getexpensesType(data) {
    try {
      const response = await axiosInstance.get("/expenses/get");
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },

  //insuredtype
  async createinsuredtype(data) {
    try {
      const response = await axiosInstance.post("/insurancedtype/create", {
        data,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  async getinsuredtype(data) {
    try {
      const response = await axiosInstance.get("/insurancedtype/get");
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },

  //timelimetype
  async createtimelimetype(data) {
    try {
      const response = await axiosInstance.post("/timelinetype/create", {
        data,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  async gettimelimetype(data) {
    try {
      const response = await axiosInstance.get("/timelinetype/get");
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },

  //caseTimeline
  async createcaseTimeline(data) {
    try {
      const response = await axiosInstance.post("/casetimeline/create", {
        data,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  async getcaseTimeline(data) {
    try {
      const response = await axiosInstance.post("/casetimeline/get", {
        data,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },

  async Createtask(data) {
    try {
      const response = await axiosInstance.post("/task/create", {
        data,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  async gettask(data) {
    try {
      const response = await axiosInstance.post("/task/get", {
        data,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  async updateTask(data) {
    try {
      const response = await axiosInstance.post("/task/update", {
        data,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  


async signin(username,password,employee_id) {
  try {
    const response = await axiosInstance.post("/register", {
      employee_username:username,
      employee_password:password,
      employee_id:employee_id
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
},
  async login(username,password) {
    try {
      const response = await axiosInstance.post("/login", {
        username:username,
        password:password
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  

};

export default apiService;
