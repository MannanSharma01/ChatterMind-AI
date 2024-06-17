function codeBlockExists(str) {
  return str.includes("```");
}

function extractBlocks(str) {
  return str.split("```");
}

function findLanguage(str) {
  return str.split("\n")[0];
}

export {
  codeBlockExists,
  extractBlocks,
  findLanguage
};