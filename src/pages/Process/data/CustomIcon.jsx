import React from "react";
import categories from "./Categories";

const CustomIcon = ({ categoryMark, price }) => {
  const category = categories.find((c) => c.name === categoryMark);
  const bg = category?.bgColor || "#fff";
  const color = category?.textColor || "#333";

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        textAlign: "center",
      }}
    >
      <div
        style={{
          backgroundColor: bg,
          border: `2px solid ${color}`,
          borderRadius: "8px",
          padding: "2px 6px",
          fontWeight: "bold",
          fontSize: "12px",
          color,
          whiteSpace: "nowrap",
          position: "relative",
          left: "50%",
          transform: "translate(-50%, -00%)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        {price} $
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderTop: `8px solid ${color}`,
          filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.1))",
        }}
      ></div>
    </div>
  );
};

export default CustomIcon;
