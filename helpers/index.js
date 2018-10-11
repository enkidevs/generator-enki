const forbiddenCharSet = new Set([
  "*",
  "^",
  ".",
  "/",
  "@",
  "|",
  "`",
  `'`,
  '"',
  "#",
  "$",
  "~",
  ":"
]);

module.exports = {
  hasForbiddenCharacters: input =>
    [...input].some(character => forbiddenCharSet.has(character)),
  slugify: input =>
    input
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "")
};
