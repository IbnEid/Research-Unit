import { useState } from "react";
import { BringToFront, Search } from "lucide-react";

function App() {
  const [searchComment, setSearchComment] = useState("");
  const [readOnly, setReadOnly] = useState(true);
  const [caseDataForm, setCaseDataForm] = useState({
    Case_Head_Name: "",
    Case_Head_SSN: "",
    Case_District: "",
    Emp_ID: "",
    Rsh_Manager_Evaluation: "",
    Rsh_Employee_Evaluation: "",
    Rsh_Latest_Date: "",
    Rsh_Accepted_Support: "",
  });
  const handleCaseDataForm = (e) => {
    setCaseDataForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const [ssnSearch, setSsnSearch] = useState({ ssn: null });
  const handleSsnSearch = (e) => {
    setSsnSearch({ ssn: e.target.value });
  };
  const handleSearchBtnClick = async () => {
    // console.log(ssnSearch);
    try {
      const response = await fetch("http://localhost:3000/read", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ssnSearch),
      });

      const data = await response.json();
      setCurrentCaseData({
        getCase_Head_Name: data.Case_head_name,
        getCase_Head_SSN: data.Case_head_ssn,
        getCase_District: data.Case_district,
        getEmployee_ID: data.Emp_id,
        getMgn_eval: data.Rsh_manager_evaluation,
        getEmp_eval: data.Rsh_employee_evaluation,
        getLstDate: data.Rsh_latest_date,
        getAcceptedSup: data.Rsh_accepted_support,
      });
      console.log(data);

      if (isSearched === false) {
        setIsSearched(true);
      }
      // alert("Case Created Successfully ✅");
      setSearchComment("");
    } catch (error) {
      console.error(error);
      setSearchComment("SSN is not exist ❌");
    }
  };
  const readOnlyHandle = () => {
    setReadOnly(!readOnly);
  };
  const handleDeleteBtn = async () => {
    if (!currentCaseData.getCase_Head_SSN) {
      alert("SSN is required to delete ❌");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ssn: currentCaseData.getCase_Head_SSN,
        }),
      });

      setIsSearched(false);
      const data = await response.json();
      console.log(data);

      alert("Case Deleted Successfully 🗑️");

      setCurrentCaseData({
        getCase_Head_Name: "",
        getCase_Head_SSN: "",
        getCase_District: "",
        getEmployee_ID: "",
        getMgn_eval: "",
        getEmp_eval: "",
        getLstDate: "",
        getAcceptedSup: "",
      });
      setReadOnly(true);
    } catch (error) {
      console.error(error);
      alert("Error while deleting case ❌");
    }
  };
  const handleUpdateBtn = async () => {
    try {
      const response = await fetch("http://localhost:3000/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentCaseData),
      });

      const data = await response.json();
      console.log(data);

      alert("Case Updated Successfully ✅");
      setReadOnly(!readOnly);
    } catch (error) {
      console.error(error);
      alert("Error while updating  case ❌");
    }
  };
  const [currentCaseData, setCurrentCaseData] = useState({
    getCase_Head_Name: "",
    getCase_Head_SSN: "",
    getCase_District: "",
    getEmployee_ID: "",
    getMgn_eval: "",
    getEmp_eval: "",
    getLstDate: "",
    getAcceptedSup: "",
  });
  const handleCurrentCaseData = (e) => {
    setCurrentCaseData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSubmitCaseData = async (e) => {
    e.preventDefault();
    // console.log(caseDataForm);
    try {
      const response = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(caseDataForm),
      });

      const data = await response.json();
      console.log(data);

      alert("Case Created Successfully ✅");
    } catch (error) {
      console.error(error);
      alert("Error while creating case ❌");
    }
  };
  const [isSearched, setIsSearched] = useState(false);
  return (
    <>
      <div
        id="HomeCRUD"
        className="w-full h-fit flex flex-col justify-start items-center text-[#16354E]"
      >
        <div
          id="greetingLayout"
          className="flex flex-col justify-start items-center w-full gap-2.5"
        >
          <h1 className="text-center text-[32px]">Research Unit</h1>
          <img className="w-[300px] h-[300px]" src="/logo-of-unit.png" alt="" />
        </div>

        <form
          id="addOperationLayout"
          className="flex flex-col justify-start items-center w-full h-fit p-[10px]"
          onSubmit={(e) => {
            handleSubmitCaseData(e);
          }}
        >
          <h1 className="text-[26px]  text-[#66BC45]">
            Case Registration Form
          </h1>

          <div
            id="LabelsHolderLayout"
            className=" w-full h-fit rounded-[4px] flex flex-col justify-start items-center mt-[10px] pt-[10px] pb-[10px] md:px-[10px] mb-[10px]"
          >
            <label
              htmlFor="Case_Head_Name"
              className="flex w-[300px] md:w-full  justify-between items-center"
            >
              <span className="w-[50%] text-[16px]">Case Head Name</span>
              <input
                type="text"
                id="Case_Head_Name"
                className="border w-[50%] h-[40px] border-gray-400 outline-0 pl-[10px] rounded-[2px] border-none text-[#16344E]"
                placeholder="Enter Case Name"
                value={caseDataForm.Case_Head_Name}
                onChange={(e) => {
                  handleCaseDataForm(e);
                }}
                name="Case_Head_Name"
              />
            </label>
            <label
              htmlFor="Case_Head_SSN"
              className="flex w-[300px] md:w-full  justify-between items-center"
            >
              <span className="w-[50%] text-[16px]">Case Head SSN</span>
              <input
                type="text"
                id="Case_Head_SSN"
                className="border w-[50%] h-[40px] border-gray-400 outline-0 pl-[10px] rounded-[2px] border-none text-[#16344E]"
                placeholder="Enter Case SSN"
                value={caseDataForm.Case_Head_SSN}
                onChange={(e) => {
                  handleCaseDataForm(e);
                }}
                name="Case_Head_SSN"
              />
            </label>
            <label
              htmlFor="Case_District"
              className="flex w-[300px] md:w-full  justify-between items-center"
            >
              <span className="w-[50%] text-[16px]">Case District</span>
              <input
                type="text"
                id="Case_District"
                className="border w-[50%] h-[40px] border-gray-400 outline-0 pl-[10px] rounded-[2px] border-none text-[#16344E]"
                placeholder="Enter Case District"
                value={caseDataForm.Case_District}
                onChange={(e) => {
                  handleCaseDataForm(e);
                }}
                name="Case_District"
              />
            </label>
            <label
              htmlFor="Emp_ID"
              className="flex w-[300px] md:w-full  justify-between items-center"
            >
              <span className="w-[50%] text-[16px]">Employee ID</span>
              <input
                type="text"
                id="Emp_ID"
                name="Emp_ID"
                className="border w-[50%] h-[40px] border-gray-400 outline-0 pl-[10px] rounded-[2px] border-none text-[#16344E]"
                placeholder="Enter Employee ID"
                value={caseDataForm.Emp_ID}
                onChange={(e) => {
                  handleCaseDataForm(e);
                }}
                name="Emp_ID"
              />
            </label>
            <label
              htmlFor="Rsh_Manager_Evaluation"
              className="flex w-[300px] md:w-full  justify-between items-center"
            >
              <span className="w-[50%] text-[16px]">Manager Evaluation</span>
              <input
                type="text"
                id="Rsh_Manager_Evaluation"
                name="Rsh_Manager_Evaluation"
                className="border w-[50%] h-[40px] border-gray-400 outline-0 pl-[10px] rounded-[2px] border-none text-[#16344E]"
                placeholder="Enter Manager Evaluation"
                value={caseDataForm.Rsh_Manager_Evaluation}
                name="Rsh_Manager_Evaluation"
                onChange={(e) => {
                  handleCaseDataForm(e);
                }}
              />
            </label>
            <label
              htmlFor="Rsh_Employee_Evaluation"
              className="flex w-[300px] md:w-full  justify-between items-center"
            >
              <span className="w-[50%] text-[16px]">Employee Evaluation</span>
              <input
                type="text"
                id="Rsh_Employee_Evaluation"
                className="border w-[50%] h-[40px] border-gray-400 outline-0 pl-[10px] rounded-[2px] border-none text-[#16344E]"
                placeholder="Enter Employee Evaluation"
                value={caseDataForm.Rsh_Employee_Evaluation}
                onChange={(e) => {
                  handleCaseDataForm(e);
                }}
                name="Rsh_Employee_Evaluation"
              />
            </label>
            <label
              htmlFor="Rsh_Latest_Date"
              className="flex w-[300px] md:w-full  justify-between items-center"
            >
              <span className="w-[50%] text-[16px]">Latest Research Date</span>
              <input
                type="text"
                id="Rsh_Latest_Date"
                className="border w-[50%] h-[40px] border-gray-400 outline-0 pl-[10px] rounded-[2px] border-none text-[#16344E]"
                placeholder="Enter Latest Date"
                value={caseDataForm.Rsh_Latest_Date}
                onChange={(e) => {
                  handleCaseDataForm(e);
                }}
                name="Rsh_Latest_Date"
              />
            </label>
            <label
              htmlFor="Rsh_Accepted_Support"
              className="flex w-[300px] md:w-full  justify-between items-center"
            >
              <span className="w-[50%] text-[16px]">Accepted Support</span>
              <input
                type="text"
                id="Rsh_Accepted_Support"
                className="border w-[50%] h-[40px] border-gray-400 outline-0 pl-[10px] rounded-[2px] border-none text-[#16344E]"
                placeholder="Enter Support"
                onChange={(e) => {
                  handleCaseDataForm(e);
                }}
                value={caseDataForm.Rsh_Accepted_Support}
                name="Rsh_Accepted_Support"
              />
            </label>
          </div>
          <button className=" w-[250px] h-[50px] border border-gray-300 bg-gray-100 text-[#16354E] rounded-[10px]   duration-400 hover:bg-[#66BC45] hover:text-gray-100 text-[22px]  cursor-pointer hover:shadow">
            Submit
          </button>
        </form>

        <div
          id="GetUpdateDelLayout"
          className=" flex flex-col justify-start items-center w-full h-fit p-[10px]"
        >
          <h1 className="text-[26px]  text-[#66BC45]">Case Data</h1>

          <div
            id="UIholder"
            className="flex flex-col md:flex-row justify-between items-center w-full gap-[15px]"
          >
            <div
              id="fetchCaseSSN"
              className="border border-gray-300 flex justify-start items-center w-full md:w-[500px] h-[45px] rounded-full pr-[1%] mt-[15px]"
            >
              <input
                type="input"
                name="fetchCaseSSN"
                id="fetchCaseSSN"
                className="h-full w-[89%] rounded-full outline-none pl-[15px] border-none"
                placeholder="Search by SSN"
                value={ssnSearch.ssn}
                onChange={(e) => {
                  handleSsnSearch(e);
                }}
              />
              <Search htmlFor="fetchCaseSSN" className="w-[10%] h-[80%] " />
            </div>
            <button
              onClick={handleSearchBtnClick}
              className=" w-[250px] h-[50px] border border-gray-300 bg-gray-100 text-[#16354E] rounded-[10px]   duration-400 hover:bg-blue-400 hover:text-gray-100 text-[22px]  cursor-pointer hover:shadow"
            >
              Search
            </button>
          </div>
          <p className="self-start text-red-700 my-[10px]">{searchComment}</p>
          {isSearched ? (
            <>
              <form
                id="caseDataHolder"
                className=" w-full   flex  flex-col items-center  gap-[10px] sm:gap-0 sm:flex-row justify-start flex-wrap"
              >
                <div
                  id="dataUnit"
                  className="flex flex-col justify-start items-center w-[140px] border border-gray-300 h-[60px] text-center"
                >
                  <label
                    htmlFor="getCase_Head_Name"
                    className={`w-full h-[50%] border border-gray-300 text-start ${
                      readOnly ? "text-gray-400" : "text-[#16354E]"
                    } pl-[5px]`}
                  >
                    Case Head Name
                  </label>
                  <input
                    type="text"
                    id="getCase_Head_Name"
                    className="w-full h-[50%] outline-0  border-none  border border-gray-300 text-start text-[#66BC45] pl-[5px]"
                    placeholder="Case Name"
                    readOnly={readOnly}
                    onChange={(e) => {
                      handleCurrentCaseData(e);
                    }}
                    name="getCase_Head_Name"
                    value={currentCaseData.getCase_Head_Name}
                  />
                </div>
                <div
                  id="dataUnit"
                  className="flex flex-col justify-start items-center w-[140px] border border-gray-300 h-[60px] text-center"
                >
                  <label
                    htmlFor="getCase_Head_SSN"
                    className={`w-full h-[50%] border border-gray-300 text-start ${
                      readOnly ? "text-gray-400" : "text-[#16354E]"
                    } pl-[5px]`}
                  >
                    Case Head SSN
                  </label>
                  <input
                    type="text"
                    id="getCase_Head_SSN"
                    className="w-full h-[50%] outline-0  border-none  border border-gray-300 text-start text-[#66BC45] pl-[5px]"
                    placeholder="Case SSN"
                    readOnly={readOnly}
                    onChange={(e) => {
                      handleCurrentCaseData(e);
                    }}
                    name="getCase_Head_SSN"
                    value={currentCaseData.getCase_Head_SSN}
                  />
                </div>
                <div
                  id="dataUnit"
                  className="flex flex-col justify-start items-center w-[140px] border border-gray-300 h-[60px] text-center"
                >
                  <label
                    htmlFor="getCase_District"
                    className={`w-full h-[50%] border border-gray-300 text-start ${
                      readOnly ? "text-gray-400" : "text-[#16354E]"
                    } pl-[5px]`}
                  >
                    Case District
                  </label>
                  <input
                    type="text"
                    id="getCase_District"
                    className="w-full h-[50%] outline-0  border-none  border border-gray-300 text-start text-[#66BC45] pl-[5px]"
                    placeholder="Case Name"
                    readOnly={readOnly}
                    onChange={(e) => {
                      handleCurrentCaseData(e);
                    }}
                    name="getCase_District"
                    value={currentCaseData.getCase_District}
                  />
                </div>
                <div
                  id="dataUnit"
                  className="flex flex-col justify-start items-center w-[140px] border border-gray-300 h-[60px] text-center"
                >
                  <label
                    htmlFor="getEmployee_ID"
                    className={`w-full h-[50%] border border-gray-300 text-start ${
                      readOnly ? "text-gray-400" : "text-[#16354E]"
                    } pl-[5px]`}
                  >
                    Employee ID
                  </label>
                  <input
                    type="text"
                    id="getEmployee_ID"
                    className="w-full h-[50%] outline-0  border-none  border border-gray-300 text-start text-[#66BC45] pl-[5px]"
                    placeholder="Employee ID"
                    readOnly={readOnly}
                    onChange={(e) => {
                      handleCurrentCaseData(e);
                    }}
                    name="getEmployee_ID"
                    value={currentCaseData.getEmployee_ID}
                  />
                </div>
                <div
                  id="dataUnit"
                  className="flex flex-col justify-start items-center w-[160px] border border-gray-300 h-[60px] text-center"
                >
                  <label
                    htmlFor="getMgn_eval"
                    className={`w-full h-[50%] border border-gray-300 text-start ${
                      readOnly ? "text-gray-400" : "text-[#16354E]"
                    } pl-[5px]`}
                  >
                    Manager Evaluation
                  </label>
                  <input
                    type="text"
                    id="getMgn_eval"
                    className="w-full h-[50%] outline-0  border-none  border border-gray-300 text-start text-[#66BC45] pl-[5px]"
                    placeholder="Manager Evaluation"
                    readOnly={readOnly}
                    onChange={(e) => {
                      handleCurrentCaseData(e);
                    }}
                    name="getMgn_eval"
                    value={currentCaseData.getMgn_eval}
                  />
                </div>
                <div
                  id="dataUnit"
                  className="flex flex-col justify-start items-center w-[160px] border border-gray-300 h-[60px] text-center"
                >
                  <label
                    htmlFor="getEmp_eval"
                    className={`w-full h-[50%] border border-gray-300 text-start ${
                      readOnly ? "text-gray-400" : "text-[#16354E]"
                    } pl-[5px]`}
                  >
                    Employee Evaluation
                  </label>
                  <input
                    type="text"
                    id="getEmp_eval"
                    className="w-full h-[50%] outline-0  border-none  border border-gray-300 text-start text-[#66BC45] pl-[5px]"
                    placeholder="Manager Evaluation"
                    readOnly={readOnly}
                    onChange={(e) => {
                      handleCurrentCaseData(e);
                    }}
                    name="getEmp_eval"
                    value={currentCaseData.getEmp_eval}
                  />
                </div>
                <div
                  id="dataUnit"
                  className="flex flex-col justify-start items-center w-[140px] border border-gray-300 h-[60px] text-center"
                >
                  <label
                    htmlFor="getLstDate"
                    className={`w-full h-[50%] border border-gray-300 text-start ${
                      readOnly ? "text-gray-400" : "text-[#16354E]"
                    } pl-[5px]`}
                  >
                    Last Research
                  </label>
                  <input
                    type="text"
                    id="getLstDate"
                    className="w-full h-[50%] outline-0  border-none  border border-gray-300 text-start text-[#66BC45] pl-[5px]"
                    placeholder="Last Research"
                    readOnly={readOnly}
                    onChange={(e) => {
                      handleCurrentCaseData(e);
                    }}
                    name="getLstDate"
                    value={currentCaseData.getLstDate}
                  />
                </div>
                <div
                  id="dataUnit"
                  className="flex flex-col justify-start items-center w-[140px] border border-gray-300 h-[60px] text-center"
                >
                  <label
                    htmlFor="getAcceptedSup"
                    className={`w-full h-[50%] border border-gray-300 text-start ${
                      readOnly ? "text-gray-400" : "text-[#16354E]"
                    } pl-[5px]`}
                  >
                    Accepted Support
                  </label>
                  <input
                    type="text"
                    id="getAcceptedSup"
                    className="w-full h-[50%] outline-0  border-none  border border-gray-300 text-start text-[#66BC45] pl-[5px]"
                    placeholder="Accepted Support"
                    readOnly={readOnly}
                    onChange={(e) => {
                      handleCurrentCaseData(e);
                    }}
                    name="getAcceptedSup"
                    value={currentCaseData.getAcceptedSup}
                  />
                </div>
              </form>
              <div
                id="btnsOperationHolder"
                className=" mt-5 self-end w-fit flex"
              >
                {readOnly ? (
                  <button
                    className="w-[120px] h-[35px] rounded-[10px] bg-blue-300 hover:bg-blue-500 duration-400 cursor-pointer text-white"
                    onClick={readOnlyHandle}
                  >
                    Edit
                  </button>
                ) : (
                  <div>
                    <button
                      className="w-[120px] h-[35px] rounded-[10px] bg-red-300 hover:bg-red-500 duration-400 cursor-pointer text-white mr-[15px]"
                      onClick={handleDeleteBtn}
                    >
                      Delete
                    </button>
                    <button
                      className="w-[120px] h-[35px] rounded-[10px] bg-emerald-300 hover:bg-emerald-500 duration-400 cursor-pointer text-white"
                      onClick={handleUpdateBtn}
                    >
                      Update
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default App;
