import React, { Component } from "react";
import "./LeaveApplicationEmpTable.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { useState } from "react";
import { useEffect } from "react";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

function LeaveApplicationEmpTable(props) {

  const [leaveApplicationEmpData, setleaveApplicationEmpData] = useState([])
  const [loading, setloading] = useState(true)
  const [columnDefs, setcolumnDefs] = useState([
    {
      headerName: "Leave type",
      field: "Leavetype",
      sortable: true,
    },

    {
      headerName: "FromDate",
      field: "FromDate",
      sortable: true,
      type: ["dateColumn"],
      filter: "agDateColumnFilter",
    },
    {
      headerName: "ToDate",
      field: "ToDate",
      sortable: true,
      type: ["dateColumn"],
      filter: "agDateColumnFilter",
    },
    {
      headerName: "Reasonforleave",
      field: "Reasonforleave",
      sortable: true,
    },
    {
      headerName: "Status",
      field: "Status",
      sortable: true,
    },
    {
      headerName: "",
      field: "edit",
      filter: false,
      width: 30,
      // cellRendererFramework: renderEditButton.bind(this)
    },
    {
      headerName: "",
      field: "delete",
      filter: false,
      width: 30,
      //cellRendererFramework: renderButton.bind(this)
    }
  ])
  const [rowData, setrowData] = useState([])
  const [defaultColDef, setdefaultColDef] = useState({
    resizable: true,
    width: 235,
    filter: "agTextColumnFilter"
    // filter: true ,
  })


  const [getRowHeight, setgetRowHeight] = useState(
    function (params) {
      return 35;
    })


  var leaveApplicationEmpObj = [];
  var rowDataT = [];
  
  console.log("rowData value",rowData)
  console.log("Before loading function. rowDataT value", rowDataT)

  useEffect(() => {
    loadLeaveApplicationEmpData()
  }, [])

  const loadLeaveApplicationEmpData = () => {
    axios
      .get(
        "http://localhost:9002/leave-application-emp/" + props.data["_id"],
        {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        }
      )
      .then(response => {
        // this.leaveApplicationEmpObj = response.data;
        leaveApplicationEmpObj = response.data

        console.log("response", response.data);
        // this.setState({ leaveApplicationEmpData: response.data });
        // this.setState({ loading: false });
        // this.rowDataT = [];

        setleaveApplicationEmpData(response.data)
        setloading(false)
        rowDataT = []
        console.log("loading emp data response",response.data)

        // let data=this.educationObj.education["0"];  already commented this line
        leaveApplicationEmpObj.leaveApplication.map(data => {
          let temp = {
            data,
            Leavetype: data["Leavetype"],
            FromDate: data["FromDate"].slice(0, 10),
            ToDate: data["ToDate"].slice(0, 10),
            Reasonforleave: data["Reasonforleave"],
            // Status: this.status(data["Status"]),  commented by me
            Status: data["Status"],

          };

          // this.rowDataT.push(temp);
          console.log("temp data",temp)
          rowDataT.push(temp)
        });
        // this.setState({ rowData: this.rowDataT });
        console.log("rowDataT",rowDataT)
  
        setrowData(rowDataT)
        console.log("After setrowData function rowData value",rowData)
        console.log("After setrowData function rowDataT",rowDataT)

      })
      .catch(error => {
        console.log(error);
      });
  };


  const onLeaveApplicationEmpDelete = (e1, e2) => {
    console.log(e1, e2);
    if (window.confirm("Are you sure to delete this record? ") == true) {
      axios
        .delete(
          "http://localhost:9002/api/leave-application-emp/" + e1 + "/" + e2, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        }
        )
        .then(res => {
          // this.componentDidMount();
          loadLeaveApplicationEmpData()
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  // componentDidMount() {
  //   this.loadLeaveApplicationEmpData();
  // }


  // renderButton(params) {
  //   console.log(params);
  //   return (
  //     <FontAwesomeIcon
  //       icon={faTrash}
  //       onClick={() =>
  //         onLeaveApplicationEmpDelete(props.data["_id"], params.data.data["_id"])
  //       }
  //     />
  //   );
  // }
  // renderEditButton(params) {
  //   console.log(params);
  //   return (
  //     <FontAwesomeIcon
  //       icon={faEdit}
  //       onClick={() => onEdit(params.data.data)}
  //     />
  //   );
  // }

  const status = s => {
    if (s == 1) {
      return "Pending";
    }
    if (s == 2) {
      return "Approved";
    }
    if (s == 3) {
      return "Rejected";
    }
  };
  const onEdit = data => {
    if (data["Status"] == 1) {
      props.onEditLeaveApplicationEmp(data);
    } else {
      window.alert(
        "You can not edit application after it approved or rejected"
      );
    }
  };


  return (
    <div id="table-outer-div-scroll">
      <h2 id="role-title">Leave Application</h2>

      <Button
        variant="primary"
        id="add-button"
        onClick={props.onAddLeaveApplicationEmp}
      >
        <FontAwesomeIcon icon={faPlus} id="plus-icon" />
        Add
      </Button>

      <div id="clear-both" />


      {!loading ? (
        <div
          id="table-div"
          className="ag-theme-balham"
        >
          <AgGridReact
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            //columnTypes={columnTypes}
            rowData={rowData}
            // floatingFilter={true}
            // onGridReady={this.onGridReady}
            pagination={true}
            paginationPageSize={10}
            getRowHeight={getRowHeight}
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



    </div>
  );

}

export default LeaveApplicationEmpTable;