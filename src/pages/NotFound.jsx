import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="stage stage--message">
      <div className="stage__card">
        <p className="stage__eyebrow">Błąd 404</p>
        <h1 className="stage__title">Nie znaleziono tej strony</h1>
        <p className="stage__body">Sprawdź adres albo wróć na stronę główną.</p>
        <Link className="stage__link-btn" to="/">
          Strona główna
        </Link>
      </div>
    </div>
  )
}
