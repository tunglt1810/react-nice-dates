import neostandard from 'neostandard'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jest from 'eslint-plugin-jest'
import globals from 'globals'

export default [
  { ignores: ['build/', 'build-website/'] },
  ...neostandard({ noJsx: true }),
  {
    rules: {
      '@stylistic/space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }]
    }
  },
  {
    files: ['**/*.js'],
    ...react.configs.flat.recommended,
    languageOptions: {
      ...react.configs.flat.recommended.languageOptions,
      globals: { ...globals.browser }
    },
    plugins: {
      ...react.configs.flat.recommended.plugins,
      'react-hooks': reactHooks
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/prop-types': 'warn'
    },
    settings: { react: { version: 'detect' } }
  },
  {
    files: ['test/**/*.js'],
    ...jest.configs['flat/recommended'],
    // Tests run on `bun test`, which implements the Jest 30 API
    settings: { jest: { version: 30 } }
  }
]
