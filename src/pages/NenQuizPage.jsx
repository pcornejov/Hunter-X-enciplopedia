import { useState } from 'react';
import { Link } from 'react-router-dom';
import { nenQuizQuestions, computeNenQuizResult } from '../data/nenQuiz';
import { findNenTypeBySlug } from '../data/nenTypes';
import { findCharacterBySlug } from '../data/characters';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function NenQuizPage() {
  useDocumentTitle('¿Qué tipo de Nen tendrías?');
  const [answers, setAnswers] = useState([]);
  const [step, setStep] = useState(0);

  const finished = step >= nenQuizQuestions.length;
  const result = finished ? findNenTypeBySlug(computeNenQuizResult(answers)) : null;

  function answer(tipo) {
    setAnswers((prev) => [...prev, tipo]);
    setStep((s) => s + 1);
  }

  function restart() {
    setAnswers([]);
    setStep(0);
  }

  return (
    <div className="container">
      <h1>¿Qué tipo de Nen tendrías?</h1>

      {!finished && (
        <div className="arc-card">
          <div className="quiz-progress">
            Pregunta {step + 1} de {nenQuizQuestions.length}
          </div>
          <h2>{nenQuizQuestions[step].pregunta}</h2>
          <div className="quiz-options">
            {nenQuizQuestions[step].opciones.map((opcion) => (
              <button
                type="button"
                key={opcion.texto}
                className="btn quiz-option"
                onClick={() => answer(opcion.tipo)}
              >
                {opcion.texto}
              </button>
            ))}
          </div>
        </div>
      )}

      {finished && result && (
        <div className="arc-card">
          <h2>Tu resultado: {result.nombre}</h2>
          <p>
            <em>{result.lema}</em>
          </p>
          <p>{result.descripcion}</p>
          <div className="chip-list">
            {result.ejemplosSlugs.map((s) => {
              const character = findCharacterBySlug(s);
              if (!character) return null;
              return (
                <Link key={s} to={`/personajes/${s}`} className="chip">
                  {character.nombre}
                </Link>
              );
            })}
          </div>
          <button type="button" className="btn btn-primary" style={{ marginTop: 16 }} onClick={restart}>
            Repetir el quiz
          </button>
        </div>
      )}
    </div>
  );
}
