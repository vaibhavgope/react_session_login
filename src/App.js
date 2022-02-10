import { useState } from 'react';
import './App.css';
import { useNavigate } from "react-router-dom";

function App() {
  const [email, setEmail] = useState('')
  const [displayOtp, setDisplayOtp] = useState(false)
  const [otp, setOtp] = useState('')

  const navigate = useNavigate()

  const handleClick = (e) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    };
    fetch('http://localhost:8080/login', requestOptions)
      .then(resp => {
        if (resp.status === 200) setDisplayOtp(true)
        else console.log('Email not valid');
      })
  }
  const handleSubmit = (e) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ otp })
    };
    fetch('http://localhost:8080/verify', requestOptions)
      .then(resp => {
        if (resp.status === 200) navigate('/success')
        else console.log('OTP not found')
      })
  }

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Enter your email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleClick}>Submit</button>
      <div style={{ display: displayOtp === true ? 'block' : 'none' }}>
        <input
          type="text"
          placeholder="Enter the OTP"
          name="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default App;
