import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Pre-fill email if coming from registration
  useEffect(() => {
    if (location.state?.registeredEmail) {
      setFormData(prev => ({
        ...prev,
        email: location.state.registeredEmail
      }));
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!formData.email || !formData.password) {
      setError("Please fill all fields");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login/", 
        {
          username: formData.email,
          password: formData.password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      // Store authentication data
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userData", JSON.stringify({
        username: response.data.username || formData.email,
        email: formData.email,
        id: response.data.user_id
      }));

      // Redirect to home page after successful login
      navigate("/", { replace: true });
      
    } catch (err) {
      setError(
        err.response?.data?.detail || 
        err.response?.data?.non_field_errors?.[0] || 
        "Login failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-body">
      <div className="login-page">
        {location.state?.registrationSuccess && (
          <div style={{
            color: "green",
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "-30px",
            height: "20px",
            fontSize: "14px"
          }}>
            Registration successful! Please log in.
          </div>
        )}
        
        {error && (
          <div style={{
            color: "red",
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "-30px",
            height: "20px",
            fontSize: "14px"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={{
              height: "40px",
              width: "220px",
              margin: "70px 35px 0 35px",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              backgroundColor: "transparent",
              borderBottom: error ? "2px solid red" : "2px solid black"
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={{
              height: "40px",
              width: "220px",
              margin: "0 35px",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              backgroundColor: "transparent",
              borderBottom: error ? "2px solid red" : "2px solid black"
            }}
          />
          <button 
            type="submit"
            style={{
              height: "40px",
              width: "270px",
              margin: "100px 0 0 160px",
              borderRadius: "10px",
              backgroundColor: isSubmitting ? "white" : "white",
              border: "1px solid black",
              cursor: isSubmitting ? "wait" : "pointer",
              color: isSubmitting ? "gray" : "black",
              transition: "all 0.3s ease"
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
        
        <p style={{ 
          marginLeft: "180px",
          marginTop: "15px",
          fontSize: "16px"
        }}>
          Don't have an account?{" "}
          <span 
            onClick={() => navigate("/register")}
            style={{ 
              cursor: "pointer", 
              color: "blue",
              textDecoration: ""
            }}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}


export default LoginPage;