export function normalizeEmail(text: string): string {
  return text.toLowerCase().trim();
}

/**
 * Function to convert vietnamese string to slug
 *
 * Link https://gist.github.com/codeguy/6684588
 *
 */
export function stringToSlug(str: string): string {
  const from = 'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ';
  const to = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy';

  for (let i = 0, l = from.length; i < l; i += 1) {
    str = str.replace(RegExp(from[i], 'gi'), to[i]);
  }

  str = str.toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-');

  return str;
}
