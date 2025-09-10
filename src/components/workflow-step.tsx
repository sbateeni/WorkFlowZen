import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

interface WorkflowStepProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  isCompleted?: boolean;
  isCurrent?: boolean;
  isLast?: boolean;
  href?: string;
}

export function WorkflowStep({
  icon: Icon,
  title,
  subtitle,
  isCompleted,
  isCurrent,
  isLast = false,
  href,
}: WorkflowStepProps) {
  const stepContent = (
    <div className="relative flex items-start">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all',
            isCompleted
              ? 'border-green-500 bg-green-50 text-green-600'
              : 'border-gray-300 bg-white text-gray-400',
            isCurrent && 'border-blue-500 bg-blue-50 text-blue-600',
            href && 'hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 cursor-pointer'
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        {!isLast && (
          <div
            className={cn(
              'h-20 w-px mt-2',
              isCompleted ? 'bg-green-300' : 'bg-gray-200'
            )}
          />
        )}
      </div>
      <div className="ml-6 flex-1 pt-1.5">
        <Card
          className={cn(
            'transition-all hover:shadow-md',
            isCurrent && 'border-blue-300 shadow-md bg-blue-50/30',
            isCompleted && 'border-green-200 bg-green-50/20',
            href && 'cursor-pointer hover:border-blue-300'
          )}
        >
          <CardContent className="p-4">
            <h3 className={cn(
              'text-lg font-semibold font-headline',
              isCurrent && 'text-blue-700',
              isCompleted && 'text-green-700'
            )}>
              {title}
            </h3>
            <p className={cn(
              'text-sm',
              isCurrent ? 'text-blue-600' : 
              isCompleted ? 'text-green-600' : 'text-gray-500'
            )}>
              {subtitle}
            </p>
            {href && (
              <p className="text-xs text-blue-500 mt-2 hover:text-blue-700">
                انقر للانتقال - Click to navigate →
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {stepContent}
      </Link>
    );
  }

  return stepContent;
}
