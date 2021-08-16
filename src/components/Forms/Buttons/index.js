import React from "react";
import "./styles.scss";

//children button componentin icine yazdiqlarimizdi ...props ise button componetde istifade etdiyimiz funksiya ve ya deyisenler

function Buttons({ children, ...props }) {
    
  return <button className="btn" {...props}>{children}</button>;
}

export default Buttons;
