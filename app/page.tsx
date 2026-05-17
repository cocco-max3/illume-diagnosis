"use client";

import { useMemo, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { toPng } from "html-to-image";
import { AnswerKey, diagnose, questions } from "@/lib/diagnosis";

type Answers = Partial<Record<AnswerKey, number>>;

const privacyItems = ["APIなし", "外部送信なし", "保存なし", "HTML描画なし"];

export default function Home() {
  const [problem, setProblem] = useState("");
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const answeredCount = questions.filter((question) => answers[question.id] !== undefined).length;
  const isComplete = problem.trim().length > 0 && answeredCount === questions.length;
  const result = useMemo(() => diagnose(problem, answers), [problem, answers]);
  const resetDiagnosis = () => {
    setProblem("");
    setAnswers({});
    setSubmitted(false);
    setCurrentQuestion(0);
  };

  return (
    <main className="app-shell relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_50%_0%,rgba(13,27,42,0.10),transparent_18rem)] px-4 py-7 text-illume-navy sm:px-8 lg:px-12">
      <div className="absolute inset-0 -z-10 opacity-90">
        <div className="absolute left-[10%] top-16 h-1 w-1 rounded-full bg-illume-gold" />
        <div className="absolute left-[76%] top-24 h-1.5 w-1.5 rounded-full bg-illume-gold/80" />
        <div className="absolute left-[88%] top-[44%] h-1 w-1 rounded-full bg-illume-blue/[0.45]" />
        <div className="absolute bottom-16 left-[18%] h-1 w-1 rounded-full bg-illume-blue/[0.35]" />
        <div className="absolute right-[18%] top-0 h-full w-px rotate-[23deg] bg-gradient-to-b from-transparent via-illume-gold/65 to-transparent blur-[0.3px]" />
      </div>

      <section
        className={[
          "mx-auto grid max-w-7xl gap-8 lg:items-start",
          submitted ? "lg:grid-cols-[minmax(0,1fr)_minmax(340px,440px)]" : "lg:grid-cols-[minmax(0,820px)]"
        ].join(" ")}
      >
        <div className="pt-4 lg:pt-10">
          <div className="mobile-render">
            <MobileFlow
              problem={problem}
              setProblem={setProblem}
              answers={answers}
              setAnswers={setAnswers}
              submitted={submitted}
              setSubmitted={setSubmitted}
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
              isComplete={isComplete}
              answeredCount={answeredCount}
              resetDiagnosis={resetDiagnosis}
            />
          </div>

          <div className="desktop-render">
          <p className="brand-label mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-illume-blue">Illume Works</p>
          <h1 className="hero-title max-w-3xl text-4xl font-semibold leading-tight text-illume-navy sm:text-5xl lg:text-6xl">
            今、何に詰まっていますか？
          </h1>
          <p className="hero-copy mt-5 max-w-2xl text-base leading-8 text-illume-blue sm:text-lg">
            答えを急がなくて大丈夫です。頭の中にある詰まりを少しだけ外に置いて、止まっている理由と次の一歩を静かに見つけます。
          </p>

          <div className="privacy-row mt-7 flex flex-wrap gap-2">
            {privacyItems.map((item) => (
              <span
                key={item}
                className="privacy-badge rounded-full border border-illume-blue/[0.18] bg-white/[0.64] px-3 py-1 text-xs text-illume-blue"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="input-panel mt-9 rounded-lg border border-illume-blue/[0.18] bg-white/[0.78] p-4 shadow-sm shadow-illume-blue/[0.08] backdrop-blur sm:p-5">
            <label htmlFor="problem" className="input-label text-sm font-semibold text-illume-navy">
              今詰まっていること
            </label>
            <textarea
              id="problem"
              value={problem}
              onChange={(event) => setProblem(event.target.value)}
              placeholder="例：情報を調べすぎて、何から始めればいいかわからない"
              className="problem-input mt-3 min-h-[180px] w-full resize-y rounded-md border border-illume-blue/[0.24] bg-illume-pearl px-4 py-4 text-base leading-7 text-illume-navy outline-none transition placeholder:text-illume-blue/[0.55] focus:border-illume-gold focus:ring-2 focus:ring-illume-gold/30 sm:min-h-36 sm:py-3"
              maxLength={600}
            />
            <div className="input-note mt-2 flex items-center justify-between text-xs text-illume-blue/70">
              <span>外部送信・保存は行いません</span>
              <span>{problem.length}/600</span>
            </div>
          </div>

          <div className="questions-list mt-5 grid gap-3">
            {questions.map((question, index) => (
              <fieldset key={question.id} className="question-card rounded-lg border border-illume-blue/[0.18] bg-white/[0.72] p-4 shadow-sm shadow-illume-blue/[0.06]">
                <legend className="question-title px-1 text-sm font-medium leading-6 text-illume-navy">
                  <span className="mr-2 text-illume-gold">{String(index + 1).padStart(2, "0")}</span>
                  {question.text}
                </legend>
                <div className="answer-grid mt-3 grid gap-2 sm:grid-cols-3">
                  {question.options.map((option) => {
                    const selected = answers[question.id] === option.value;
                    return (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() => setAnswers((current) => ({ ...current, [question.id]: option.value }))}
                        className={[
                          "answer-option min-h-12 rounded-md border px-3 py-3 text-left text-sm font-semibold transition sm:text-center",
                          selected
                            ? "answer-option-selected border-illume-blue bg-illume-blue text-illume-gold shadow-glow"
                            : "border-illume-blue/[0.18] bg-white/[0.78] text-illume-blue hover:border-illume-gold hover:text-illume-navy"
                        ].join(" ")}
                        aria-pressed={selected}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>

          <div className="action-row mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={!isComplete}
              onClick={() => setSubmitted(true)}
              className="primary-action w-full rounded-md bg-illume-blue px-6 py-4 text-sm font-bold text-illume-gold shadow-glow transition hover:bg-illume-moonblue disabled:cursor-not-allowed disabled:bg-illume-blue/[0.28] disabled:text-illume-blue/[0.55] disabled:shadow-none sm:w-auto sm:py-3"
            >
              小さな灯りを出す
            </button>
            <button
              type="button"
              onClick={resetDiagnosis}
              className="secondary-action w-full rounded-md border border-illume-blue/[0.24] px-6 py-3 text-sm font-semibold text-illume-blue transition hover:border-illume-blue/[0.48] hover:text-illume-navy sm:w-auto"
            >
              リセット
            </button>
            {!isComplete && (
              <p className="complete-note w-full text-xs leading-6 text-illume-blue">
                入力と7つの質問がそろうと、灯りを出せます。
                {problem.trim().length === 0 ? "まず一言だけ入力してください。" : `あと${questions.length - answeredCount}問です。`}
              </p>
            )}
          </div>
          </div>
        </div>

        {submitted && (
          <aside className="mt-4 lg:sticky lg:top-8 lg:mt-0">
            <div className="mx-auto min-h-[680px] w-full max-w-[440px] overflow-hidden rounded-lg border border-white/[0.12] bg-illume-ink shadow-2xl">
            <div className="relative flex h-full flex-col justify-between p-7">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(232,215,165,0.22),transparent_18rem)]" />
              <div className="absolute left-1/2 top-0 h-full w-2 -translate-x-1/2 rotate-[18deg] bg-gradient-to-b from-transparent via-illume-gold/80 to-transparent blur-sm" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#030812] to-transparent" />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-illume-moonblue">Quiet resonance</p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight text-white">
                  A small light for the next step.
                </h2>
              </div>

              <div className="relative rounded-lg border border-illume-gold/30 bg-[#071426] p-5 shadow-xl shadow-black/20 backdrop-blur">
                <ResultCard problem={problem} result={result} />
              </div>
            </div>
          </div>
        </aside>
        )}
      </section>
    </main>
  );
}

type MobileFlowProps = {
  problem: string;
  setProblem: (value: string) => void;
  answers: Answers;
  setAnswers: Dispatch<SetStateAction<Answers>>;
  submitted: boolean;
  setSubmitted: (value: boolean) => void;
  currentQuestion: number;
  setCurrentQuestion: Dispatch<SetStateAction<number>>;
  isComplete: boolean;
  answeredCount: number;
  resetDiagnosis: () => void;
};

function MobileFlow({
  problem,
  setProblem,
  answers,
  setAnswers,
  submitted,
  setSubmitted,
  currentQuestion,
  setCurrentQuestion,
  isComplete,
  answeredCount,
  resetDiagnosis
}: MobileFlowProps) {
  const question = questions[currentQuestion];
  const canAnswer = problem.trim().length > 0;

  function chooseAnswer(id: AnswerKey, value: number) {
    setAnswers((current) => ({ ...current, [id]: value }));
    if (currentQuestion < questions.length - 1) {
      window.setTimeout(() => setCurrentQuestion((current) => Math.min(current + 1, questions.length - 1)), 220);
    }
  }

  return (
    <div className="mobile-flow">
      <div className="mobile-moon" />

      <p className="mobile-brand">Illume Works</p>
      <h1 className="mobile-title">今の詰まりを、ひとつだけ置いてみる。</h1>
      <p className="mobile-copy">
        急がなくて大丈夫です。ここでは、答えを出すより先に、今の状態を静かに整理します。
      </p>

      <section className="mobile-breath-card">
        <p className="mobile-step-label">First breath</p>
        <label htmlFor="mobile-problem" className="mobile-field-label">
          今、何に詰まっていますか？
        </label>
        <textarea
          id="mobile-problem"
          value={problem}
          onChange={(event) => {
            setProblem(event.target.value);
            if (submitted) setSubmitted(false);
          }}
          placeholder="一言だけでも大丈夫です"
          maxLength={600}
          className="mobile-textarea"
        />
        <p className="mobile-privacy">外部送信も保存もしません</p>
      </section>

      {canAnswer && !submitted && (
        <section className="mobile-question-card">
          <div className="mobile-progress-row">
            <span>{String(currentQuestion + 1).padStart(2, "0")} / 07</span>
            <span>{answeredCount} answered</span>
          </div>
          <div className="mobile-progress-track">
            <div className="mobile-progress-bar" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }} />
          </div>

          <p className="mobile-question-text">{question.text}</p>
          <div className="mobile-answer-stack">
            {question.options.map((option) => {
              const selected = answers[question.id] === option.value;
              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => chooseAnswer(question.id, option.value)}
                  className={selected ? "mobile-answer selected" : "mobile-answer"}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <div className="mobile-nav-row">
            <button
              type="button"
              onClick={() => setCurrentQuestion((current) => Math.max(0, current - 1))}
              disabled={currentQuestion === 0}
              className="mobile-subtle-button"
            >
              ひとつ戻る
            </button>
            <button
              type="button"
              onClick={() => setCurrentQuestion((current) => Math.min(questions.length - 1, current + 1))}
              disabled={currentQuestion === questions.length - 1}
              className="mobile-subtle-button"
            >
              次へ
            </button>
          </div>
        </section>
      )}

      {canAnswer && isComplete && !submitted && (
        <button type="button" onClick={() => setSubmitted(true)} className="mobile-light-button">
          今日の小さな灯りを見る
        </button>
      )}

      {submitted && (
        <section className="mobile-after-card">
          <p>下に、今日の小さな灯りを置きました。</p>
          <button type="button" onClick={resetDiagnosis} className="mobile-reset-button">
            もう一度、静かに見直す
          </button>
        </section>
      )}
    </div>
  );
}

function ResultCard({ problem, result }: { problem: string; result: ReturnType<typeof diagnose> }) {
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [saveError, setSaveError] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);
  const today = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date());

  async function saveLightCard() {
    if (!cardRef.current) return;
    setSaving(true);
    setSaveError("");

    try {
      const dataUrl = await toPng(cardRef.current, {
        backgroundColor: "#0B1A2E",
        cacheBust: true,
        pixelRatio: 3
      });
      setImageUrl(dataUrl);

      const link = document.createElement("a");
      link.download = `illume-light-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = dataUrl;
      link.click();

      setSaved(true);
      window.setTimeout(() => setSaved(false), 3600);
    } catch {
      setSaveError("画像の生成に失敗しました。もう一度だけ試してください。");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="text-illume-pearl">
      <div
        ref={cardRef}
        className="relative flex aspect-[9/16] min-h-[640px] flex-col justify-between overflow-hidden rounded-lg border border-illume-gold/[0.35] bg-[#0B1A2E] p-6"
      >
        <div className="absolute right-6 top-5 h-16 w-16 rounded-full bg-illume-gold/20 blur-2xl" />
        <div className="absolute right-8 top-8 h-2 w-2 rounded-full bg-illume-gold shadow-glow" />
        <div className="absolute left-[62%] top-0 h-full w-2 rotate-[18deg] bg-gradient-to-b from-transparent via-illume-gold/[0.35] to-transparent blur-sm" />

        <div className="relative">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-illume-moonblue">
            Illume Works
          </p>
          <p className="mt-3 text-xs font-semibold tracking-[0.18em] text-illume-gold">{today}</p>
          <h2 className="mt-8 text-3xl font-semibold leading-tight text-illume-pearl">{result.type}</h2>
          <p className="mt-5 text-base leading-8 text-illume-pearl">{result.summary}</p>
        </div>

        <div className="relative">
          <div className="border-l-2 border-illume-gold pl-4">
            <p className="text-xs font-semibold tracking-[0.18em] text-illume-gold">今日の小さな灯り</p>
            <p className="mt-2 text-lg font-semibold leading-8 text-illume-pearl">{result.nextAction}</p>
          </div>

          <div className="mt-6 rounded-md border border-illume-gold/[0.28] bg-illume-gold/10 px-4 py-4">
            <p className="text-base font-medium leading-8 text-illume-gold">{result.reassurance}</p>
          </div>

          <p className="mt-6 text-sm italic leading-7 text-illume-gold">{result.lightLine}</p>
        </div>
      </div>

      <div className="mt-4 rounded-md border border-illume-gold/[0.18] bg-[#13253A] px-4 py-3">
        <p className="text-xs font-semibold tracking-[0.18em] text-illume-gold">未来の自分へ残す</p>
        <p className="mt-2 text-sm leading-7 text-illume-pearl">
          上のカードをそのまま、スマホに残しやすい縦長PNGとして保存できます。
        </p>
        <button
          type="button"
          onClick={saveLightCard}
          disabled={saving}
          className="mt-3 rounded-md border border-illume-gold/[0.35] px-4 py-2 text-sm font-semibold text-illume-gold transition hover:bg-illume-gold hover:text-illume-navy disabled:cursor-wait disabled:opacity-60"
        >
          {saving ? "保存中..." : saved ? "今日はここまでで大丈夫です🌙" : "今日の灯りを保存🌙"}
        </button>
        {saveError && <p className="mt-3 text-sm leading-6 text-illume-gold">{saveError}</p>}
        {imageUrl && (
          <div className="mt-4 rounded-md border border-illume-gold/20 bg-[#071426] p-3">
            <p className="text-sm leading-7 text-illume-pearl">
              保存画像を生成しました。スマホでは画像を長押しして保存できます。
            </p>
            <a
              href={imageUrl}
              download={`illume-light-${new Date().toISOString().slice(0, 10)}.png`}
              className="mt-3 block overflow-hidden rounded-md border border-illume-gold/[0.24]"
            >
              <img src={imageUrl} alt="今日の小さな灯りカード" className="block w-full" />
            </a>
          </div>
        )}
      </div>

      <details className="mt-4 rounded-md border border-illume-gold/[0.14] bg-[#0B1A2E]/80 px-4 py-3">
        <summary className="cursor-pointer text-sm font-semibold text-illume-gold">もう少しだけ整理する</summary>
        <p className="mt-3 text-xs leading-6 text-illume-pearl/80">入力メモ</p>
        <p className="mt-1 line-clamp-3 whitespace-pre-wrap text-sm leading-6 text-illume-pearl">{problem}</p>
        <ul className="mt-3 space-y-2">
          {result.doNow.map((item) => (
            <li key={item} className="flex gap-2 text-sm leading-6 text-illume-pearl">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-illume-gold" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
