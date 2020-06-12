import { graphql, setupWorker } from 'msw';

console.log('🔥 up msw server');

const handlers = [
  graphql.query('getMyInfo', (req, res, ctx) => {
    return res(
      ctx.data({
        getMyInfo: {
          id: 'my-mock-id',
          lists: {
            id: 'mock-list-id',
            title: 'mock-list-title',
            owner: 'mock-list-owner-id',
          },
          invitations: {
            id: 'mock-invitation-id',
            inviter: {
              id: 'mock-inviter-id',
            },
            invitee: {
              id: 'mock-invitee-id',
              username: 'mock-invitee-username',
              profileImageUrl: 'http://mock-profile-image.com/',
              email: 'mock@email.com',
            },
            title: 'mock-invitation-title',
          },
        },
      }),
    );
  }),

  graphql.mutation('', (req, res, ctx) => {
    const { invitationId } = req.variables;

    if (invitationId === 'mock-invitation-id') {
      return res(
        ctx.data({
          id: 'mock-new-invitation-id',
          inviter: {
            id: 'mock-inviter-id',
          },
          invitee: {
            id: 'mock-invitee-id',
            username: 'mock-invitee-username',
            profileImageUrl: 'http://mock-invitee-profile-image.com',
            email: 'invitee@invite.com',
          },
          list: 'mock-new-invitation-list-id',
          title: 'mock-new-invitation-title',
        }),
      );
    }
    if (invitationId === 'mock-invalid-invitation-id') {
      return res(
        ctx.errors([
          {
            message: 'An error has occured. . . the sadness',
          },
        ]),
      );
    }
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
            __typename: 'AuthResponse',
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
