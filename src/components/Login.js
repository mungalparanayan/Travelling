import React, { useState } from 'react';
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [details, setDetails] = useState({email: "", password: ""})
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://travel-1xsf.onrender.com/api/auth/login", {
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
        position: "top-center",
        className: "fontToast"
      })
    }
    else {
      toast.error("Please Login with proper details", {
        position: "top-center",
        className: "fontToast"
      })
    }
  }

  const onchange = (e) => {
    setDetails({...details, [e.target.id] : e.target.value})
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="loform">
        <div>
          <label className="ll" htmlFor="email">Email</label>
          <input className="lii" type="email" id="email" value={details.email} onChange={onchange} />
        </div>
        <div>
          <label className="ll" htmlFor="password">Password</label>
          <input className="lii" type="password" id="password" value={details.password} onChange={onchange} />
        </div>
        <button className="but" type="submit">Login</button>
        <p className="trap">New to Traveling? <span><Link to="/signup" className="sinow">Sign up now.</Link></span></p>
      </form>
    </div>
  );
};

export default Login;