import React, { useEffect, useState } from "react";
import "./Register.css";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { BsFillPersonFill } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { url } from "../ApiPath/API";

const Register = () => {

  const formFiledName = {
    fullName: '',
    emailId: '',
    password: '',
    confirmPassword: ''
  }
  const navigate = useNavigate();
  const [registrationData, setRegistrationData] = useState(formFiledName)
  const [formErrors, setFormErrors] = useState(formFiledName);
  const [showHide, setShowHide] = useState(false);

  //-------onChange function ------
  const handleChangeFormFiled = (filedName, value) => {
    let inputValue = value.trim();
    setRegistrationData((prevData) => ({
      ...prevData,
      [filedName]: inputValue
    }));

    if (filedName === 'fullName') {
      if (inputValue == '') {
        setFormErrors({ ...formErrors, fullName: 'FullName is requied' })
      } else {
        setFormErrors({ ...formErrors, fullName: '' })
      }
    } else if (filedName === 'emailId') {
      if (inputValue == '') {
        setFormErrors({ ...formErrors, emailId: 'Email is requied' })
      } else {
        setFormErrors({ ...formErrors, emailId: '' })
      }
    } else if (filedName === 'password') {
      if (inputValue == '') {
        setFormErrors({ ...formErrors, password: 'Password is requied' })
      } else if (registrationData?.confirmPassword != '' && inputValue != registrationData?.confirmPassword) {
        setFormErrors({ ...formErrors, password: 'Password does not match Confirm Password' })
      } else {
        setFormErrors({ ...formErrors, password: '' })
      }
    } else if (filedName === 'confirmPassword') {
      if (inputValue == '') {
        setFormErrors({ ...formErrors, confirmPassword: 'Confirm Password is requied' })
      } else if (inputValue != registrationData?.password) {
        setFormErrors({ ...formErrors, confirmPassword: 'Confirm Password does not match Password' })
      } else {
        setFormErrors({ ...formErrors, confirmPassword: '' })
      }
    }

  }

  //password hide and show function
  const showHiding = (e) => {
    setShowHide(!showHide)
  }

  const validateRegistrationForm = (data) => {
    const errors = {};

    if (!data.fullName) {
      errors.fullName = 'FullName is required';
    }

    if (!data.emailId) {
      errors.emailId = 'Email Id is required';
    }

    if (!data.password) {
      errors.password = 'Password is required';
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Password does not match Confirm Password';
    }

    if (!data.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (data.confirmPassword !== data.password) {
      errors.confirmPassword = 'Confirm Password does not match Password';
    }
    return errors;
  };

  //form submit function
  const submitData = (e) => {

    const errors = validateRegistrationForm(registrationData);
    setFormErrors(errors);

    if (Object.values(errors).some((err) => err !== '')) {
      return;
    }
    const userApiBody = {
      fullName: registrationData?.fullName,
      emailId: registrationData?.emailId,
      password: registrationData?.password
    }
    console.log("Registration API Body", userApiBody);
    fetch(url.userSignUp, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(userApiBody),
    }).then((response) => response.json())
      .then((res) => {
        console.log("API",url.userSignUp, "Result", res);
        if (res.SUCCESS) {
         toast(res.MESSAGE);
          setTimeout(()=>{
            navigate('/')
          },700)
        }
      }).catch((error) => {
        console.log(error);
      })

  }

  return (
    <div className="registerMain">
      <span className="userIcon"><BsFillPersonFill /></span>
      <h1>User Information</h1>
      <div>
        <label>Fullname</label><br />
        <input type="text" onChange={(e) => handleChangeFormFiled('fullName', e.target.value)} value={registrationData?.fullName} placeholder="Enter Fullname..." /><br />
        {formErrors.fullName && <p className="errorMsgStyle">{formErrors.fullName}</p>}
      </div>
      <div>
        <label>Email Id</label><br />
        <input type="text" onChange={(e) => handleChangeFormFiled('emailId', e.target.value)} value={registrationData?.emailId} placeholder="Enter EmailId..." /><br />
        {formErrors.emailId && <p className="errorMsgStyle">{formErrors.emailId}</p>}
      </div>
      <div className="filed">
        <label>Password</label><br />
        <input type={`${showHide ? "text" : "password"}`} onChange={(e) => handleChangeFormFiled('password', e.target.value)} value={registrationData?.password} placeholder="Enter Password..." />
        <span className="icon" onClick={showHiding}>{showHide ? <FiEye /> : <FiEyeOff />}</span>
        <br />
        {formErrors.password && <p className="errorMsgStyle">{formErrors.password}</p>}
      </div>
      <div>
        <label>Confirm Pawword</label><br />
        <input type="password" onChange={(e) => handleChangeFormFiled('confirmPassword', e.target.value)} value={registrationData?.confirmPassword} placeholder="Enter Confirm Password..." /><br />
        {formErrors.confirmPassword && <p className="errorMsgStyle">{formErrors.confirmPassword}</p>}
      </div>
      <button onClick={submitData}>Submit</button>
      <NavLink exact to='/'><button >Back</button></NavLink>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeButton={false} 
        pauseOnHover
        draggable
      />
    </div>
  )
};

export default Register;