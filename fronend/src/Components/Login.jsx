import React, { useState } from 'react';
import './Login.css';
import { FiEyeOff, FiEye } from "react-icons/fi";
import { FcGoogle, } from "react-icons/fc";
import { BsFillPersonFill, BsFacebook, BsLinkedin, BsBoxArrowRight } from "react-icons/bs";
import { NavLink, useNavigate } from 'react-router-dom';
import { url } from '../ApiPath/API';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  const formData = {
    emailId: '',
    password: ''
  }
  const navigate = useNavigate();
  const [showHide, setShowHide] = useState(false);
  const [loginData, setLoginData] = useState(formData);
  const [formError, setFormError] = useState(formData);

  //password hide and show function
  const showHiding = (e) => {
    setShowHide(!showHide)
  }

  const handleChange = (filedName, value) => {
    let inputValue = value.trim();
    setLoginData((prevData) => ({
      ...prevData,
      [filedName]: inputValue
    }));
    if (filedName === 'emailId') {
      if (inputValue == '') {
        setFormError({ ...formError, emailId: 'Email is requied' })
      } else {
        setFormError({ ...formError, emailId: '' })
      }
    } else if (filedName === 'password') {
      if (inputValue == '') {
        setFormError({ ...formError, password: 'Password is requied' })
      } else {
        setFormError({ ...formError, password: '' })
      }
    }
  }
  const handleLoginUser = (e) => {
    if (loginData?.emailId == '') {
      setFormError({ ...formError, emailId: 'Email is requied' })
    } else if (loginData?.password == '') {
      setFormError({ ...formError, password: 'Password is requied' })
    } else {
      const formData = {
        emailId: loginData?.emailId,
        password: loginData?.password
      };
      console.log(formData.fullname);
      fetch(url?.userSignIn, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // "Authorization": "Bearer " + sessionStorage.getItem("token"),
        },
        body: JSON.stringify(formData),
      }).then((response) => response.json())
        .then((res) => {
          console.log("API url", url?.userSignIn, "Result", res);
          if (res.SUCCESS) {
            sessionStorage.setItem('token', res.token)
            sessionStorage.setItem('userName', res.DATA?.fullName)
            sessionStorage.setItem('userId', res.DATA?._id)
            toast(res.MESSAGE);
            setTimeout(() => {
              navigate('/tasks');
            }, 800)
          }else{
            toast(res.MESSAGE);
          }
        }).catch((error) => {
          console.log(error);
        })
    }
  }

  return (
    <div className="divMain">
      <div className="loginFiled">
        <span className='loginicon'><BsBoxArrowRight /></span>
        <h1 className="heading">Login</h1>
      </div>
      <div className="loginFiled">
        <label className='label1' htmlFor='user'>Email</label>
        <input type='text' value={loginData?.emailId} onChange={(e) => { handleChange('emailId', e.target.value) }} placeholder="Enter email id.." />
        <span className='icon1'><BsFillPersonFill /></span>
        {formError.emailId && <p className="loginErrorMsg">{formError.emailId}</p>}
      </div>
      <div className="loginFiled">
        <label className='label1' htmlFor='password'>Password</label>
        <input type={`${showHide ? 'text' : 'password'}`} onChange={(e) => { handleChange('password', e.target.value) }} value={loginData?.password} placeholder="Enter password.." />
        <span className="icon1" onClick={() => showHiding()}>{showHide ? <FiEye /> : <FiEyeOff />}</span>
        {formError?.password && <p className="loginErrorMsg">{formError.password}</p>}
      </div>
      <div className="loginFiled">
        <button className='btn' onClick={handleLoginUser}>Sign Up</button>
        <NavLink className='btn' excat to='/registration'>Registration</NavLink>
      </div>
      <hr />
      <div className="loginFiled">
        <ul>
          <li><BsFacebook /></li>
          <li><FcGoogle /></li>
          <li><BsLinkedin /></li>
        </ul>
      </div>
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
}

export default Login;