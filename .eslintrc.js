module.exports = {
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    env: {
        browser: true,
        node: true,
    },
    extends: ['airbnb', 'airbnb-typescript/base'],
    overrides: [
        {
            files: ['backend/**.js'],
            rules: {
                'no-console': 'off',
            },
        },
    ],  
    rules: {
        semi: ['warn', 'never'],
        indent: ['warn', 4],
        'max-len': ['warn', 100],
        // 'func-names': 'off',
        'implicit-arrow-linebreak': 'off',
        'no-alert': 'off',
        'no-param-reassign': 'off',
        'prefer-destructuring': 'warn',
        'no-void': 'off',
        'import/prefer-default-export': 'off',
        'no-restricted-globals': 'off',
        'class-methods-use-this': 'off',
        '@typescript-eslint/semi': ['warn', 'never'],
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
    },
}
