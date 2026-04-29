import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import dorms from '../data/dorms'

const questions = [
  {
    key: 'area',
    question: 'Where do you want to live?',
    options: [
      { label: '🏙️ Southeast — social & central', value: 'Southeast' },
      { label: '🌊 Lakeshore — quieter & scenic', value: 'Lakeshore' },
      { label: '🏛️ Langdon — historic & central', value: 'Langdon' },
      { label: '🤷 No preference', value: null },
    ],
  },
  {
    key: 'vibe',
    question: 'What vibe are you looking for?',
    options: [
      { label: '📚 Quiet and focused', value: 'Quiet' },
      { label: '🎉 Social and active', value: 'Social' },
      { label: '🏡 Cozy and tight-knit', value: 'Cozy' },
      { label: '✨ Modern and updated', value: 'Newer' },
    ],
  },
  {
    key: 'priority',
    question: "What's your top priority?",
    options: [
      { label: '⭐ Highest rated', value: 'rating' },
      { label: '🚶 Short walk to class', value: 'distance' },
      { label: '🌅 Lake views & nature', value: 'Lake views' },
      { label: '❄️ Suite-style with AC', value: 'Suite-style' },
    ],
  },
]

const MAX_SCORE = 12 // area(4) + vibe(4) + priority(4)

function getDistanceMinutes(distance) {
  const match = distance.match(/\d+/)
  return match ? parseInt(match[0]) : 99
}

function scoreDorm(dorm, answers) {
  let score = 0

  // Area match (0 or 4)
  if (answers.area && dorm.location === answers.area) score += 4

  // Vibe match (0 or 4)
  if (answers.vibe) {
    const vibeMatch = dorm.tags?.some(tag =>
      tag.toLowerCase().includes(answers.vibe.toLowerCase())
    )
    if (vibeMatch) score += 4
  }

  // Priority match (0–4)
  if (answers.priority === 'rating') {
    // Normalize rating (assumed 1–5 scale) to 0–4
    score += ((dorm.rating - 1) / 4) * 4
  } else if (answers.priority === 'distance') {
    // Closer = better; cap at 20 min
    const mins = getDistanceMinutes(dorm.distance)
    score += Math.max(0, 4 - (mins / 20) * 4)
  } else if (answers.priority) {
    const tagMatch = dorm.tags?.some(tag =>
      tag.toLowerCase().includes(answers.priority.toLowerCase())
    )
    if (tagMatch) score += 4
  }

  return score
}

function MatchPercentage({ score }) {
  const pct = Math.round((score / MAX_SCORE) * 100)
  const color = pct >= 80 ? '#22c55e' : pct >= 50 ? '#f59e0b' : '#94a3b8'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '6px 0' }}>
      <div style={{
        flex: 1, height: 8, borderRadius: 4,
        background: '#e2e8f0', overflow: 'hidden'
      }}>
        <div style={{
          width: `${pct}%`, height: '100%',
          background: color, borderRadius: 4,
          transition: 'width 0.6s ease'
        }} />
      </div>
      <span style={{ fontSize: 13, fontWeight: 600, color, minWidth: 38 }}>
        {pct}%
      </span>
    </div>
  )
}

function MatchQuizPage() {
  const [answers, setAnswers] = useState({})
  const [step, setStep] = useState(0)       // which question we're on
  const [showResults, setShowResults] = useState(false)

  const currentQuestion = questions[step]
  const isLastQuestion = step === questions.length - 1

  const handleAnswer = (key, value) => {
    const updated = { ...answers, [key]: value }
    setAnswers(updated)

    // Auto-advance after short delay
    setTimeout(() => {
      if (isLastQuestion) {
        setShowResults(true)
      } else {
        setStep(s => s + 1)
      }
    }, 200)
  }

  const handleReset = () => {
    setAnswers({})
    setStep(0)
    setShowResults(false)
  }

  const results = dorms
    .map(dorm => ({ ...dorm, matchScore: scoreDorm(dorm, answers) }))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3)

  const medals = ['🥇', '🥈', '🥉']

  return (
    <div className="dorms-page">
      <Container>
        <div className="page-header">
          <h1 className="page-title">Dorm Match Quiz</h1>
          <p className="page-subtitle">
            Answer 3 quick questions to find your best UW–Madison dorm matches.
          </p>
        </div>

        <div className="quiz-card">
          {!showResults ? (
            <>
              {/* Progress bar */}
              <div style={{ marginBottom: 28 }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  fontSize: 13, color: '#64748b', marginBottom: 8
                }}>
                  <span>Question {step + 1} of {questions.length}</span>
                  <span>{Math.round(((step) / questions.length) * 100)}% done</span>
                </div>
                <div style={{
                  height: 6, borderRadius: 3, background: '#e2e8f0', overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${(step / questions.length) * 100}%`,
                    height: '100%', background: '#c5050c', borderRadius: 3,
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>

              {/* Current question only */}
              <div className="quiz-question">
                <h2>{currentQuestion.question}</h2>
                <div className="quiz-options">
                  {currentQuestion.options.map(option => (
                    <button
                      key={option.label}
                      className={`quiz-option ${answers[currentQuestion.key] === option.value ? 'quiz-option-active' : ''}`}
                      onClick={() => handleAnswer(currentQuestion.key, option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Back button (not on first question) */}
              {step > 0 && (
                <button
                  onClick={() => setStep(s => s - 1)}
                  style={{
                    background: 'none', border: 'none',
                    color: '#64748b', cursor: 'pointer',
                    fontSize: 14, marginTop: 12
                  }}
                >
                  ← Back
                </button>
              )}
            </>
          ) : (
            <div>
              <h2 className="quiz-results-title">Your Top Dorm Matches 🎉</h2>

              <div className="match-results">
                {results.map((dorm, index) => (
                  <div key={dorm.id} className="match-card">
                    <div className="match-rank">{medals[index]}</div>
                    <div style={{ flex: 1 }}>
                      <h3>{dorm.name}</h3>
                      <p style={{ margin: '2px 0', color: '#64748b', fontSize: 14 }}>
                        📍 {dorm.location} &nbsp;·&nbsp; 🚶 {dorm.distance}
                      </p>
                      <p style={{ margin: '2px 0', fontSize: 14 }}>
                        ⭐ {dorm.rating.toFixed(1)} / 5.0
                      </p>
                      <MatchPercentage score={dorm.matchScore} />
                      <div className="dorm-tags">
                        {dorm.tags.map(tag => (
                          <span key={tag} className="badge dorm-tag">{tag}</span>
                        ))}
                      </div>
                      <Link to={`/dorms/${dorm.id}`} className="match-link">
                        View Dorm →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <button className="quiz-reset" onClick={handleReset}>
                ↩ Retake Quiz
              </button>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}

export default MatchQuizPage