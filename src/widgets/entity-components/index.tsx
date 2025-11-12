import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/shared/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/shared/ui/dropdown-menu';


import {
  Loader2Icon,
  MoreVerticalIcon,
  PlusIcon,
  TrashIcon,
} from 'lucide-react';
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

type LoadingViewProps = {
  message?: string;
};

export const LoadingView = ({ message }: LoadingViewProps) => {
  return (
    <div className="flex justify-center items-center h-full flex-col flex-1 gap-y-4">
      <Loader2Icon className="size-6 animate-spin text-primary" />
      {!!message && <p className="text-muted-foreground text-sm">{message}</p>}
    </div>
  );
};

type EntityListProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  getKey?: (item: T, index: number) => string | number;
  clasName?: string;
};

export const EntityList = <T,>({
  getKey,
  items,
  renderItem,
  clasName,
}: EntityListProps<T>) => {
  if (items.length === 0) return null;

  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3',
        clasName
      )}
    >
      {items.map((item, index) => (
        <div key={getKey ? getKey(item, index) : index}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
};

type EntityCardProps = {
  href: string;
  title: string;
  subtitle?: React.ReactNode;
  image?: React.ReactNode;
  actions?: React.ReactNode;
  onRemove?: () => void | Promise<void>;
  isRemoving?: boolean;
  className?: string;
};

export const EntityCard = ({
  href,
  title,
  actions,
  className,
  image,
  isRemoving,
  onRemove,
  subtitle,
}: EntityCardProps) => {
  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isRemoving || typeof onRemove !== 'function') return;

    await onRemove();
  };

  return (
    <Link href={href} prefetch>
      <Card
        className={cn(
          'p-4 shadow-none hover:shadow-md cursor-pointer',
          className,
          {
            'opacity-50 cursor-not-allowed': isRemoving,
          }
        )}
      >
        <CardContent className="flex flex-row items-center justify-between p-0">
          <div className="flex items-center gap-3">
            {image}

            <div>
              <CardTitle className="text-base font-medium">{title}</CardTitle>
              {!!subtitle && (
                <CardDescription className="text-sm">
                  {subtitle}
                </CardDescription>
              )}
            </div>
          </div>
          {(!!actions || !!onRemove) && (
            <div className="flex gap-x-4 items-center">
              {actions}
              {onRemove && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size={'icon'}
                      variant={'ghost'}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVerticalIcon className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DropdownMenuItem
                      onClick={handleRemove}
                      className="flex items-center gap-x-2 cursor-pointer rounded-md py-1 px-4 hover:bg-zinc-200 transition-colors duration-100"
                    >
                      <TrashIcon className="size-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};
