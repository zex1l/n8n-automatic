export const ROUTES = {
  HOME: '/workflows',
  LOGIN: '/login',
  REGISTER: '/register',

  WORKFLOWS: '/workflows',
  WORKFLOWS_ID: (id: string) => `/workflows/${id}`,

  EXECUTIONS: '/executions',
  EXECUTIONS_ID: (id: string) => `/executions/${id}`,

  CREDENTIALS: '/credentials',
  CREDENTIAL_ID: (id: string) => `/credentials/${id}`,
};
