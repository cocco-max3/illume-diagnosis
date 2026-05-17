export type DiagnosisType =
  | "情報過多タイプ"
  | "判断過多タイプ"
  | "手順不明タイプ"
  | "感情ブレーキタイプ"
  | "環境ノイズタイプ"
  | "完璧主義ロックタイプ"
  | "優先順位迷子タイプ";

export type AnswerKey =
  | "info"
  | "decision"
  | "steps"
  | "emotion"
  | "noise"
  | "perfect"
  | "priority";

export type Question = {
  id: AnswerKey;
  text: string;
  options: Array<{
    label: string;
    value: number;
  }>;
};

export type DiagnosisResult = {
  type: DiagnosisType;
  summary: string;
  nextAction: string;
  doNow: string[];
  avoid: string;
  lightLine: string;
  reassurance: string;
};

export const questions: Question[] = [
  {
    id: "info",
    text: "調べるほど選択肢や情報が増えて、動きにくくなっていますか？",
    options: [
      { label: "かなり当てはまる", value: 3 },
      { label: "少し当てはまる", value: 2 },
      { label: "あまりない", value: 0 }
    ]
  },
  {
    id: "decision",
    text: "正解を選ぼうとして、比較や検討が長引いていますか？",
    options: [
      { label: "かなり当てはまる", value: 3 },
      { label: "少し当てはまる", value: 2 },
      { label: "あまりない", value: 0 }
    ]
  },
  {
    id: "steps",
    text: "最初の具体的な手順が曖昧で、着手点が見えませんか？",
    options: [
      { label: "かなり当てはまる", value: 3 },
      { label: "少し当てはまる", value: 2 },
      { label: "あまりない", value: 0 }
    ]
  },
  {
    id: "emotion",
    text: "不安、怖さ、気まずさ、失敗への抵抗がブレーキになっていますか？",
    options: [
      { label: "かなり当てはまる", value: 3 },
      { label: "少し当てはまる", value: 2 },
      { label: "あまりない", value: 0 }
    ]
  },
  {
    id: "noise",
    text: "通知、場所、時間、周囲の用事など、環境に集中を削られていますか？",
    options: [
      { label: "かなり当てはまる", value: 3 },
      { label: "少し当てはまる", value: 2 },
      { label: "あまりない", value: 0 }
    ]
  },
  {
    id: "perfect",
    text: "出す前から完成度を上げようとして、下書きや試作が止まっていますか？",
    options: [
      { label: "かなり当てはまる", value: 3 },
      { label: "少し当てはまる", value: 2 },
      { label: "あまりない", value: 0 }
    ]
  },
  {
    id: "priority",
    text: "やることが複数あり、どれから触るべきか決めきれませんか？",
    options: [
      { label: "かなり当てはまる", value: 3 },
      { label: "少し当てはまる", value: 2 },
      { label: "あまりない", value: 0 }
    ]
  }
];

const keywordScores: Record<AnswerKey, string[]> = {
  info: ["調べ", "情報", "記事", "動画", "講座", "比較", "わからないことが増", "ai疲れ", "AI疲れ"],
  decision: ["迷", "選べ", "決め", "正解", "比較", "どっち", "判断"],
  steps: ["何から", "手順", "進め方", "始め", "最初", "やり方", "段取り"],
  emotion: ["怖", "不安", "恥", "失敗", "怒ら", "自信", "緊張", "気まず"],
  noise: ["通知", "忙", "時間がない", "集中", "邪魔", "疲", "場所", "家族"],
  perfect: ["完璧", "ちゃんと", "まだ出せ", "品質", "納得", "作り込", "不十分"],
  priority: ["優先", "多すぎ", "タスク", "どれから", "全部", "整理", "重要", "管理崩壊"]
};

const resultMap: Record<AnswerKey, DiagnosisResult> = {
  info: {
    type: "情報過多タイプ",
    summary: "足りないのは情報ではなく、情報を閉じる基準です。",
    nextAction: "追加で調べる前に、今ある情報だけで仮の結論を1行にしてください。",
    doNow: ["調べる時間を10分で止める", "候補を3つまで削る", "一番軽く試せる案を選ぶ"],
    avoid: "新しい記事や動画を開いて安心を買うこと。",
    lightLine: "光を増やすより、見る窓をひとつに絞る。",
    reassurance: "もう十分に集めています。今日は、少し閉じても大丈夫です。"
  },
  decision: {
    type: "判断過多タイプ",
    summary: "正解探しが長くなり、試す前の比較に体力を使っています。",
    nextAction: "判断基準を2つだけ決め、満たしたものを24時間だけ採用してください。",
    doNow: ["基準を2つ書く", "候補をA/Bまで減らす", "小さく試してから決め直す"],
    avoid: "全条件を満たす選択肢が出るまで待つこと。",
    lightLine: "決断は扉ではなく、仮の灯りでもいい。",
    reassurance: "今すぐ正解にたどり着かなくても、仮決めから整えていけます。"
  },
  steps: {
    type: "手順不明タイプ",
    summary: "目標は見えていますが、最初の足場がまだ粗い状態です。",
    nextAction: "完成形ではなく、5分でできる最初の動作に分解してください。",
    doNow: ["必要な道具を1つ開く", "最初の1文か1項目だけ作る", "次の手順を動詞で書く"],
    avoid: "全体設計が完成してから始めようとすること。",
    lightLine: "道は歩く前に全部光らなくていい。",
    reassurance: "見えていないのは能力ではなく、最初の足場だけです。"
  },
  emotion: {
    type: "感情ブレーキタイプ",
    summary: "やり方よりも、失敗時の痛みを避ける力が強く働いています。",
    nextAction: "人に見せない前提で、失敗しても問題ない最小版を作ってください。",
    doNow: ["誰にも出さない下書きを作る", "不安を1文で名前にする", "失敗しても戻せる範囲を決める"],
    avoid: "気合いで押し切ろうとして、さらに怖くすること。",
    lightLine: "怖さは敵ではなく、照らす順番を教える影です。",
    reassurance: "止まっていた時間も、ちゃんと自分を守ろうとしていた時間です。"
  },
  noise: {
    type: "環境ノイズタイプ",
    summary: "意志の問題ではなく、集中を削る条件が多すぎます。",
    nextAction: "15分だけ通知と割り込みを切り、作業場所を一段静かにしてください。",
    doNow: ["通知を一時停止する", "作業タブを1つにする", "15分タイマーを置く"],
    avoid: "騒がしい環境のまま集中力だけを責めること。",
    lightLine: "静けさは贅沢ではなく、考えるための足場です。",
    reassurance: "集中できない日があるのは、あなたの意志が弱いからではありません。"
  },
  perfect: {
    type: "完璧主義ロックタイプ",
    summary: "完成度の基準が高すぎて、試作品を出す前に固まっています。",
    nextAction: "60点版を明示して、直すための素材として一度外に出してください。",
    doNow: ["60点でよい条件を3つ書く", "未完成ラベルを付ける", "1人だけに見せる"],
    avoid: "納得してから公開、という順番にこだわること。",
    lightLine: "未完成は失敗ではなく、光を入れる余白です。",
    reassurance: "粗いまま出しても、あなたの価値が粗くなるわけではありません。"
  },
  priority: {
    type: "優先順位迷子タイプ",
    summary: "タスク量に視界を奪われ、次の一点がぼやけています。",
    nextAction: "締切、影響、重さの3軸で並べ、最も軽く影響が出るものから触ってください。",
    doNow: ["全部を書き出す", "今日やらないものに線を引く", "15分で進むものを1つ選ぶ"],
    avoid: "全タスクを同じ重要度で抱えること。",
    lightLine: "全部を照らすより、次の一歩だけ明るければ進めます。",
    reassurance: "全部を今日抱えなくても、ひとつ選べたら前に進んでいます。"
  }
};

export function diagnose(problem: string, answers: Partial<Record<AnswerKey, number>>): DiagnosisResult {
  const scores: Record<AnswerKey, number> = {
    info: answers.info ?? 0,
    decision: answers.decision ?? 0,
    steps: answers.steps ?? 0,
    emotion: answers.emotion ?? 0,
    noise: answers.noise ?? 0,
    perfect: answers.perfect ?? 0,
    priority: answers.priority ?? 0
  };

  const normalized = problem.toLowerCase();
  for (const [key, keywords] of Object.entries(keywordScores) as Array<[AnswerKey, string[]]>) {
    for (const keyword of keywords) {
      if (normalized.includes(keyword.toLowerCase())) {
        scores[key] += 1;
      }
    }
  }

  const priorityOrder: AnswerKey[] = ["emotion", "noise", "steps", "priority", "decision", "perfect", "info"];
  const winner = priorityOrder.reduce((best, key) => {
    if (scores[key] > scores[best]) return key;
    return best;
  }, "steps" as AnswerKey);

  return resultMap[winner];
}
