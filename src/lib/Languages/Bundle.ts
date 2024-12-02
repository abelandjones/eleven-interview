const langStringsData = document
  .querySelector("[data-language-strings]")
  ?.getAttribute("data-language-strings");

const parsedLangStrings = JSON.parse(langStringsData ?? "{}");

export const langStrings = {};
