'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Loader, Lock, CheckCircle } from 'lucide-react';
import { Document } from '@/lib/data';

interface DigiLockerDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onVerificationComplete: () => void;
  documentName: Document['name'] | null;
  candidateName: string;
}

export function DigiLockerDialog({
  isOpen,
  onOpenChange,
  onVerificationComplete,
  documentName,
  candidateName,
}: DigiLockerDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAllow = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsCompleted(true);
      setTimeout(() => {
        onVerificationComplete();
        onOpenChange(false);
        // Reset state for next time
        setTimeout(() => {
            setIsCompleted(false);
        }, 500);
      }, 1500);
    }, 2000);
  };

  const handleClose = () => {
    if (!isLoading && !isCompleted) {
        onOpenChange(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            DigiLocker Consent
          </DialogTitle>
          <DialogDescription>
            HireLogic AI is requesting access to your DigiLocker documents on
            behalf of {candidateName}.
          </DialogDescription>
        </DialogHeader>
        
        {!isLoading && !isCompleted && (
            <div className="py-4">
                <p className="font-semibold">Requesting to verify:</p>
                <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground bg-secondary p-3 rounded-md">
                    <li>{documentName}</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-4">
                    By clicking &quot;Allow&quot;, you agree to share your document with HireLogic AI for verification purposes.
                </p>
            </div>
        )}

        {isLoading && (
            <div className="flex flex-col items-center justify-center py-10 gap-4">
                <Loader className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Connecting to DigiLocker...</p>
            </div>
        )}

        {isCompleted && (
            <div className="flex flex-col items-center justify-center py-10 gap-4">
                <CheckCircle className="h-10 w-10 text-green-500" />
                <p className="font-semibold">Verification Request Sent!</p>
                <p className="text-sm text-muted-foreground">The status will be updated shortly.</p>
            </div>
        )}


        {!isCompleted && (
            <DialogFooter>
                <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                    Deny
                </Button>
                <Button onClick={handleAllow} disabled={isLoading}>
                    {isLoading ? 'Processing...' : 'Allow'}
                </Button>
            </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
