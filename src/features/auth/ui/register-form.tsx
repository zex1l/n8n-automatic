'use client';

import { ROUTES } from '@/shared/config/route';
import { authClient } from '@/shared/lib/auth-client';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

const registerSchema = z
  .object({
    email: z.email(),
    password: z.string().min(1, 'Password required'),
    confirmPassword: z.string().min(1, 'Password required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFormDto = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormDto) => {
    await authClient.signUp.email(
      {
        name: data.email,
        email: data.email,
        password: data.password,
        callbackURL: '/',
      },
      {
        onSuccess: () => {
          router.push(ROUTES.HOME);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      }
    );
  };

  const isPending = form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Get started</CardTitle>
          <CardDescription className="text-center">
            Create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <Button
                    className="w-full"
                    disabled={isPending}
                    variant={'outline'}
                    type="button"
                  >
                    Continue with GitHub
                  </Button>

                  <Button
                    className="w-full"
                    disabled={isPending}
                    variant={'outline'}
                    type="button"
                  >
                    Continue with Google
                  </Button>
                </div>

                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="email@example.com"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="********"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="********"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="w-full"
                    disabled={isPending}
                    variant={'outline'}
                    type="submit"
                  >
                    Register
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Already have an account{' '}
                  <Link
                    href={ROUTES.LOGIN}
                    className="underline underline-offset-4"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
