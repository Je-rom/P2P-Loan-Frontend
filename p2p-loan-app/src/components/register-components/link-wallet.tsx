'use client';
import React, { useState } from 'react';
import { useFormStore } from '@/context/FormContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const LinkWallet: React.FC = () => {
  const { formData, nextStep, prevStep, updateFormData } = useFormStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [walletId, setWalletId] = useState('');

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleDialogSubmit = () => {
    updateFormData({
      linkWallet: {
        ...formData.linkWallet,
        walletProvider: 'monnify',
      },
    });
    nextStep();
    setIsDialogOpen(false);
  };

  return (
    <div>
      <h2>Select Wallet Type</h2>
      <div>
        <button type="button" onClick={handleOpenDialog}>
          Link Monnify Wallet
        </button>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enter Wallet ID</DialogTitle>
              <DialogDescription>
                Please enter your Monnify wallet ID.
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
            <div>
              <button type="button" onClick={handleDialogSubmit}>
                Submit
              </button>
              <button type="button" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </button>
            </div>
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
