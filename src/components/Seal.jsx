import './Seal.css'

export default function Seal({ filled = false, label }) {
  return (
    <div className={`seal ${filled ? 'seal--filled' : 'seal--empty'}`}>
      <svg viewBox="0 0 80 80" className="seal__ring" aria-hidden="true">
        <circle cx="40" cy="40" r="36" />
        <circle cx="40" cy="40" r="29" />
      </svg>
      <span className="seal__label">{label}</span>
    </div>
  )
}
