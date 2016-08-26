function convertHTML(str) {
  return str.replace(/&/gmi, '&amp;')
    .replace(/</gmi, '&lt;')
    .replace(/>/gmi, '&gt;')
    .replace(/"/gmi, '&quot;')
    .replace(/'/gmi, '&apos;');;
}

convertHTML("Dolce & Gabbana");
console.log(convertHTML("Dolce & Gabbana"));