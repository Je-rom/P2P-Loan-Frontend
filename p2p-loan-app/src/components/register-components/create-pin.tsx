"use client";
import React, { useState } from "react";
import { useFormStore } from "@/context/FormContext";

const CreatePin: React.FC = () => {
  const { formData, prevStep, updateFormData } = useFormStore();
  const [pinCreation, setPinCreation] = useState(formData.pinCreation);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPinCreation({ ...pinCreation, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateFormData({ pinCreation });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>PIN:</label>
        <input
          type="password"
          name="pin"
          value={pinCreation.pin || ""}
          onChange={handleChange}
        />
      </div>
      <button type="button" onClick={prevStep}>
        Back
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreatePin;
