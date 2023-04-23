import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const LOGIN_URL = 'http://127.0.0.1:8000/api/login';

const Login = () => {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);


  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, [])

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email])

  useEffect(() => {
    const result = password.length > 4 ? true : false;
    setValidPassword(result);
  }, [password])

  const handleLogin = async (e) => {
    e.preventDefault();
    let data = {
      email,
      password
    };

    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify(data),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });

      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setError('No Server Response');
      } else {
        setError('Login Failed');
      }
    }
  }

  return (
    <>
      {success ? (
        <Dashboard />
      ) : (
        <div>
          <p ref={errRef}>{error}</p>
          <div className="col-3 offset-4">
            <h1>Login</h1>

            <input
              type="text"
              ref={emailRef}
              className="form-control mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            {email && emailFocus && !validEmail ? <p>Email is Invalid</p> : ''}

            <input
              type="password"
              className="form-control mb-3"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
            {password && passwordFocus && !validPassword ? <p>Please type a password logner than 4 characters</p> : ''}

            <button onClick={handleLogin} className="btn btn-primary"
              disabled={!validEmail || !validPassword ? true : false}
            >Login</button>

          </div>
        </div>
      )}
    </>
  );
}

export default Login