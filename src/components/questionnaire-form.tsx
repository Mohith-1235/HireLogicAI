'use client';

import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { handleGenerateQuestionnaire } from '@/app/actions';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader, Copy, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useState } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        'Generate Questionnaire'
      )}
    </Button>
  );
}

function CopyButton({ textToCopy }: { textToCopy: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button variant="ghost" size="icon" onClick={onCopy}>
      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
    </Button>
  );
}

export function QuestionnaireForm() {
  const initialState = { message: '' };
  const [state, formAction] = useActionState(handleGenerateQuestionnaire, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && state.message !== 'success') {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <form action={formAction} className="space-y-4">
        <div>
          <Label htmlFor="jobDescription" className='font-headline'>Job Description</Label>
          <Textarea
            id="jobDescription"
            name="jobDescription"
            placeholder="Paste the full job description here... e.g., 'We are looking for a Senior React Developer with 5+ years of experience in building complex user interfaces...'"
            rows={15}
            required
            className="mt-1"
          />
        </div>
        <SubmitButton />
      </form>
      <div>
        {state.questionnaire ? (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className='font-headline'>Generated Questionnaire</CardTitle>
              <CopyButton textToCopy={state.questionnaire}/>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap bg-secondary p-4 rounded-md text-sm font-code overflow-x-auto">
                {state.questionnaire}
              </pre>
            </CardContent>
          </Card>
        ) : (
          <div className="flex items-center justify-center h-full border rounded-lg bg-secondary">
             <div className="text-center text-muted-foreground p-8">
                <p>Your generated questionnaire will appear here.</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
