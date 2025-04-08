
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  className,
}: StatsCardProps) {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        {trend && (
          <div
            className={cn(
              'flex items-center text-xs mt-2',
              trend === 'up' && 'text-debtnote-green',
              trend === 'down' && 'text-debtnote-red',
              trend === 'neutral' && 'text-muted-foreground'
            )}
          >
            {trend === 'up' && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 mr-1"
              >
                <path
                  fillRule="evenodd"
                  d="M10 17a1 1 0 0 1-1-1V5.414L5.707 8.707a1 1 0 0 1-1.414-1.414l5-5a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1-1.414 1.414L11 5.414V16a1 1 0 0 1-1 1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {trend === 'down' && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 mr-1"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 0 1 1 1v10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-5 5a1 1 0 0 1-1.414 0l-5-5a1 1 0 1 1 1.414-1.414L9 14.586V4a1 1 0 0 1 1-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {trend === 'neutral' && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 mr-1"
              >
                <path
                  fillRule="evenodd"
                  d="M4 10a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {trendValue}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
