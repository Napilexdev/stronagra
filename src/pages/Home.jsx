import { Link } from 'react-router-dom'
import { stages, totalStages } from '../data/stages'
import { useProgress } from '../hooks/useProgress'
import Seal from '../components/Seal'
import './Home.css'

export default function Home() {
  const { unlockedStage, completedCount, isStageCompleted, isGameComplete, resetProgress } =
    useProgress()

  const nextStage = stages.find((s) => s.id === unlockedStage)

  return (
    <div className="home">
      <div className="home__card">
        <p className="home__eyebrow">Paszport wędrowca</p>
        <h1 className="home__title">Szlak Miejski</h1>
        <p className="home__subtitle">
          Skanuj tabliczki rozwieszone po mieście, oglądaj wskazówkę i wpisuj
          odpowiedź, żeby odblokować kolejny przystanek.
        </p>

        <div className="home__seals" role="list" aria-label="Postęp w grze">
          {stages.map((s) => (
            <Seal key={s.id} filled={isStageCompleted(s.id)} label={String(s.id).padStart(2, '0')} />
          ))}
        </div>

        <p className="home__progress-text">
          {completedCount} / {totalStages} ukończonych
        </p>

        {isGameComplete ? (
          <div className="home__finish">
            <p className="home__finish-text">Szlak ukończony. Wszystkie pieczęcie zebrane.</p>
            <button className="home__reset" onClick={resetProgress} type="button">
              Zacznij od nowa
            </button>
          </div>
        ) : nextStage ? (
          <Link className="home__cta" to={`/zadanie/${nextStage.id}`}>
            {completedCount === 0 ? 'Rozpocznij szlak' : 'Wróć do bieżącego zadania'}
          </Link>
        ) : null}

        <p className="home__hint-note">
          Nie masz jeszcze kodu? Znajdziesz pierwszą tabliczkę w punkcie
          startowym wyznaczonym przez organizatorów.
        </p>
      </div>
    </div>
  )
}
