import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import "../styles/signup.css";
import type { FormData } from "./types";
import uni_logo from "../images/LOGO_UNI.jpg";
import axios from "axios";

const SignPage: React.FC = () => {
  const [captcha, setCaptcha] = useState<string>("");
  const [userCaptcha, setUserCaptcha] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const generateCaptcha = (): void => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    setCaptcha(randomNum.toString());
  };

  useEffect(() => {
    generateCaptcha();
    axios
      .get("http://localhost:3000/api/github")
      .then((response) => {
        console.log("GitHub Data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching GitHub data:", error);
      });
  }, []);

  const handleCaptchaChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserCaptcha(e.target.value);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (userCaptcha === captcha) {
      // Get all form values
      console.log("Name:", formData.name);
      console.log("Email:", formData.email);
      console.log("Password:", formData.password);
      console.log("Complete Form Data:", formData);

      // You can now send this data to your backend
      // Example API call:
      // fetch('/api/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      setUserCaptcha("");
    } else {
      alert("Captcha verification failed. Please try again.");
      generateCaptcha();
      setUserCaptcha("");
    }
  };

  return (
    <>
      <div className="signup-body">
        <div className="signup-container">
          <div className="signup-content">
            <h3 className="login-header">Sign Up!</h3>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name.."
                value={formData.name}
                onChange={handleInputChange}
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your email.."
                value={formData.email}
                onChange={handleInputChange}
              />
              <label htmlFor="pass">Password</label>
              <input
                type="password"
                id="pass"
                name="password"
                placeholder="Your password.."
                value={formData.password}
                onChange={handleInputChange}
              />

              <div className="captcha-container">
                <label htmlFor="captcha">Enter Captcha</label>
                <div className="captcha-display">{captcha}</div>
                <input
                  type="text"
                  id="captcha"
                  name="captcha"
                  placeholder="Enter the numbers above"
                  value={userCaptcha}
                  onChange={handleCaptchaChange}
                />
              </div>
              <input type="submit" value="Sign Up" />
            </form>
          </div>
          <div className="additional-content">
            <div className="university-header">
              <img src={uni_logo} alt="logo" className="logo-uni" />
              <h2 className="university-name">University Student Portal</h2>
              <p className="university-tagline">
                Empowering Tomorrow's Leaders Through Excellence in Education
              </p>
            </div>

            <div>
              <p className="welcome-text">
                Join thousands of students who are shaping their future through
                quality education and innovation. Our student portal provides
                you with seamless access to all academic resources, helping you
                stay connected, informed, and successful throughout your
                educational journey.
              </p>
            </div>

            <div>
              <p className="welcome-text">
                © {new Date().getFullYear()} University Student Portal. All
                Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignPage;
