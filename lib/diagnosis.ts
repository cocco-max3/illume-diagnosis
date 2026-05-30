export type DiagnosisType =
  | "情報過多タイプ"
  | "判断過多タイプ"
  | "手順不明タイプ"
  | "感情ブレーキタイプ"
  | "環境ノイズタイプ"
  | "完璧主義ロックタイプ"
  | "優先順位迷子タイプ"
  | "期待疲労タイプ"
  | "抱え込み停止タイプ"
  | "AI疲れタイプ";

export type AnswerKey =
  | "info"
  | "decision"
  | "steps"
  | "emotion"
  | "noise"
  | "perfect"
  | "priority"
  | "expectation"
  | "holding"
  | "aiFatigue";

export type Question = {
  id: string;
  key: AnswerKey;
  text: string;
  options: Array<{
    label: string;
    value: number;
  }>;
};

export type DiagnosisResult = {
  type: DiagnosisType;
  summary: string;
  stateTranslation: string;
  commonActions: string[];
  nextAction: string;
  nextActionVariants?: string[];
  needNow: string;
  doNow: string[];
  avoid: string;
  lightLine: string;
  reassurance: string;
};

export type PersonalizedDiagnosis = DiagnosisResult & {
  inputReflection: string;
  quietQuestion: string;
};

export const questions: Question[] = [
  {
    id: "info-overload",
    key: "info",
    text: "調べるほど安心するより、頭の中がさらに散らかっていく感じがありますか？",
    options: [
      { label: "かなりある", value: 3 },
      { label: "少しある", value: 2 },
      { label: "今は薄い", value: 0 }
    ]
  },
  {
    id: "decision-regret",
    key: "decision",
    text: "選んだ後に後悔しそうで、決める直前に手が止まりますか？",
    options: [
      { label: "かなり止まる", value: 3 },
      { label: "少し止まる", value: 2 },
      { label: "あまりない", value: 0 }
    ]
  },
  {
    id: "steps-first",
    key: "steps",
    text: "全体像よりも、「まず何を開くか」「何を置くか」が見えない感じですか？",
    options: [
      { label: "かなり見えない", value: 3 },
      { label: "少し見えない", value: 2 },
      { label: "見えている", value: 0 }
    ]
  },
  {
    id: "emotion-fear",
    key: "emotion",
    text: "失敗そのものより、その後に自分を責めてしまいそうな怖さがありますか？",
    options: [
      { label: "かなりある", value: 3 },
      { label: "少しある", value: 2 },
      { label: "あまりない", value: 0 }
    ]
  },
  {
    id: "noise-interrupt",
    key: "noise",
    text: "通知、家の用事、周囲の気配で、思考が何度も途切れていますか？",
    options: [
      { label: "かなり途切れる", value: 3 },
      { label: "少し途切れる", value: 2 },
      { label: "あまりない", value: 0 }
    ]
  },
  {
    id: "perfect-rough",
    key: "perfect",
    text: "粗い状態を人に見せるくらいなら、まだ出さない方がいいと感じますか？",
    options: [
      { label: "かなり感じる", value: 3 },
      { label: "少し感じる", value: 2 },
      { label: "あまりない", value: 0 }
    ]
  },
  {
    id: "priority-carrying",
    key: "priority",
    text: "今日やらないことまで、頭の中でずっと持ち続けている感じがありますか？",
    options: [
      { label: "かなりある", value: 3 },
      { label: "少しある", value: 2 },
      { label: "今は少ない", value: 0 }
    ]
  },
  {
    id: "expectation-pressure",
    key: "expectation",
    text: "誰かの期待に応えようとして、始める前から少し疲れていますか？",
    options: [
      { label: "かなり疲れる", value: 3 },
      { label: "少し疲れる", value: 2 },
      { label: "あまりない", value: 0 }
    ]
  },
  {
    id: "holding-delegate",
    key: "holding",
    text: "本当は誰かに渡せることまで、自分だけで抱えている気がしますか？",
    options: [
      { label: "かなり抱えている", value: 3 },
      { label: "少し抱えている", value: 2 },
      { label: "あまりない", value: 0 }
    ]
  },
  {
    id: "ai-fatigue-output",
    key: "aiFatigue",
    text: "AIやツールの答えが増えるほど、選ぶ負荷が重くなっていますか？",
    options: [
      { label: "かなり重い", value: 3 },
      { label: "少し重い", value: 2 },
      { label: "あまりない", value: 0 }
    ]
  },
  {
    id: "emotion-visible",
    key: "emotion",
    text: "誰かに見られる前提になると、急に身体が固くなる感じがありますか？",
    options: [
      { label: "かなり固くなる", value: 3 },
      { label: "少し固くなる", value: 2 },
      { label: "あまりない", value: 0 }
    ]
  },
  {
    id: "steps-too-big",
    key: "steps",
    text: "やることが大きな塊のままで、5分サイズまで小さくできていない感じですか？",
    options: [
      { label: "かなり大きい", value: 3 },
      { label: "少し大きい", value: 2 },
      { label: "小さくできている", value: 0 }
    ]
  },
  {
    id: "info-open-tabs",
    key: "info",
    text: "開いた情報を閉じるタイミングが分からず、次の情報に移ってしまいますか？",
    options: [
      { label: "かなり移る", value: 3 },
      { label: "少し移る", value: 2 },
      { label: "あまりない", value: 0 }
    ]
  },
  {
    id: "priority-hidden",
    key: "priority",
    text: "本当に重いものを避けて、軽い用事から触ってしまうことがありますか？",
    options: [
      { label: "かなりある", value: 3 },
      { label: "少しある", value: 2 },
      { label: "あまりない", value: 0 }
    ]
  },
  {
    id: "expectation-kindness",
    key: "expectation",
    text: "相手をがっかりさせたくなくて、自分の余白を後回しにしていますか？",
    options: [
      { label: "かなり後回し", value: 3 },
      { label: "少し後回し", value: 2 },
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
  priority: ["優先", "多すぎ", "タスク", "どれから", "全部", "整理", "重要", "管理崩壊"],
  expectation: ["期待", "応え", "評価", "がっかり", "ちゃんとしなきゃ", "責任", "プレッシャー"],
  holding: ["抱え", "任せ", "頼れ", "相談", "全部自分", "手放", "依頼"],
  aiFatigue: ["ai", "AI", "chatgpt", "ChatGPT", "プロンプト", "ツール", "生成", "回答が多"]
};

export const resultMap: Record<AnswerKey, DiagnosisResult> = {
  info: {
    type: "情報過多タイプ",
    summary: "足りないのは情報ではなく、情報を閉じる基準です。",
    stateTranslation:
      "知ろうとしているのに、情報が増えるほど安心ではなく負荷が増えている状態かもしれません。選択肢が多いほど、脳は「まだ決めない方が安全」と感じやすくなります。",
    commonActions: ["調べるほど不安が増える", "比較表やレビューを何度も見返す", "始める前に別の情報を開く", "結論を出す直前でまた保留にする"],
    nextAction:
      "今日は、新しい情報を開かずに、今ある候補を3つだけ紙に出してください。その中から「5分だけ試せるもの」をひとつ選べたら十分です。",
    needNow: "今必要なのは、もっと知ることではなく、情報を閉じても大丈夫と思える小さな区切りかもしれません。",
    doNow: ["調べる時間を10分で止める", "候補を3つまで削る", "一番軽く試せる案を選ぶ"],
    avoid: "新しい記事や動画を開いて安心を買うこと。",
    lightLine: "光を増やすより、見る窓をひとつに絞る。",
    reassurance: "もう十分に集めています。今日は、少し閉じても大丈夫です。"
  },
  decision: {
    type: "判断過多タイプ",
    summary: "正解探しが長くなり、試す前の比較に体力を使っています。",
    stateTranslation:
      "決められないというより、選んだ後に後悔することや、誰かに説明しなければならない重さを先に背負っている状態かもしれません。",
    commonActions: ["候補を減らしてもまた増やしてしまう", "小さな違いまで比べ続ける", "決めた直後に別案が気になる", "失敗しない理由を探して時間が過ぎる"],
    nextAction:
      "今日は、判断基準を2つだけ書いてください。「戻せるか」「今いちばん軽いか」だけで仮決めして大丈夫です。",
    needNow: "今必要なのは、完璧な判断ではなく、あとで戻れる余白を残した小さな仮置きかもしれません。",
    doNow: ["基準を2つ書く", "候補をA/Bまで減らす", "小さく試してから決め直す"],
    avoid: "全条件を満たす選択肢が出るまで待つこと。",
    lightLine: "決断は扉ではなく、仮の灯りでもいい。",
    reassurance: "今すぐ正解にたどり着かなくても、仮決めから整えていけます。"
  },
  steps: {
    type: "手順不明タイプ",
    summary: "目標は見えていますが、最初の足場がまだ粗い状態です。",
    stateTranslation:
      "やる気がないのではなく、頭の中でゴールだけが大きく見えて、手元に置ける最初の動作がまだ見つかっていない状態です。",
    commonActions: ["全体像を考えるほど手が止まる", "準備が足りない気がする", "最初の一文や最初の画面で止まる", "段取りを考えているうちに疲れる"],
    nextAction:
      "今日は、完成まで考えずに最初の動詞だけ決めてください。開く、書く、置く、送る。そのどれか1つを5分だけで十分です。",
    needNow: "今必要なのは、完璧な地図ではなく、足を置ける小さな一段かもしれません。",
    doNow: ["必要な道具を1つ開く", "最初の1文か1項目だけ作る", "次の手順を動詞で書く"],
    avoid: "全体設計が完成してから始めようとすること。",
    lightLine: "道は歩く前に全部光らなくていい。",
    reassurance: "見えていないのは能力ではなく、最初の足場だけです。"
  },
  emotion: {
    type: "感情ブレーキタイプ",
    summary: "やり方よりも、失敗時の痛みを避ける力が強く働いています。",
    stateTranslation:
      "新しいことが怖いというより、否定されること、間違えること、自分を責めること。その後の感情処理が重くて、先に止まってしまう状態です。",
    commonActions: ["人に見せる前提だと止まる", "完璧な形を探してしまう", "「意味ある？」で急に手が止まる", "始める前に疲れた気持ちになる"],
    nextAction:
      "今日は、「誰にも見せない前提」で5分だけ思考整理の時間を作ってください。完成ではなく、動いた痕跡だけで十分です。",
    nextActionVariants: [
      "今日は、「誰にも見せない前提」で5分だけ思考整理の時間を作ってください。完成ではなく、動いた痕跡だけで十分です。",
      "今日は、誰かに説明するためではなく、自分のために5分だけ気持ちをほどく時間を置いてください。",
      "今日は、形にする前に5分だけ「何が怖いのか」を一文にする時間を作ってください。",
      "今日は、完成させる時間ではなく、頭の中を少し外へ出す5分だけを取ってください。",
      "今日は、うまくやる準備ではなく、今の不安に名前をつける5分だけで十分です。",
      "今日は、誰にも見せないメモとして、5分だけ思考を置く場所を作ってください。",
      "今日は、前に進むためではなく、止まっている理由をやさしく見る5分を取ってください。",
      "今日は、作業を始める前に5分だけ「戻せる範囲」を決めてください。",
      "今日は、完成ではなく、気持ちの重さを一段下げるための5分だけを作ってください。",
      "今日は、怖さを消そうとせず、5分だけ隣に置いて眺めてみてください。",
      "今日は、誰にも提出しない前提で、5分だけ言葉の下書きを置いてください。",
      "今日は、正しく進むためではなく、安心できる小さな入口を探す5分にしてください。",
      "今日は、失敗しない方法を探す前に、5分だけ「失敗しても戻れること」を書いてください。",
      "今日は、気合いを入れずに、5分だけ今の気持ちを箇条書きにしてください。",
      "今日は、成果を出す時間ではなく、自分を責めないための5分を先に置いてください。",
      "今日は、誰かの目線をいったん外して、5分だけ自分の現在地を書いてください。",
      "今日は、動けない理由を責めずに、5分だけその理由をそのまま書いてください。",
      "今日は、完成形を考える前に、5分だけ「これなら試せる」を一つ探してください。",
      "今日は、怖さの奥にある本音を、5分だけ静かに拾う時間を作ってください。",
      "今日は、前進の証拠ではなく、思考を少し軽くするための5分だけで大丈夫です。"
    ],
    needNow: "今必要なのは、やる気ではなく、「失敗しても大丈夫」と感じられる小さな安全地帯かもしれません。",
    doNow: ["誰にも出さない下書きを作る", "不安を1文で名前にする", "失敗しても戻せる範囲を決める"],
    avoid: "気合いで押し切ろうとして、さらに怖くすること。",
    lightLine: "怖さは敵ではなく、照らす順番を教える影です。",
    reassurance: "止まっていた時間も、ちゃんと自分を守ろうとしていた時間です。"
  },
  noise: {
    type: "環境ノイズタイプ",
    summary: "意志の問題ではなく、集中を削る条件が多すぎます。",
    stateTranslation:
      "集中できないのではなく、周囲の音、通知、用事、時間の細切れが、考えるための静けさを少しずつ奪っている状態かもしれません。",
    commonActions: ["通知を見るたびに流れが切れる", "家や周囲の用事で頭が戻らない", "作業タブが増えて現在地を失う", "短い空き時間だけで何とかしようとする"],
    nextAction:
      "今日は15分だけ通知を切り、作業タブを1つだけ残してください。集中できるか試すだけで、成果は出さなくて大丈夫です。",
    needNow: "今必要なのは、強い集中力ではなく、考えが途切れにくい小さな静けさかもしれません。",
    doNow: ["通知を一時停止する", "作業タブを1つにする", "15分タイマーを置く"],
    avoid: "騒がしい環境のまま集中力だけを責めること。",
    lightLine: "静けさは贅沢ではなく、考えるための足場です。",
    reassurance: "集中できない日があるのは、あなたの意志が弱いからではありません。"
  },
  perfect: {
    type: "完璧主義ロックタイプ",
    summary: "完成度の基準が高すぎて、試作品を出す前に固まっています。",
    stateTranslation:
      "質を大切にしているぶん、未完成の自分を見せることまで危険に感じている状態かもしれません。粗さを出すことと、あなたの価値が下がることは別です。",
    commonActions: ["下書きの時点で完成度を上げようとする", "人に見せる前に何度も直す", "60点の案を出すのが怖い", "公開や提出の直前で手が止まる"],
    nextAction:
      "今日は、「60点版」と名前をつけて1つだけ粗く置いてください。直すための素材を作るだけで十分です。",
    needNow: "今必要なのは、完成度ではなく、直せる前提で外に置くための小さな許可かもしれません。",
    doNow: ["60点でよい条件を3つ書く", "未完成ラベルを付ける", "1人だけに見せる"],
    avoid: "納得してから公開、という順番にこだわること。",
    lightLine: "未完成は失敗ではなく、光を入れる余白です。",
    reassurance: "粗いまま出しても、あなたの価値が粗くなるわけではありません。"
  },
  priority: {
    type: "優先順位迷子タイプ",
    summary: "タスク量に視界を奪われ、次の一点がぼやけています。",
    stateTranslation:
      "全部が大事に見えているとき、脳は優先順位をつける前に全体の重さを抱えてしまいます。選べないのではなく、同時に持ちすぎている状態です。",
    commonActions: ["タスクを書き出しても軽くならない", "どれも大事に見えて順番が決まらない", "小さい用事から逃げるように片づける", "今日やらないことまで頭に残る"],
    nextAction:
      "今日は、全部の中から「締切が近い」「5分で触れる」ものを1つだけ選んでください。選ばなかったものは、今日は持たなくて大丈夫です。",
    needNow: "今必要なのは、全部を管理する力ではなく、今日持つものをひとつに減らす安心かもしれません。",
    doNow: ["全部を書き出す", "今日やらないものに線を引く", "15分で進むものを1つ選ぶ"],
    avoid: "全タスクを同じ重要度で抱えること。",
    lightLine: "全部を照らすより、次の一歩だけ明るければ進めます。",
    reassurance: "全部を今日抱えなくても、ひとつ選べたら前に進んでいます。"
  },
  expectation: {
    type: "期待疲労タイプ",
    summary: "やること自体よりも、期待に応え続ける緊張で消耗しています。",
    stateTranslation:
      "期待されていることが嫌なのではなく、応えられなかった時の空気や、自分への失望を先に想像して疲れている状態かもしれません。",
    commonActions: ["頼まれると断る前に引き受ける", "相手の反応を考えすぎる", "期待値を下げる説明ができない", "始める前から失敗後の空気を想像する"],
    nextAction:
      "今日は、相手に見せる完成形ではなく、自分用の確認メモを3行だけ作ってください。期待に応える前に、まず自分の現在地を置ければ十分です。",
    needNow: "今必要なのは、期待に追いつく力ではなく、期待から少し距離を取れる小さな余白かもしれません。",
    doNow: ["自分用メモを3行書く", "今すぐ応えない返事を用意する", "期待値を1段下げる言葉を置く"],
    avoid: "相手の反応まで背負ったまま着手すること。",
    lightLine: "誰かの期待より先に、自分の呼吸を戻していい。",
    reassurance: "応えきれない日があっても、あなたが不誠実なわけではありません。"
  },
  holding: {
    type: "抱え込み停止タイプ",
    summary: "手放せるものまで持ち続けて、動く余白がなくなっています。",
    stateTranslation:
      "自分でやる方が早い、説明する方が面倒。そう思うほど、作業だけでなく判断や責任まで一人に集まりやすくなります。",
    commonActions: ["頼む前に自分で処理してしまう", "説明する時間が惜しくて抱える", "途中の状態を見せるのが苦手", "誰かに渡せる粒度まで分けられない"],
    nextAction:
      "今日は、全部を頼むのではなく「確認だけお願いできること」を1つ書いてください。渡す準備ではなく、渡せる場所を見つけるだけで十分です。",
    needNow: "今必要なのは、全部を片づける力ではなく、少しだけ外に置ける境界線かもしれません。",
    doNow: ["確認だけ頼めることを1つ書く", "自分でなくてもよい作業に印をつける", "途中の状態を1つ残す"],
    avoid: "説明できる形になるまで一人で整え続けること。",
    lightLine: "灯りは、ひとりで持ち続けなくても消えません。",
    reassurance: "手放すことは、責任を捨てることではありません。"
  },
  aiFatigue: {
    type: "AI疲れタイプ",
    summary: "答えを増やすほど、選ぶ負荷と焦りが強くなっています。",
    stateTranslation:
      "AIが便利だからこそ、候補、改善案、別案が一気に増えます。使えていないのではなく、生成された選択肢を受け止める器が先にいっぱいになっている状態です。",
    commonActions: ["プロンプトを直すほど迷いが増える", "複数案を見て結局選べない", "他の人のAI活用を見て焦る", "出力を読んだだけで作業した気になる"],
    nextAction:
      "今日は、AIに聞く前に「欲しい答えの形」を1行だけ書いてください。その1行に合わない出力は、読まずに閉じて大丈夫です。",
    needNow: "今必要なのは、さらに賢い使い方ではなく、受け取る量を小さくする入口かもしれません。",
    doNow: ["欲しい答えの形を1行で書く", "出力は1案だけ読む", "次に使う条件を先に決める"],
    avoid: "不安を減らすために、さらに別案を生成し続けること。",
    lightLine: "道具の光が強すぎる時は、少しだけ絞っていい。",
    reassurance: "AIを使いこなせない日があっても、置いていかれているわけではありません。"
  }
};

function createInputReflection(problem: string, result: DiagnosisResult): string {
  const cleaned = problem.replace(/\s+/g, " ").trim();
  if (!cleaned) {
    return "まだ言葉になりきっていない詰まりを、ここに少しだけ置こうとしている状態です。";
  }

  const clipped = cleaned.length > 42 ? `${cleaned.slice(0, 42)}...` : cleaned;
  return `入力してくれた「${clipped}」には、${result.summary}という流れが少し見えています。まずは全部を説明しきらなくて大丈夫です。`;
}

function createQuietQuestion(result: DiagnosisResult): string {
  if (result.type === "感情ブレーキタイプ") {
    return "もし誰にも見せなくていいなら、最初に少しだけ置けそうなものは何でしょう。";
  }
  if (result.type === "情報過多タイプ" || result.type === "AI疲れタイプ") {
    return "これ以上増やす前に、今あるものの中で一番軽く閉じられるものは何でしょう。";
  }
  if (result.type === "抱え込み停止タイプ") {
    return "全部ではなく、確認だけ誰かに渡せる部分はどこでしょう。";
  }
  if (result.type === "期待疲労タイプ") {
    return "期待に応える前に、自分の現在地として認めてもいいことは何でしょう。";
  }
  return "今の自分に、いちばん小さく渡せる一手は何でしょう。";
}

export function diagnose(problem: string, answers: Partial<Record<string, number>>): PersonalizedDiagnosis {
  const scores: Record<AnswerKey, number> = {
    info: 0,
    decision: 0,
    steps: 0,
    emotion: 0,
    noise: 0,
    perfect: 0,
    priority: 0,
    expectation: 0,
    holding: 0,
    aiFatigue: 0
  };

  for (const question of questions) {
    scores[question.key] += answers[question.id] ?? 0;
  }

  const normalized = problem.toLowerCase();
  for (const [key, keywords] of Object.entries(keywordScores) as Array<[AnswerKey, string[]]>) {
    for (const keyword of keywords) {
      if (normalized.includes(keyword.toLowerCase())) {
        scores[key] += 1;
      }
    }
  }

  const priorityOrder: AnswerKey[] = [
    "emotion",
    "expectation",
    "holding",
    "aiFatigue",
    "noise",
    "steps",
    "priority",
    "decision",
    "perfect",
    "info"
  ];
  const winner = priorityOrder.reduce((best, key) => {
    if (scores[key] > scores[best]) return key;
    return best;
  }, "steps" as AnswerKey);

  const result = resultMap[winner];
  return {
    ...result,
    inputReflection: createInputReflection(problem, result),
    quietQuestion: createQuietQuestion(result)
  };
}
