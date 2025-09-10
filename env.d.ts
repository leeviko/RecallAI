declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';

    BETTER_AUTH_SECRET: string;
    BETTER_AUTH_URL: string;

    DATABASE_URL: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;

    OPENAI_API_KEY: string;

    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_CLIENT_ID: string;

    NEXT_PUBLIC_API_URL: string;
  }
}
