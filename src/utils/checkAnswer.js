// Normalizuje tekst do porównania: małe litery, bez spacji na
// krawędziach, bez wielokrotnych spacji, bez polskich ogonków.
// Dzięki temu "Ratusz", " ratusz ", "RATUSZ" i "ratusz" to to samo,
// a gracz nie zostaje ukarany za brak polskiej klawiatury.
function normalize(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/ą/g, 'a')
    .replace(/ć/g, 'c')
    .replace(/ę/g, 'e')
    .replace(/ł/g, 'l')
    .replace(/ń/g, 'n')
    .replace(/ó/g, 'o')
    .replace(/ś/g, 's')
    .replace(/ź|ż/g, 'z')
}

export function checkAnswer(userInput, acceptedAnswers) {
  const normalizedInput = normalize(userInput)
  if (!normalizedInput) return false
  return acceptedAnswers.some((answer) => normalize(answer) === normalizedInput)
}
