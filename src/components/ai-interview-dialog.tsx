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
import { useState, useEffect, useCallback } from 'react';
import { ArrowRight, CheckCircle, Loader2, XCircle, Bot } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { handleGenerateInterviewQuestions } from '@/app/actions';
import { Candidate } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';


interface AIInterviewDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onInterviewComplete: (passed: boolean) => void;
  candidate: Candidate;
}

type InterviewState = 'welcome' | 'generating' | 'in-progress' | 'analyzing' | 'complete';

export function AIInterviewDialog({
  isOpen,
  onOpenChange,
  onInterviewComplete,
  candidate,
}: AIInterviewDialogProps) {
  const { toast } = useToast();
  const [interviewState, setInterviewState] = useState<InterviewState>('welcome');
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);

  const qualificationThreshold = 0.7; // 70%

  const resetState = useCallback(() => {
    setInterviewState('welcome');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnsweredCount(0);
  }, []);

  useEffect(() => {
    if (isOpen) {
      resetState();
    }
  }, [isOpen, resetState]);

  const startInterview = async () => {
    setInterviewState('generating');
    try {
      const generatedQuestions = await handleGenerateInterviewQuestions({
        resume: candidate.resume,
        role: candidate.role,
      });
      if (generatedQuestions && generatedQuestions.length > 0) {
        setQuestions(generatedQuestions);
        setInterviewState('in-progress');
      } else {
        toast({
          variant: 'destructive',
          title: 'Failed to generate questions',
          description: 'Could not generate interview questions. Please try again.',
        });
        setInterviewState('welcome');
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Something went wrong while preparing the interview.',
      });
      setInterviewState('welcome');
    }
  };

  const nextQuestion = (answered: boolean) => {
    if (answered) {
      setAnsweredCount(prev => prev + 1);
    }
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
    const passed = (answeredCount / questions.length) >= qualificationThreshold;
    onInterviewComplete(passed);
    handleClose();
  }

  const progressPercentage = questions.length > 0 ? (currentQuestionIndex + 1) / questions.length * 100 : 0;
  const passed = questions.length > 0 && (answeredCount / questions.length) >= qualificationThreshold;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl flex items-center gap-2">
            <Bot /> AI Screening Interview
            </DialogTitle>
          <DialogDescription>
            This is an automated interview with {candidate.name} for the role of {candidate.role}.
          </DialogDescription>
        </DialogHeader>

        {interviewState === 'welcome' && (
          <div className="py-6 text-center">
            <h3 className="text-lg font-semibold">Welcome, {candidate.name}</h3>
            <p className="text-muted-foreground mt-2">
              The AI will generate questions based on the candidate's resume.
            </p>
            <Button onClick={startInterview} className="mt-6">
              Generate Questions & Start <ArrowRight className="ml-2" />
            </Button>
          </div>
        )}

        {interviewState === 'generating' && (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="font-semibold">Generating questions...</p>
                <p className="text-sm text-muted-foreground">The AI is analyzing the resume.</p>
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
                {passed ? (
                    <CheckCircle className="h-12 w-12 text-green-500" />
                ) : (
                    <XCircle className="h-12 w-12 text-destructive" />
                )}
                <p className="text-xl font-semibold">Interview Complete!</p>
                <div className="text-center text-sm text-muted-foreground">
                    <p>Answered: {answeredCount} of {questions.length} questions ({Math.round((answeredCount/questions.length)*100)}%)</p>
                    <p>Qualification threshold: {qualificationThreshold * 100}%</p>
                </div>
                 <p className={`font-bold text-lg mt-2 ${passed ? 'text-green-500' : 'text-destructive'}`}>
                    {passed ? 'Candidate Passed' : 'Candidate Failed'}
                </p>
            </div>
        )}

        <DialogFooter>
            {interviewState === 'in-progress' && (
                 <div className='flex gap-2 w-full justify-end'>
                    <Button variant="outline" onClick={() => nextQuestion(false)}>Skip Question</Button>
                    <Button onClick={() => nextQuestion(true)}>
                        Mark as Answered <ArrowRight className="ml-2"/>
                    </Button>
                 </div>
            )}
            {interviewState === 'complete' && (
                <div className='flex gap-2'>
                    <Button variant="outline" onClick={handleClose}>Close</Button>
                    <Button onClick={handleInterviewCompletion} disabled={!passed}>Move to Next Stage</Button>
                </div>
            )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
