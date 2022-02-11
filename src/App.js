import { useState } from 'react';
import './App.css';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { Alert, Button, Snackbar } from '@mui/material';
import fetchUrl from './utils/fetchUrl';

function App() {
  const [email, setEmail] = useState('')
  const [displayOtp, setDisplayOtp] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [otp, setOtp] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [open, setOpen] = useState(false)

  const navigate = useNavigate()

  const handleClick = (e) => {
    try {
      fetchUrl('POST', { email: email }, 'login')
        .then(resp => {
          console.log('login response =', resp)
          if (resp.status === 200) setDisplayOtp(true)
          else if (resp.status === 409) setLoggedIn(true)
          else {
            setErrorMessage('Invalid Email address')
            setOpen(true)
          }
        })
    } catch (error) {
      console.log(error)
    }
  }
  const handleSubmit = (e) => {
    try {
      fetchUrl('POST', { otp: otp }, 'verify')
        .then(resp => {
          if (resp.status === 200) navigate('success')
          else {
            setErrorMessage('OTP is invalid')
            setOpen(true)
            handleLogout()
            setOtp('')
            displayOtp(false)
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = (e) => {
    try {
      fetchUrl('POST', { email: email }, 'logout')
        .then(resp => {
          if (resp.status === 200) navigate('/')
          else {
            setErrorMessage('Failed to log out')
            setOpen(true)
          }
        }).then(setLoggedIn(false)).then(setEmail(''))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      <h1>Enter your email to Login</h1>
      <TextField
        type="text"
        placeholder="Enter your email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button onClick={handleClick} style={{ display: displayOtp ? 'none' : 'block' }}>Submit</Button>
      <div style={{ display: displayOtp ? 'block' : 'none' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            type="text"
            placeholder="Enter the OTP"
            name="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
      <div style={{ display: loggedIn ? 'block' : 'none' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>The user with this email address is already logged in somewhere else.</div>
          <Button onClick={handleLogout}>Logout User?</Button>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert onClose={() => setOpen(false)} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
