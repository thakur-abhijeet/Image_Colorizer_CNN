import React from "react";
import "../styles/infoHolder.css";

interface Props {
  title: string;
  children: React.ReactNode;
}

const InfoHolder: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="infoHolder">
      <div className="title">{title}</div>
      <div className="info">{children}</div>
    </div>
  );
};

export default InfoHolder;
