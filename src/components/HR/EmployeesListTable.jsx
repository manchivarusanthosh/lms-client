import React, { Component } from "react";
import './EmployeesListTable.css'
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button } from "react-bootstrap";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";



import { useState } from "react";
import { useEffect } from "react";
import EmpLeaveHistory from "./EmpLeaveHistory";


const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

function EmployeesListTable() {

    
    // const [employeeList, setemployeeList] = useState([])
    const [showEmpDetails, setshowEmpDetails] = useState(true)
    const [loading, setloading] = useState(true)
    const [columnDefs, setcolumnDefs] = useState([
        {
            headerName: "Id",
            field: "Id",
            sortable: true,
        },
        {
            headerName: "Employee Name",
            field: "Employee Name",
            sortable: true,
        },
        {
            headerName: "Email",
            field: "Email",
            sortable: true,
        },
        {
            headerName: "Contact Number",
            field: "Contact Number",
            sortable: false,
        },
        {
            headerName: "DOB",
            field: "DOB",
            sortable: true,
        },
        {
            headerName: "Gender",
            field: "Gender",
            sortable: true,
        },
        {
            headerName: "",
            field: "View Leave Histosty",
            filter: false,
            width: 30,
            cellRendererFramework: renderLeaveHistoryButton.bind(this)
        },

    ])

    var [rowData, setrowData] = useState([])
    
    useEffect(() => {
        loadEmployeeListTable()
        return () => {
            setloading(false)
        }
    }, [])

    var employeeListObj = [];
    var rowDataT = [];

    const [defaultColDef, setdefaultColDef] = useState({
        resizable: true,
        width: 200,
        filter: "agTextColumnFilter"
        // filter: true ,
    })

    function renderLeaveHistoryButton(params) {
        return (

            <FontAwesomeIcon
                icon={faHistory}
                onClick={() => handleEmpLeaveHistory(params.data.data)}
            />
        );
    }

    const handleEmpLeaveHistory = (empObj) =>{
        
        setshowEmpDetails(false)

        console.log(empObj)
    }

    const loadEmployeeListTable = () => {
        axios.get("https://pcs-lms.herokuapp.com/hr/all-emp-details", {
            headers: {
                authorization: localStorage.getItem("token") || ""
            }
        })
            .then(response => {
                console.log("all emp details", response.data)
                employeeListObj = response.data
                //   rowData=response.data

                setloading(false)
                rowDataT = []

                employeeListObj.map((data, index) => {
                    let temp = {
                        data,
                        "Id": index + 1,
                        "Employee Name": data["FirstName"] + data["LastName"],
                        "Email": data["Email"],
                        "Contact Number": data["ContactNo"],
                        "DOB": data["DOB"].slice(0, 10),
                        "Gender": data["Gender"]

                    }
                    rowDataT.push(temp)

                })
                console.log("row data temp", rowDataT)
                setrowData(rowDataT)
            })
            .catch(error => {
                console.log(error);
            });

    }

    return (
        <React.Fragment>
            {
                showEmpDetails ?
                    (<div id="table-outer-div-scroll">
                        {!loading ? (

                            <div
                                id="table-div"
                                className="ag-theme-balham"
                                style={{ height: "550px", width: "100%" }}
                            >
                                <h1 className="employees-heading">Employees</h1>
                                <AgGridReact
                                    columnDefs={columnDefs}
                                    defaultColDef={defaultColDef}
                                    // columnTypes={columnTypes}
                                    rowData={rowData}
                                    pagination={true}
                                    paginationPageSize={10}
                                // getRowHeight={getRowHeight}

                                />

                            </div>
                        ) : (
                            <div id="loading-bar">
                                <RingLoader
                                    css={override}
                                    sizeUnit={"px"}
                                    size={50}
                                    color={"#0000ff"}
                                    loading={true}
                                />
                            </div>
                        )}

                    </div>) : <EmpLeaveHistory />

            }
        </React.Fragment>
    )

}

export default EmployeesListTable
