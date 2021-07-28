import React, { Component, useState } from "react";
import "./LeaveApplicationEmp.css";
import axios from "axios";
import LeaveApplicationEmpTable from "./LeaveApplicationEmpTable.jsx";
import LeaveApplicationEmpForm from "./LeaveApplicationEmpForm.jsx";
import LeaveApplicationEmpFormEdit from "./LeaveApplicationEmpFormEdit.jsx";
import { tr } from "react-dom-factories";
function LeaveApplicationEmp(props) {

  // console.log("LeaveApplicationEmp", props)
  // console.log("props data", props.data)
  // console.log("props data id", props.data["_id"])

  const [table, setTable] = useState(true)
  const [editForm, setEditForm] = useState(false)
  const [editData, setEditData] = useState({})



  // updating leave balance in server
  const updateLeaveBalance = (leaveBalance) => {
    // console.log("updated balance called",props.data["_id"])
    let updatedLeaveBalance = {leaveBalance :leaveBalance}
    let url = "https://pcs-lms.herokuapp.com/leave-application-emp/"+props.data["_id"]+"/leave-balance/"
    axios.put(url,updatedLeaveBalance,{
      headers: {
        authorization: localStorage.getItem("token") || ""
      }
    })
      .then(res=>{
        // console.log("pklease help me::::::",res)
        
      })
    
  }

  
  const handleLeaveApplicationEmpSubmit = event => {
    event.preventDefault();
    // console.log("id", event.target[0].value, event.target[1].value);
    // this.setState({ table: true });

    var leaveBalance = localStorage.getItem("leaveBalance")
    if(leaveBalance==0){
      return window.alert("Your Leave Balance is zero, contact HR")
    }
    setTable(true)

    let body = {
      Name : event.target[0].value,
      Leavetype: event.target[1].value,
      FromDate: event.target[2].value,
      ToDate: event.target[3].value,
      Reasonforleave: event.target[4].value,
      Status: event.target[5].value,
    };
    console.log("body name:",body.Name)
    axios
      .post("https://pcs-lms.herokuapp.com/leave-application-emp/" + props.data["_id"] , body, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(res => {
        // this.setState({ table: false });
        // this.setState({ table: true });
        setTable(false)
        setTable(true)
        
        // console.log("update function before calling",props.data["_id"])
        updateLeaveBalance(leaveBalance)
        
      })
      .catch(err => {
        // console.log(err);
      });
  };
  const handleAddLeaveApplicationEmp = () => {
    // console.log("clicked1");
    // this.setState({ table: false });
    setTable(false)
  };
  const handleEditLeaveApplicationEmp = e => {
    // console.log(e);
    // console.log("clicked6");
    setEditForm(true)
    setEditData(e)
  };
  const handleFormClose = () => {
    // console.log("clicked1");
    setTable(true)
  };
  const handleEditFormClose = () => {
    // console.log("clicked5");
    setEditForm(false)
  };


  const handleLeaveApplicationEmpEditUpdate = (info, newInfo) => {
    newInfo.preventDefault();
    // console.log(newInfo.target[0].value)
    // console.log(newInfo.target[1].value)
    // console.log(newInfo.target[2].value)
    // console.log(newInfo.target[3].value)
    // console.log(newInfo.target[4].value)
    // console.log(newInfo.target[5].value)
    // console.log("zero data", newInfo.target[0].value);
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
        "https://pcs-lms.herokuapp.com/leave-application-emp/" + info["_id"],
        body, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      }
      )
      .then(res => {
        setTable(false)
        setTable(true)
      })
      .catch(err => {
        console.log(err);
      });
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
