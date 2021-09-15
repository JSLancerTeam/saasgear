export function resolveAvatarPath(avatarName?: string, defaultValue = ""): string {
  return avatarName ? `${process.env.REACT_APP_API_URL}/avatars/${avatarName}` : defaultValue;
}