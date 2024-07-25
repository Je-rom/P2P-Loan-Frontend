"use client";
import React, { useState } from "react";
import { useFormStore } from "@/context/FormContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const LinkWallet: React.FC = () => {
  const { formData, nextStep, prevStep, updateFormData } = useFormStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedWalletType, setSelectedWalletType] = useState<
    "paystack" | "momo" | null
  >(null);
  const [walletId, setWalletId] = useState("");

  const handleOpenDialog = (walletType: "paystack" | "momo") => {
    setSelectedWalletType(walletType);
    setIsDialogOpen(true);
  };

  const handleDialogSubmit = () => {
    updateFormData({
      walletLinking: {
        ...formData.walletLinking,
        walletType: selectedWalletType,
        walletId,
      },
    });
    nextStep();
    setIsDialogOpen(false);
  };

  return (
    <div>
      <h2>Select Wallet Type</h2>
      <div>
        <button onClick={() => handleOpenDialog("paystack")}>
          Link Paystack Wallet
        </button>
        <button onClick={() => handleOpenDialog("momo")}>
          Link Momo Wallet
        </button>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enter Wallet ID</DialogTitle>
              <DialogDescription>
                Please enter your wallet ID for{" "}
                {selectedWalletType === "paystack" ? "Paystack" : "Momo"}.
              </DialogDescription>
            </DialogHeader>
            <div>
              <label htmlFor="walletId">Wallet ID:</label>
              <input
                type="text"
                id="walletId"
                value={walletId}
                onChange={(e) => setWalletId(e.target.value)}
                required
              />
            </div>
            <button type="button" onClick={handleDialogSubmit}>
              Submit
            </button>
          </DialogContent>
        </Dialog>
        <button type="button" onClick={prevStep}>
          Back
        </button>
      </div>
    </div>
  );
};

export default LinkWallet;
