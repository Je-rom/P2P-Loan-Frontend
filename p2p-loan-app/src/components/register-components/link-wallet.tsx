"use client";

import React, { useContext, useState } from "react";
import { FormContext } from "@/context/FormContext";

const LinkWallet: React.FC = () => {
  const { formData, nextStep, prevStep, updateFormData } =
    useContext(FormContext);
  const [walletLinking, setWalletLinking] = useState(formData.walletLinking);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWalletLinking({ ...walletLinking, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateFormData({ walletLinking });
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Wallet ID:</label>
        <input
          type="text"
          name="walletId"
          value={walletLinking.walletId || ""}
          onChange={handleChange}
        />
      </div>
      <button type="button" onClick={prevStep}>
        Back
      </button>
      <button type="submit">Next</button>
    </form>
  );
};

export default LinkWallet;
