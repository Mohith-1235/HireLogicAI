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
import { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const questions = [
  'Can you tell me about yourself and your background?',
  'What is your experience with the technologies listed in the job description?',
  'Describe a challenging project you worked on and how you overcame the obstacles.',
  'What are your career goals for the next five years?',
  'Do you have any questions for us?',
];

interface AIInterviewDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onInterviewComplete: () => void;
  candidateName: string;
}

export function AIInterviewDialog({
  isOpen,
  onOpenChange,
  onInterviewComplete,
  candidateName,
}: AIInterviewDialogProps) {
  const [interviewState, setInterviewState] = useState<'welcome' | 'in-progress' | 'analyzing' | 'complete'>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    // Reset state when dialog is reopened
    if (isOpen) {
      setInterviewState('welcome');
      setCurrentQuestionIndex(0);
    }
  }, [isOpen]);

  const startInterview = () => {
    setInterviewState('in-progress');
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setInterviewState('analyzing');
      // Simulate analysis time
      setTimeout(() => {
        setInterviewState('complete');
      }, 2000);
    }
  };
  
  const handleClose = () => {
      onOpenChange(false);
  }

  const handleInterviewCompletion = () => {
    onInterviewComplete();
    handleClose();
  }

  const progressPercentage = (currentQuestionIndex + 1) / questions.length * 100;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">AI Screening Interview</DialogTitle>
          <DialogDescription>
            This is an automated interview with {candidateName}.
          </DialogDescription>
        </DialogHeader>

        {interviewState === 'welcome' && (
          <div className="py-6 text-center">
            <h3 className="text-lg font-semibold">Welcome, {candidateName}</h3>
            <p className="text-muted-foreground mt-2">
              You will be asked a series of {questions.length} questions. Please answer them clearly.
            </p>
            <Button onClick={startInterview} className="mt-6">
              Start Interview <ArrowRight className="ml-2" />
            </Button>
          </div>
        )}

        {interviewState === 'in-progress' && (
          <div className="py-4 space-y-6">
             <Progress value={progressPercentage} className="w-full" />
            <div className="p-6 bg-secondary rounded-lg min-h-[120px] flex items-center justify-center">
                <p className="text-lg font-medium text-center">{questions[currentQuestionIndex]}</p>
            </div>
            <p className="text-center text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>
        )}

        {interviewState === 'analyzing' && (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="font-semibold">Analyzing responses...</p>
                <p className="text-sm text-muted-foreground">Please wait a moment.</p>
            </div>
        )}

        {interviewState === 'complete' && (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
                <CheckCircle className="h-12 w-12 text-green-500" />
                <p className="text-xl font-semibold">Interview Complete!</p>
                <p className="text-sm text-muted-foreground max-w-sm text-center">
                    The AI interview has concluded. You can now proceed with the hiring process.
                </p>
            </div>
        )}

        <DialogFooter>
            {interviewState === 'in-progress' && (
                 <Button onClick={nextQuestion}>
                    {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Interview'} 
                    <ArrowRight className="ml-2"/>
                </Button>
            )}
            {interviewState === 'complete' && (
                <div className='flex gap-2'>
                    <Button variant="outline" onClick={handleClose}>Close</Button>
                    <Button onClick={handleInterviewCompletion}>Move to Next Stage</Button>
                </div>
            )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
