const usersTable = {
  id: 'users.id',
  name: 'users.name',
  email: 'users.email',
  createAt: 'user.created_at',
};

const userTokenTable = {
  token: 'user_token.token',
  type: 'user_token.type',
  id: 'user_token.id',
  userId: 'user_token.user_id',
};

export { userTokenTable, usersTable };
