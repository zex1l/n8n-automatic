import { Button } from '@/shared/ui/button';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type EntityHeaderProps = {
  title: string;
  description?: string;
  newButtonLabel?: string;
  disabled?: boolean;
  isCreating?: boolean;
} & (
  | { onNew?: () => void; newButtonHref?: never }
  | { newButtonHref?: string; onNew?: never }
  | { newButtonHref?: never; onNew?: never }
);

export const EntityHeader = ({
  onNew,
  title,
  description,
  disabled,
  isCreating,
  newButtonHref,
  newButtonLabel,
}: EntityHeaderProps) => {
  return (
    <div className="flex flow-row items-center justify-between gap-x-4">
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold">{title}</h1>
        {description && (
          <p className="text-xs md:text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {typeof onNew === 'function' && !newButtonHref && (
        <Button size={'sm'} onClick={onNew} disabled={isCreating || disabled}>
          <PlusIcon className="size-4" />
          {newButtonLabel}
        </Button>
      )}

      {newButtonHref && typeof newButtonHref !== 'function' && (
        <Button asChild size={'sm'}>
          <Link href={newButtonHref} prefetch>
            <PlusIcon className="size-4" />
            {newButtonLabel}
          </Link>
        </Button>
      )}
    </div>
  );
};

type EntityContainerProps = {
  children: React.ReactNode;
  header: React.ReactNode;
};

export const EntityContainer = ({ children, header }: EntityContainerProps) => {
  return (
    <div className="p-4 md:px-10 md-py-6">
      <div className="mx-auto max-w-7xl w-full flex flex-col gap-y-8 h-full">
        {header}

        <div className="flex flex-col gap-y-4">{children}</div>
      </div>
    </div>
  );
};
