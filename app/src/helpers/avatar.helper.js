export function resolveAvatarPath(avatarName, defaultValue = null) {
  return avatarName ? `${process.env.REACT_APP_API_URL}/avatars/${avatarName}` : defaultValue;
}