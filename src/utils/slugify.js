// Remove accents from a string
const removeAccents = (str) =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
// Return a string with and URL format
export default function slugifyStr(str) {
  const strLowCase = str.toLocaleLowerCase();
  const strNoSpace = strLowCase.replaceAll(' ', '_');
  return removeAccents(strNoSpace);
}
