import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { QuestionnaireForm } from '@/components/questionnaire-form';
import { Bot } from 'lucide-react';

export default function QuestionnairesPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full border">
                <Bot className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className='font-headline'>AI Questionnaire Generator</CardTitle>
              <CardDescription className="mt-1">
                Generate a custom interview questionnaire by providing a job
                description. Our AI will create relevant questions to help you
                screen candidates effectively.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <QuestionnaireForm />
        </CardContent>
      </Card>
    </div>
  );
}
