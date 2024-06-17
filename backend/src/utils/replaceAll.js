export default function replaceAll(str) {
  while(str.includes("^^^")) {
    str = str.replace("^^^", "\n");
  }
  return str;
}


