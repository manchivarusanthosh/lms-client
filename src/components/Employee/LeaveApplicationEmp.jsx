import React, { Component, useState } from "react";
import "./LeaveApplicationEmp.css";
import axios from "axios";
import LeaveApplicationEmpTable from "./LeaveApplicationEmpTable.jsx";
import LeaveApplicationEmpForm from "./LeaveApplicationEmpForm.jsx";
import LeaveApplicationEmpFormEdit from "./LeaveApplicationEmpFormEdit.jsx";
import { tr } from "react-dom-factories";
function LeaveApplicationEmp(props) {
//   state = {
//     table: true,
//     editForm: false,
//     editData: {},

//   };
console.log("LeaveApplicationEmp",props)
console.log("props data",props.data)
console.log("props data id",props.data["_id"])

const [table,setTable] = useState(true)
const [editForm, setEditForm] = useState(false)
const [editData,setEditData] = useState({})



const handleLeaveApplicationEmpSubmit = event => {
    event.preventDefault();
    console.log("id", event.target[0].value, event.target[1].value);
    // this.setState({ table: true });
    setTable(true)

    let body = {
      Leavetype: event.target[0].value,
      FromDate: event.target[1].value,
      ToDate: event.target[2].value,
      Reasonforleave: event.target[3].value,
      Status: event.target[4].value,
    };
    axios
      .post("http://localhost:9002/leave-application-emp/" + props.data["_id"], body, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(res => {
        // this.setState({ table: false });
        // this.setState({ table: true });
        setTable(false)
        setTable(true)
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleAddLeaveApplicationEmp = () => {
    console.log("clicked1");
    // this.setState({ table: false });
    setTable(false)
  };
  const handleEditLeaveApplicationEmp = e => {
    console.log(e);
    console.log("clicked6");
    // this.setState({ editForm: true });
    // this.setState({ editData: e });
    // this.setState({ editFormGender: e["Gender"] })

    setEditForm(true)
    setEditData(e)


  };
  const handleFormClose = () => {
    console.log("clicked1");
    // this.setState({ table: true });
    setTable(true)
  };
  const handleEditFormClose = () => {
    console.log("clicked5");
    // this.setState({ editForm: false });
    setEditForm(true)
  };

  // below formclose commented by admins

  // handleFormClose = () => {
  //   console.log("clicked1");
  //   this.setState({ table: true });
  // };
  const handleLeaveApplicationEmpEditUpdate = (info, newInfo) => {
    newInfo.preventDefault();
    console.log("zero data", newInfo.target[0].value);
    let body = {
      Leavetype: newInfo.target[0].value,
      FromDate: newInfo.target[1].value,
      ToDate: newInfo.target[2].value,
      Reasonforleave: newInfo.target[3].value,
      Status: newInfo.target[4].value,
    };
    console.log("update", body);
    axios
      .put(
        "http://localhost:9002/leave-application-emp" + info["_id"],
        body, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      }
      )
      .then(res => {
        // this.setState({ table: false });
        // this.setState({ table: true });

        setTable(false)
        setTable(true)
      })
      .catch(err => {
        console.log(err);
      });

    // this.setState({ editForm: false });
    setEditForm(false)
  };

    return (
      <React.Fragment>
        {table ? (
          editForm ? (
            <LeaveApplicationEmpFormEdit
              onLeaveApplicationEmpEditUpdate={handleLeaveApplicationEmpEditUpdate}
              onFormEditClose={handleEditFormClose}
              editData={editData}
            />
          ) : (
            <LeaveApplicationEmpTable
              onAddLeaveApplicationEmp={handleAddLeaveApplicationEmp}
              onEditLeaveApplicationEmp={handleEditLeaveApplicationEmp}
              data={props.data}
            />
          )
        ) : (
          <LeaveApplicationEmpForm
            onLeaveApplicationEmpSubmit={handleLeaveApplicationEmpSubmit}
            onFormClose={handleFormClose}
            // onGenderChange={handleAddFormGenderChange}
          />
        )}
      </React.Fragment>
    );
  
}

export default LeaveApplicationEmp;
