import redirect from 'common/factories/actions/redirect';

export default [
  redirect(
    process.env.NODE_ENV === 'production' ?
      '/courses/ff81d96c-f73d-4049-a4a3-f27b38811182/scenes/0'
    :
      '/courses'
    )
];
