import React, { useState } from "react";
import { auth, handleUserProfile } from "../../firebase/utils";
import Buttons from "../Forms/Buttons";
import "./styles.scss";
function SignUp() {
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { displayName, email, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      const err = ["password dont match"];
      setFormData({ ...formData, errors: err });
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await handleUserProfile(user, { displayName });

      setFormData({ ...formData });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="sign-up">
      <div className="wrap">
        <h2>Sign Up</h2>
        {formData.errors > 0 && (
          <ul>
            {formData.errors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={formData.displayName}
            placeholder="name surname"
            name="displayName"
            onChange={(e) =>
              setFormData({ ...formData, displayName: e.target.value })
            }
          />
          <input
            type="email"
            value={formData.email}
            placeholder="email"
            name="email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="password"
            value={formData.password}
            placeholder="password"
            name="password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <input
            type="password"
            value={formData.confirmPassword}
            name="confirmPassword"
            placeholder="confirm password"
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />

          <Buttons>Sign Up</Buttons>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
