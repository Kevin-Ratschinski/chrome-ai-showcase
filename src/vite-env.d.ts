/// <reference types="vite/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_MOCK_TEST: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
