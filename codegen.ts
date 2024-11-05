import { CodegenConfig } from '@graphql-codegen/cli';
import './envConfig.ts';

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_API_ENDPOINT,
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
