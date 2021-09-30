export function resolveAvatarPath(avatarName?: string | null, defaultValue = ""): string {
  return avatarName ? `${avatarName}` : defaultValue;
}