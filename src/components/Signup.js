import React, { useState } from 'react';
import '../styles/signup.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
  const [details, setDetails] = useState({name: "", email: "", password: "", confirmPassword: ""});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch("https://travel-1xsf.onrender.com/api/auth/createuser", {
        method: "POST", 
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({name: details.name, email: details.email, password: details.password, confirmPassword: details.confirmPassword})
      })
      const json = await response.json();
      console.log(json);
      if(json.success) {
        toast.success("registration successfully", {
          position: "top-center",
          className: "fontToast"
        })
        navigate("/login");
      }
      else {
        toast.error("user is already registered", {
          position: "top-center",
          className: "fontToast"
        });        
      }
    }
    catch(error) {
      toast.error("not registered", error, {
        position: "top-center",
        className: "fontToast"
      });
      console.error(error);
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
    <div className='signsu'>
      <div className='fata'>
        <img src="/images/222.jpg" alt="" />
      </div>
      <form onSubmit={handleSubmit} className="suform">
        <div className='signg'>Sign Up</div>
        <div>
          <label className="lll" htmlFor="name">Name</label>
          <input className="lli" type="text" id="name" value={details.name} onChange={onchange} />
        </div>
        <div>
          <label className="lll" htmlFor="email">Email</label>
          <input className="lli" type="email" id="email" value={details.email} onChange={onchange} />
        </div>
        <div>
          <label className="lll" htmlFor="password">Password</label>
          <input className="lli" type={passwordvisible?"text":"password"} id="password" value={details.password} onChange={onchange} />
          <button type="button" className='btn-eye2' onClick={togglepasswordvis}>
            {passwordvisible ? <FaEyeSlash /> :  <FaEye />}
          </button>
        </div>
        <div>
          <label className="lll" htmlFor="confirmPassword">Confirm Password</label>
          <input className="lli" type="password" id="confirmPassword" value={details.confirmPassword} onChange={onchange} />
        </div>
        <button className="buto" type="submit">Sign Up</button>
      </form>
    </div>
  );  
};

export default Signup;
