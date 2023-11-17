import React from "react";

const Input = ({ label, type, name, value, testId, handleOnChange, error }) => {
  return (
    <>
      <label className="form-label">{label}</label>
      <input
        className="form-control"
        data-testid={testId}
        placeholder={label}
        name={name}
        onChange={handleOnChange}
        value={value}
        type={type || "text"}
      />
      <p className="text-danger">{error || ""}</p>
    </>
  );
};

export default Input;
