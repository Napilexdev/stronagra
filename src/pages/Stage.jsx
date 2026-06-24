import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getStageById, totalStages } from '../data/stages'
import { useProgress } from '../hooks/useProgress'
import { checkAnswer } from '../utils/checkAnswer'
import './Stage.css'

export default function Stage() {
  const { id } = useParams()
  const stageId = Number(id)
  const stage = getStageById(stageId)

  const { isStageUnlocked, isStageCompleted, completeStage, unlockedStage } = useProgress()

  const [answer, setAnswer] = useState('')
  const [status, setStatus] = useState('idle') // idle | wrong
  const alreadyDone = isStageCompleted(stageId)
  const unlocked = isStageUnlocked(stageId)

  // Jeśli zadanie było już ukończone wcześniej, od razu pokaż stan sukcesu
  const [showSuccess, setShowSuccess] = useState(alreadyDone)

  useEffect(() => {
    setShowSuccess(alreadyDone)
    setAnswer('')
    setStatus('idle')
  }, [stageId, alreadyDone])

  if (!stage) {
    return (
      <div className="stage stage--message">
        <div className="stage__card">
          <p className="stage__eyebrow">Nieznany kod</p>
          <h1 className="stage__title">Ta tabliczka nie istnieje</h1>
          <p className="stage__body">
            Sprawdź, czy zeskanowany kod QR jest poprawny, albo wróć do strony
            głównej.
          </p>
          <Link className="stage__link-btn" to="/">
            Strona główna
          </Link>
        </div>
      </div>
    )
  }

  if (!unlocked) {
    return (
      <div className="stage stage--message">
        <div className="stage__card stage__card--locked">
          <p className="stage__eyebrow">Zadanie {stage.id}</p>
          <h1 className="stage__title">Najpierw ukończ poprzednie zadanie</h1>
          <p className="stage__body">
            Jesteś obecnie na zadaniu <strong>{unlockedStage}</strong> z{' '}
            {totalStages}. Wróć do tabliczki z aktualnym kodem QR i kontynuuj
            stamtąd.
          </p>
          <Link className="stage__link-btn" to={`/zadanie/${unlockedStage}`}>
            Przejdź do zadania {unlockedStage}
          </Link>
        </div>
      </div>
    )
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (checkAnswer(answer, stage.acceptedAnswers)) {
      setStatus('idle')
      completeStage(stage.id)
      setShowSuccess(true)
    } else {
      setStatus('wrong')
    }
  }

  if (showSuccess) {
    const isLast = stage.id >= totalStages
    return (
      <div className="stage stage--message">
        <div className="stage__card stage__card--success">
          <div className="stage__stamp" aria-hidden="true">
            ✓
          </div>
          <p className="stage__eyebrow">Zadanie {stage.id} ukończone</p>
          <h1 className="stage__title">
            {stage.successNote ? stage.successNote : 'Dobra robota'}
          </h1>

          {stage.hint && !isLast && (
            <div className="stage__hint">
              <p className="stage__hint-label">Gdzie szukać kolejnej tabliczki</p>
              <p className="stage__hint-text">{stage.hint}</p>
            </div>
          )}

          {!isLast ? (
            <p className="stage__body stage__body--muted">
              Zeskanuj następny kod QR w mieście, żeby kontynuować.
            </p>
          ) : (
            <Link className="stage__link-btn" to="/">
              Zobacz ukończony paszport
            </Link>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="stage">
      <div className="stage__header">
        <p className="stage__eyebrow">
          Zadanie {stage.id} / {totalStages}
        </p>
        <h1 className="stage__title">{stage.title}</h1>
      </div>

      <div className="stage__video-wrap">
        <video
          className="stage__video"
          src={stage.videoSrc}
          controls
          playsInline
          preload="metadata"
        >
          Twoja przeglądarka nie obsługuje odtwarzania wideo.
        </video>
      </div>

      <form className="stage__form" onSubmit={handleSubmit}>
        <label className="stage__label" htmlFor="answer">
          {stage.prompt}
        </label>
        <input
          id="answer"
          className={`stage__input ${status === 'wrong' ? 'stage__input--error' : ''}`}
          type="text"
          inputMode="text"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value)
            if (status === 'wrong') setStatus('idle')
          }}
          placeholder="Twoja odpowiedź"
        />
        {status === 'wrong' && (
          <p className="stage__error" role="alert">
            To nie jest poprawna odpowiedź. Obejrzyj wskazówkę jeszcze raz i
            spróbuj ponownie.
          </p>
        )}
        <button className="stage__submit" type="submit" disabled={!answer.trim()}>
          Zatwierdź odpowiedź
        </button>
      </form>
    </div>
  )
}
