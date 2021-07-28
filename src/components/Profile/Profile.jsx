import React, { Component } from "react";
import "./Profile.css";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import './Profile.css'
import { useEffect,useState } from "react";


function Profile(props) {
    
    const [profileData,setProfileData] = useState({
        EmpName:"",
        EmpEmail:"",
        EmpPassword:"",
        EmpGender:"",
        EmpDOB:"",
        EmpContact:""
    })

    useEffect(()=>{
        loadProfileDetails()
    },[])
    
    function loadProfileDetails(){
        axios.get("https://pcs-lms.herokuapp.com/employee/"+props.data["_id"]+"/profile")
        .then(res=>{
            console.log("here is the employee record for profile")
            console.log(res)
            console.log(res.data)

            setProfileData({
                EmpName:res.data.FirstName + " " + res.data.LastName,
                EmpEmail : res.data.Email,
                EmpPassword : res.data.Password,
                EmpGender : res.data.Gender,
                EmpDOB:res.data.DOB.slice(0,10),
                EmpContact : res.data.ContactNo
            })
            
        })
    }


    return (
        <div>
            <div className="form-container">
                <div id="role-form-outer-div">
                    <Form id="form" className="form">
                        <div className='label-option-container'>
                            <h1>Profile</h1>
                        </div>
                        <div className='label-option-container'>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>
                                    Name
                                </Form.Label>
                                <Col sm={4} className="form-input">
                                    <Form.Control type="Text" placeholder={profileData.EmpName} value={profileData.EmpName} required disabled />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className='label-option-container'>
                            <Form.Group as={Row} >
                                <Form.Label column sm={2}>
                                    Email
                                </Form.Label>
                                <Col sm={4} className="form-input">
                                    <Form.Control type="Text" placeholder={profileData.EmpEmail} value={profileData.EmpEmail} required disabled />
                                </Col>

                            </Form.Group>
                        </div>

                        <div className='label-option-container'>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>
                                    Password
                                </Form.Label>
                                <Col sm={4} className="form-input">
                                    <Form.Control type="password" placeholder={profileData.EmpPassword} value={profileData.EmpPassword} required disabled />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className='label-option-container'>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>
                                    Gender
                                </Form.Label>
                                <Col sm={4} className="form-input">
                                    <Form.Control type="Text" placeholder={profileData.EmpGender} value={profileData.EmpGender} required disabled />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className='label-option-container'>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>
                                    Date Of Birth
                                </Form.Label>
                                <Col sm={4} className="form-input">
                                    <Form.Control type="Text" placeholder={profileData.EmpDOB} required disabled />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className='label-option-container'>
                            <Form.Group as={Row} >
                                <Form.Label column sm={2}>
                                    Contact Number
                                </Form.Label>
                                <Col sm={4} className="form-input">
                                    <Form.Control type="Text" placeholder={profileData.EmpContact} value={profileData.EmpContact} required disabled />
                                </Col>
                            </Form.Group>
                        </div>
                    </Form></div>
            </div>
        </div>
                   
       
    );

}
export default Profile;
