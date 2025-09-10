import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface WorkflowStepProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  isCompleted?: boolean;
  isCurrent?: boolean;
  isLast?: boolean;
}

export function WorkflowStep({
  icon: Icon,
  title,
  subtitle,
  isCompleted,
  isCurrent,
  isLast = false,
}: WorkflowStepProps) {
  return (
    <div className="relative flex items-start">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-full border-2',
            isCompleted
              ? 'border-accent bg-accent/20 text-accent'
              : 'border-border bg-card text-muted-foreground',
            isCurrent && 'border-primary bg-primary/20 text-primary'
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        {!isLast && (
          <div
            className={cn(
              'h-20 w-px',
              isCompleted ? 'bg-accent' : 'bg-border'
            )}
          />
        )}
      </div>
      <div className="ml-6 flex-1 pt-1.5">
        <Card
          className={cn(
            'transition-all',
            isCurrent && 'border-primary shadow-md'
          )}
        >
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold font-headline">{title}</h3>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
