import antfu from '@antfu/eslint-config';

export default antfu({
  react: true,
  stylistic: false,
  rules: {
    'antfu/top-level-function': 'error',
  },
});
