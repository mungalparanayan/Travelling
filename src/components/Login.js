import React, { useState } from 'react';
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [details, setDetails] = useState({email: "", password: ""})
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({email: details.email, password: details.password})
    })
    const json = await response.json();
    console.log(json)
    if(json.email && json.authtoken) {
      localStorage.setItem("Email", json.email);
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      toast.success("Login Successfully", {
        position: "top-right",
        className: "fontToast"
      })
    }
    else {
      toast.error("Please Login with proper details", {
        position: "top-right",
        className: "fontToast"
      })
    }
  }

  const onchange = (e) => {
    setDetails({...details, [e.target.id] : e.target.value})
  }

  const [passwordvisible, setPasswordVisible] = useState(false);
  const togglepasswordvis = () => {
    setPasswordVisible(!passwordvisible);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="loform">
        <div className="left-in">
          <div className='ll1'>Login</div>
          <div>
            <label className="ll" htmlFor="email">Email</label>
            <input className="lii" type="email" id="email" value={details.email} onChange={onchange} />
          </div>
          <div className="login-password-container">
            <label className="ll" htmlFor="password">Password</label>
            <input className="lii" type={passwordvisible?"text":"password"} id="password" value={details.password} onChange={onchange} />
            <button type="button" className='login-eye-btn' onClick={togglepasswordvis}>
              {passwordvisible ? <FaEyeSlash /> :  <FaEye />}
            </button>
          </div>
          <button className="but" type="submit">Submit</button>
          <p className="trap">New to Traveling? <span><Link to="/signup" className="sinow">Sign up now.</Link></span></p>
        </div>
        <div className="right-in">
          <div>
            <img src="/images/111.jpg" alt="" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login; 