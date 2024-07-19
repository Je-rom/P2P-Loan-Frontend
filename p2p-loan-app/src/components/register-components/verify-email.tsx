"use client";
import React, { useState } from "react";
import { useFormStore } from "@/context/FormContext";
import { Button } from "@/components/ui/button";

const VerifyEmail: React.FC = () => {
  const {
    formData,
    nextStep,
    prevStep,
    updateFormData,
    sendVerificationEmail,
  } = useFormStore();
  const [isEmailSent, setIsEmailSent] = useState(
    formData.emailVerification.isEmailSent
  );
  const [loading, setLoading] = useState(false);

  const handleSendEmail = async () => {
    setLoading(true);
    try {
      await sendVerificationEmail();
      setIsEmailSent(true);
      updateFormData({
        emailVerification: { ...formData.emailVerification, isEmailSent: true },
      });
      nextStep();
    } catch (error) {
      console.error("Failed to send verification email:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button type="button" onClick={prevStep}>
        Back
      </Button>
      <Button
        type="button"
        onClick={handleSendEmail}
        disabled={isEmailSent || loading}
      >
        {isEmailSent ? "Email Sent" : loading ? "Sending..." : "Send Email"}
      </Button>
    </div>
  );
};

export default VerifyEmail;
