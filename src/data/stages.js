// ============================================================
// KONFIGURACJA ZADAŃ GRY MIEJSKIEJ
// ============================================================
// To jest jedyny plik, który musisz edytować, żeby dodać,
// zmienić albo usunąć zadanie. Każde zadanie to jeden obiekt
// w tablicy `stages` poniżej.
//
// POLA:
//   id           - numer zadania (musi być kolejny: 1, 2, 3...)
//   title        - tytuł wyświetlany na górze strony zadania
//   videoSrc     - ścieżka do pliku wideo w /public/videos/
//                  (np. "/videos/zadanie-1.mp4")
//   prompt       - treść pytania/polecenia pokazywana pod wideo
//   acceptedAnswers - lista poprawnych odpowiedzi (tekst).
//                  Możesz podać kilka wariantów pisowni.
//                  Porównanie ignoruje wielkość liter, spacje
//                  na początku/końcu i polskie znaki diakrytyczne
//                  (np. "ratusz" złapie też "Ratusz" i "RATUSZ").
//   hint         - (opcjonalnie) podpowiedź pokazywana po
//                  poprawnej odpowiedzi, gdzie szukać następnej
//                  tabliczki z kodem QR
//   successNote  - (opcjonalnie) dodatkowy tekst po sukcesie
// ============================================================

export const stages = [
  {
    id: 1,
    title: 'Zadanie 1 — Punkt startowy',
    videoSrc: '/videos/zadanie-1.mp4',
    prompt: 'Jak nazywa się plac, na którym właśnie stoisz?',
    acceptedAnswers: ['plac wolnosci', 'plac wolności'],
    hint: 'Następna tabliczka czeka przy fontannie, na murku po lewej stronie wejścia do ratusza.',
    successNote: 'Świetnie! Pierwsza pieczęć w Twoim paszporcie.',
  },
  {
    id: 2,
    title: 'Zadanie 2 — Ratusz',
    videoSrc: '/videos/zadanie-2.mp4',
    prompt: 'Z którego roku pochodzi tablica pamiątkowa na ścianie ratusza?',
    acceptedAnswers: ['1898'],
    hint: 'Szukaj kolejnej tabliczki przy wejściu do parku miejskiego, na słupku ogłoszeniowym.',
  },
  {
    id: 3,
    title: 'Zadanie 3 — Park miejski',
    videoSrc: '/videos/zadanie-3.mp4',
    prompt: 'Ile lamp ulicznych stoi wzdłuż głównej alejki parku?',
    acceptedAnswers: ['8', 'osiem'],
    hint: 'Następny kod znajdziesz na tylnej ścianie altany, niedaleko stawu.',
  },
  {
    id: 4,
    title: 'Zadanie 4 — Altana',
    videoSrc: '/videos/zadanie-4.mp4',
    prompt: 'Wpisz hasło ukryte w wierszu wygrawerowanym na balustradzie.',
    acceptedAnswers: ['pamiec miasta', 'pamięć miasta'],
    hint: 'Kolejna tabliczka jest przyklejona pod ławką naprzeciwko pomnika.',
  },
  {
    id: 5,
    title: 'Zadanie 5 — Pomnik',
    videoSrc: '/videos/zadanie-5.mp4',
    prompt: 'Jakiemu wydarzeniu poświęcony jest ten pomnik?',
    acceptedAnswers: ['powstanie', 'powstaniu'],
    hint: 'Szukaj następnej tabliczki przy bramie cmentarza, po prawej stronie wejścia.',
  },
  {
    id: 6,
    title: 'Zadanie 6 — Stara brama',
    videoSrc: '/videos/zadanie-6.mp4',
    prompt: 'Jaki symbol jest wyryty nad bramą?',
    acceptedAnswers: ['orzel', 'orzeł'],
    hint: 'Tabliczka numer 7 wisi na latarni przy moście.',
  },
  {
    id: 7,
    title: 'Zadanie 7 — Most',
    videoSrc: '/videos/zadanie-7.mp4',
    prompt: 'Ile przęseł ma most?',
    acceptedAnswers: ['3', 'trzy'],
    hint: 'Następna wskazówka czeka na tablicy informacyjnej przy bulwarze nadrzecznym.',
  },
  {
    id: 8,
    title: 'Zadanie 8 — Bulwar',
    videoSrc: '/videos/zadanie-8.mp4',
    prompt: 'Jak nazywa się rzeka płynąca wzdłuż bulwaru?',
    acceptedAnswers: ['odra'],
    hint: 'Szukaj kodu przy wejściu do filharmonii.',
  },
  {
    id: 9,
    title: 'Zadanie 9 — Filharmonia',
    videoSrc: '/videos/zadanie-9.mp4',
    prompt: 'W którym roku otwarto budynek filharmonii?',
    acceptedAnswers: ['2014'],
    hint: 'Ostatnia tabliczka znajduje się na rynku, przy studni.',
  },
  {
    id: 10,
    title: 'Zadanie 10 — Meta',
    videoSrc: '/videos/zadanie-10.mp4',
    prompt: 'Wpisz hasło kończące grę, ukryte w finałowym filmiku.',
    acceptedAnswers: ['koniec szlaku'],
    successNote: 'To już koniec szlaku — gratulacje! Ukończyłeś całą trasę.',
  },
]

export const totalStages = stages.length

export function getStageById(id) {
  return stages.find((s) => s.id === Number(id))
}
