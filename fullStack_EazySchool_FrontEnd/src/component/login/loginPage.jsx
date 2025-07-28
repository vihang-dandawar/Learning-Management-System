import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateCredentials } from '../../services/Userservice'; // Should return token + role

function LoginPage({ setIsAuthenticated, setUserRole }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const response = await validateCredentials({ email, password });
     
      console.log("Login response:", response.data);
console.log("Token received:", response.data.token);


      if (response.status === 200) {
        const { token, role } = response.data;

        const cleanRole = role.replace('ROLE_', '');

        // ✅ Save token and auth info to sessionStorage
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('isAuthenticated', 'true');
        sessionStorage.setItem('role', cleanRole);
        sessionStorage.setItem('username', email);

        // ✅ Update state
        setIsAuthenticated(true);
        setUserRole(cleanRole);

        // ✅ Redirect based on role
        if (cleanRole === 'ADMIN') {
          navigate('/adminDashboard');
        } else {
          navigate('/userDashboard');
        }
      }
    } catch (error) {
      console.error(error);
      setErrorMsg('Invalid username or password');
       console.log("email->",email,"password->",password)
    }
  };

  return (
    <>
      {/* Banner */}
      <section className="inner-banner py-5">
        <div className="w3l-breadcrumb py-lg-5">
          <div className="container pt-4 pb-sm-4">
            <h4 className="inner-text-title pt-5">LogIn</h4>
          </div>
        </div>
      </section>

      {/* Login Form */}
      <section className="w3l-contact py-5" id="contact">
        <div className="container py-md-5 py-4">
          <div className="title-main text-center mx-auto mb-md-5 mb-4" style={{ maxWidth: '500px' }}>
            <h3 className="title-style">LogIn</h3>
          </div>
          <div className="row login-block justify-content-center">
            <div className="col-md-6 login-center">
              <form onSubmit={handleSubmit} className="signin-form">
                <div className="col-md-8 mx-auto input-grids">
                  {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

                  <input
  type="email"
  name="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Email"
  className="form-control mb-3"
  required
  autoComplete="email"
/>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="form-control mb-3"
                    required
                    autoComplete="new-password"
                  />
                </div>
               <div className="col-md-8 mx-auto text-start">
  <button type="submit" className="btn btn-primary mb-2">Log In</button>
 <a className="new-user float-end mt-2" href="/register">New User?</a>
  {/* Forget Password Button Below */}
  <div className="mt-2">
    <button type="button"
     className="btn btn-secondary"
      onClick={() => navigate('/forget-password')}
      >Forget Password</button>
  </div>

 
</div>

              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginPage;
