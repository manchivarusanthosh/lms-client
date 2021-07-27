import React, { Component } from "react";
import { useState ,useEffect} from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

function LeaveApplicationEmpForm(props) {
    // state = {
    //     FromDateData: this.props.editData["FromDate"].slice(0, 10),
    //     ToDateData: this.props.editData["ToDate"].slice(0, 10),
    //     ReasonforleaveData: this.props.editData["Reasonforleave"],
    // };

    // console.log("form edit component",props.editData["FromDate"].slice(0, 10))

    const [FromDateData,setFromDateData] = useState(props.editData["FromDate"].slice(0, 10))
    const [ToDateData,setToDateData] = useState(props.editData["ToDate"].slice(0, 10))
    const [ReasonforleaveData, setReasonforleaveData] = useState(props.editData["Reasonforleave"])

    function onFromDateDataChange(e) {
        // this.setState({ FromDateData: e.target.value });
        setFromDateData(e.target.value)
    }
    function onToDateDataChange(e) {
        // this.setState({ ToDateData: e.target.value });
        setToDateData(e.target.value)
    }
    function onReasonforleaveDataChange(e) {
        // this.setState({ ReasonforleaveData: e.target.value });
        setReasonforleaveData(e.target.value)
    }

    // componentWillMount() {
    // }

    
        return (
            <div>
                <h2 id="role-form-title">Edit Leave</h2>
                <div id="role-form-outer-div">
                    <Form
                        id="form"
                        onSubmit={e =>
                            props.onLeaveApplicationEmpEditUpdate(props.editData, e)
                        }
                    >
                        <Form.Group as={Row} >
                            <Form.Label column sm={2}>
                                Leave Type
                            </Form.Label>
                            <Col sm={10} className="form-input">
                                <Form.Control as="select" required>
                                    <option value="" disabled selected>
                                        Select your option
                                    </option>
                                    <option value="Sick Leave" selected={props.editData["Leavetype"] == "Sick Leave"}>Sick Leave</option>
                                    <option value="Casual Leave" selected={props.editData["Leavetype"] == "Casual Leave"}>Casual Leave</option>
                                    <option value="Privilege Leave" selected={props.editData["Leavetype"] == "Privilege Leave"}>Privilege Leave</option>
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
                                    value={FromDateData}
                                    onChange={value => onFromDateDataChange(value)}
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
                                    value={ToDateData}
                                    onChange={value => onToDateDataChange(value)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>
                                Reason for leave
                            </Form.Label>
                            <Col sm={10} className="form-input">
                                <Form.Control type="Text" placeholder="Reason for leave" required
                                    value={ReasonforleaveData}
                                    onChange={value => onReasonforleaveDataChange(value)} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} >
                            <Form.Label column sm={2}>
                                Leave Status
                            </Form.Label>
                            <Col sm={10} className="form-input">
                                <Form.Control as="select" required>
                                    <option value="1" selected disabled>Pending</option>
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


export default LeaveApplicationEmpForm;
