import React, { useState } from 'react'
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

function LeaveApplicationHRFormEdit(props) {
    // FromDateData: this.props.editData["FromDate"].slice(0, 10),
    // ToDateData: this.props.editData["ToDate"].slice(0, 10),
    // ReasonforleaveData: this.props.editData["Reasonforleave"],
    // nameData:
    //   this.props.editData["employee"][0]["FirstName"] +
    //   " " +
    //   this.props.editData["employee"][0]["LastName"]

    const [FromDateData, setFromDateData] = useState(props.editData["FromDate"].slice(0, 10))
    const [ToDateData, setToDateData] = useState(props.editData["ToDate"].slice(0, 10))
    const [ReasonforleaveData, setReasonforleaveData] = useState(props.editData["Reasonforleave"])
    const [nameData, setNameData] = useState(props.editData["employee"][0]["FirstName"] +
        " " + props.editData["employee"][0]["LastName"])



    return (
        <div>
            <h2 id="role-form-title">
                Edit Leave Application Of {nameData}
            </h2>

            <div id="role-form-outer-div">
                <Form
                    id="form"
                    onSubmit={e =>
                        props.onLeaveApplicationHREditUpdate(props.editData, e)
                    }
                >
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Leave Type
                        </Form.Label>
                        <Col sm={10} className="form-input">
                            <Form.Control as="select" required>
                                <option value="" disabled selected>
                                    Select your option
                                </option>
                                <option
                                    value="Sick Leave"
                                    selected={props.editData["Leavetype"] == "Sick Leave"}
                                    disabled
                                >
                                    Sick Leave
                                </option>
                                <option
                                    value="Casual Leave"
                                    selected={
                                        props.editData["Leavetype"] == "Casual Leave"
                                    }
                                    disabled
                                >
                                    Casual Leave
                                </option>
                                <option
                                    value="Privilege Leave"
                                    selected={
                                        props.editData["Leavetype"] == "Privilege Leave"
                                    }
                                    disabled
                                >
                                    Privilege Leave
                                </option>
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            FromDate
                        </Form.Label>
                        <Col sm={10} className="form-input">
                            <Form.Control
                                type="date"
                                required
                                disabled
                                value={FromDateData}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            ToDate
                        </Form.Label>
                        <Col sm={10} className="form-input">
                            <Form.Control
                                type="date"
                                required
                                disabled
                                value={ToDateData}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Reason for leave
                        </Form.Label>
                        <Col sm={10} className="form-input">
                            <Form.Control
                                type="Text"
                                placeholder="Reason for leave"
                                required
                                disabled
                                value={ReasonforleaveData}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Leave Status
                        </Form.Label>
                        <Col sm={10} className="form-input">
                            <Form.Control as="select" required>
                                <option value="Pending" selected disabled>
                                    Pending
                                </option>
                                <option
                                    value="2"
                                    selected={props.editData["Status"] == 2}
                                >
                                    Approve
                                </option>
                                <option
                                    value="3"
                                    selected={props.editData["Status"] == 3}
                                >
                                    Reject
                                </option>
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} id="form-submit-button">
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Button type="submit">Update</Button>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} id="form-cancel-button">
                        <Col sm={{ span: 10, offset: 2 }} id="form-cancel-button-inner">
                            <Button type="reset" onClick={props.onFormEditClose}>
                                cancel
                            </Button>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
}
   


export default LeaveApplicationHRFormEdit


