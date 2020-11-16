export const BILLING_PRICE = {
  freelancer: {
    price: 12,
    permissions: ['can_invite_user', 'can_remove_user'],
  },
  startup: {
    price: 24,
    permissions: ['can_invite_user', 'can_remove_user', 'can_set_admin_user'],
  },
  enterprise: {
    price: 48,
    permissions: [
      'can_invite_user',
      'can_remove_user',
      'can_set_admin_user',
      'can_create_group',
    ],
  },
};
