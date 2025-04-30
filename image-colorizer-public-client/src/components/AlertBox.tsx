import React, { useEffect } from "react";
import "../styles/alertBox.css";

interface Props {
  message: string;
  type: "error" | "message";
}

const AlertBox: React.FC<Props> = ({ message, type }) => {
  return (
    <div className={`alertBox ${type}`}>
      <div className={`content`}>{message}</div>
    </div>
  );
};

export default AlertBox;
