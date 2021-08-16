import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, signInWithGoogle } from "../../firebase/utils";
import Buttons from "../Forms/Buttons";
import "./styles.scss";
function SignIn() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const {email,password}=formState;
    try {
        await auth.signInWithEmailAndPassword(email,password)

        setFormState({
            ...formState
        })
    } 
    catch (error) {
        console.log(error);
    }
  };

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="sign-in">
      <div className="wrap">
        <h2>Login</h2>
        <div className="form-wrap">
          <form onSubmit={handleSubmit}>
            <div className="social-sign-in">
              <div className="row">
                <label>email</label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                />
                <label>Password</label>
                <input
                  type="text"
                  value={formState.password}
                  onChange={(e) =>
                    setFormState({ ...formState, password: e.target.value })
                  }
                />
                <Buttons>Sign In</Buttons>
                <Buttons onClick={signInWithGoogle}>
                  Sign in with Google
                </Buttons>
              </div>
            </div>
          </form>
          <div className="links">
            <Link to="/recovery">Reset password</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
