import React, { useState } from "react";
import "./LeaveApplicationHR.css";
import axios from "axios";
import LeaveApplicationHRTable from "./LeaveApplicationHRTable.jsx";
// import LeaveApplicationHRForm from "./LeaveApplicationHRForm.jsx";
import LeaveApplicationHRFormEdit from "./LeaveApplicationHRFormEdit.jsx";

function LeaveApplicationHR(props) {
    const [table, setTable] = useState(true)
    const [editForm, setEditForm] = useState(false)
    const [editData, setEditData] = useState({})


    // handleLeaveApplicationHRSubmit = event => {
    //     event.preventDefault();
    //     console.log("id", event.target[0].value, event.target[1].value);
    //     setTable(true)

    //     let body = {
    //         Leavetype: event.target[0].value,
    //         FromDate: event.target[1].value,
    //         ToDate: event.target[2].value,
    //         Reasonforleave: event.target[3].value,
    //         Status: event.target[4].value,
    //       };
    //     axios
    //         .post("https://employee-management-fk-api.herokuapp.com/api/leave-application-hr/" + props.data["_id"], body, {
    //             headers: {
    //                 authorization: localStorage.getItem("token") || ""
    //             }
    //         })
    //         .then(res => {
    //             setState({ table: false });
    //             setState({ table: true });
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // };
    const handleLeaveApplicationHREditUpdate =  (info, newInfo) => {
        
        newInfo.preventDefault();
        console.log("zero data", newInfo.target[0].value);
        let body = {
            Status: newInfo.target[4].value,
        };
        console.log("update", body);
        //leave id
        console.log("employee id:",info["_id"])
         axios
            .put(
                "http://localhost:9002/leave-application-hr/" + info["_id"],
                body, {
                headers: {
                    authorization: localStorage.getItem("token") || ""
                }
            }
            )
            .then(res => {
                // setState({ table: false });
                // setState({ table: true });
                setTable(false)
                setTable(true)
                console.log("im here")
            })
            .catch(err => {
                console.log(err);
            });
        setEditForm(false)
        //send mail form node mailer
        //await axios.post("http://localhost:9002/leave-application-hr/"+info["_id"]+"/status-mail/")

        
    };

    const handleAddLeaveApplicationHR = () => {
        console.log("clicked1");
        // setState({ table: false });
        setTable(false)
    };
    const handleEditLeaveApplicationHR = e => {
        console.log(e);
        console.log("clicked6");
        // setState({ editForm: true });
        // setState({ editData: e });
        // setState({ editFormGender: e["Gender"] })
        setEditForm(true)
        setEditData(e)
    };
    const handleFormClose = () => {
        console.log("clicked1");
        setTable(true);
    };
    const handleEditFormClose = () => {
        console.log("clicked5");
        // setState({ editForm: false });
        setEditForm(false)
    };

    return (<React.Fragment>
        {/* <h1>iiiiiiiiiinnnnnnnnnnnnnn{
          JSON.stringify(props.data)}</h1> */}

        {table ? (
            editForm ? (
                <LeaveApplicationHRFormEdit
                    onLeaveApplicationHREditUpdate={handleLeaveApplicationHREditUpdate}
                    onFormEditClose={handleEditFormClose}
                    editData={editData}
                />
            ) : (
                <LeaveApplicationHRTable
                    onAddLeaveApplicationHR={handleAddLeaveApplicationHR}
                    onEditLeaveApplicationHR={handleEditLeaveApplicationHR}
                    data={props.data}
                />
            )
        ) : (
            <div></div>
            //   <LeaveApplicationHRForm
            //     onLeaveApplicationHRSubmit={handleLeaveApplicationHRSubmit}
            //     onFormClose={handleFormClose}
            //     onGenderChange={handleAddFormGenderChange}
            //   />
        )}
    </React.Fragment>
    )
}

export default LeaveApplicationHR;
