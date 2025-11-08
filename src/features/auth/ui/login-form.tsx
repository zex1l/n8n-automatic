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
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1, 'Password required'),
});

type LoginFormDto = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormDto) => {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
        callbackURL: ROUTES.HOME,
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
          <CardTitle className="text-center">Welcome</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account
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
                    <Image
                      alt="github"
                      src="/github.svg"
                      width={20}
                      height={20}
                    />
                    Continue with GitHub
                  </Button>

                  <Button
                    className="w-full"
                    disabled={isPending}
                    variant={'outline'}
                    type="button"
                  >
                    <Image
                      alt="github"
                      src="/google.svg"
                      width={20}
                      height={20}
                    />
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
                  <Button
                    className="w-full"
                    disabled={isPending}
                    variant={'default'}
                    type="submit"
                  >
                    Login
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Dont have an account?{' '}
                  <Link
                    href={ROUTES.REGISTER}
                    className="underline underline-offset-4"
                  >
                    Sign up
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
