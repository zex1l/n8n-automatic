export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-muted flex min-h-svh min-w-screen flex-col justify-center items-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">{children}</div>
    </main>
  );
};
