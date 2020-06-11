import { graphql, setupWorker } from 'msw';

console.log('🔥 up msw server');

const handlers = [
  graphql.query('getMyInfo', (req, res, ctx) => {
    return res(
      ctx.data({
        getMyInfo: {
          id: 'some-id',
          username: 'mockUsername',
          email: 'mock@email.com',
          profileImageUrl: 'https://source.unsplash.com/random/150x150',
          lists: {
            title: 'mockTitle',
          },
        },
      }),
    );
  }),
  graphql.mutation('profileImageUpload', (req, res, ctx) => {
    return res(
      ctx.data([
        {
          profileImageUrl: 'https://source.unsplash.com/random/200x200',
        },
      ]),
    );
  }),
  graphql.mutation('userLogin', (req, res, ctx) => {
    if (
      req.variables &&
      req.variables.username === 'bob' &&
      req.variables.password === 'bob'
    ) {
      return res(
        ctx.data({
          login: {
            __typename: 'token',
            id: 'some-id',
            token: 'this-is-a-mock-token',
          },
        }),
      );
    }
    return res(
      ctx.errors([
        {
          message: 'An error has occured. . . the sadness',
          locations: [
            {
              line: 1,
              column: 2,
            },
          ],
        },
      ]),
    );
  }),
];

const worker = setupWorker(...handlers);

export { handlers, worker };
