import { questions } from "@/lib/diagnosis";

const results = {
  info: {
    type: "情報過多タイプ",
    summary: "足りないのは情報ではなく、情報を閉じる基準です。",
    nextAction: "追加で調べる前に、今ある情報だけで仮の結論を1行にしてください。",
    reassurance: "もう十分に集めています。今日は、少し閉じても大丈夫です。",
    lightLine: "光を増やすより、見る窓をひとつに絞る。"
  },
  decision: {
    type: "判断過多タイプ",
    summary: "正解探しが長くなり、試す前の比較に体力を使っています。",
    nextAction: "判断基準を2つだけ決め、満たしたものを24時間だけ採用してください。",
    reassurance: "今すぐ正解にたどり着かなくても、仮決めから整えていけます。",
    lightLine: "決断は扉ではなく、仮の灯りでもいい。"
  },
  steps: {
    type: "手順不明タイプ",
    summary: "目標は見えていますが、最初の足場がまだ粗い状態です。",
    nextAction: "完成形ではなく、5分でできる最初の動作に分解してください。",
    reassurance: "見えていないのは能力ではなく、最初の足場だけです。",
    lightLine: "道は歩く前に全部光らなくていい。"
  },
  emotion: {
    type: "感情ブレーキタイプ",
    summary: "やり方よりも、失敗時の痛みを避ける力が強く働いています。",
    nextAction: "人に見せない前提で、失敗しても問題ない最小版を作ってください。",
    reassurance: "止まっていた時間も、ちゃんと自分を守ろうとしていた時間です。",
    lightLine: "怖さは敵ではなく、照らす順番を教える影です。"
  },
  noise: {
    type: "環境ノイズタイプ",
    summary: "意志の問題ではなく、集中を削る条件が多すぎます。",
    nextAction: "15分だけ通知と割り込みを切り、作業場所を一段静かにしてください。",
    reassurance: "集中できない日があるのは、あなたの意志が弱いからではありません。",
    lightLine: "静けさは贅沢ではなく、考えるための足場です。"
  },
  perfect: {
    type: "完璧主義ロックタイプ",
    summary: "完成度の基準が高すぎて、試作品を出す前に固まっています。",
    nextAction: "60点版を明示して、直すための素材として一度外に出してください。",
    reassurance: "粗いまま出しても、あなたの価値が粗くなるわけではありません。",
    lightLine: "未完成は失敗ではなく、光を入れる余白です。"
  },
  priority: {
    type: "優先順位迷子タイプ",
    summary: "タスク量に視界を奪われ、次の一点がぼやけています。",
    nextAction: "締切、影響、重さの3軸で並べ、最も軽く影響が出るものから触ってください。",
    reassurance: "全部を今日抱えなくても、ひとつ選べたら前に進んでいます。",
    lightLine: "全部を照らすより、次の一歩だけ明るければ進めます。"
  }
};

const mobileCss = `
html,body{margin:0;background:#071426!important}
body{overscroll-behavior:none}
.mw,.mw *{box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,"Hiragino Sans","Yu Gothic","YuGothic","Noto Sans JP",sans-serif!important;letter-spacing:0!important}
.mw{min-height:100svh;background:radial-gradient(circle at 78% 8%,rgba(232,215,165,.22),transparent 9rem),linear-gradient(180deg,#071426 0%,#0B1A2E 58%,#06101E 100%)!important;color:#F5F3EE!important}
.wrap{position:relative;width:100%;max-width:430px;min-height:100svh;margin:0 auto;padding:34px 20px 28px;display:flex;flex-direction:column}
.glow{position:absolute;right:26px;top:30px;width:96px;height:96px;border-radius:999px;background:radial-gradient(circle,rgba(232,215,165,.34),rgba(232,215,165,.08) 58%,transparent 72%);pointer-events:none}
.dot{position:absolute;right:60px;top:68px;width:8px;height:8px;border-radius:999px;background:#E8D7A5;box-shadow:0 0 30px rgba(232,215,165,.5)}
.line{position:absolute;left:64%;top:0;width:1px;height:100%;transform:rotate(18deg);background:linear-gradient(to bottom,transparent,rgba(232,215,165,.34),transparent)}
.k{position:relative;margin:0;color:#6F86A3!important;font-size:11px;font-weight:700;line-height:1.2;text-transform:uppercase;letter-spacing:.28em!important}
.hero{position:relative;margin-top:56px}.label{margin:0;color:#E8D7A5!important;font-size:12px;font-weight:700;line-height:1.4;letter-spacing:.16em!important}
.h{margin:16px 0 0;color:#F5F3EE!important;font-size:30px;font-weight:700;line-height:1.38}.copy{margin:20px 0 0;max-width:21rem;color:#C9CDD3!important;font-size:14px;line-height:1.95}
.card,.q,.help,.details{position:relative;margin-top:28px;border:1px solid rgba(232,215,165,.15);border-radius:22px;background:rgba(255,255,255,.06);backdrop-filter:blur(14px);box-shadow:0 18px 42px rgba(0,0,0,.14)}
.card,.q{padding:20px}.ft{display:block;color:#E8D7A5!important;font-size:14px;font-weight:700;line-height:1.7}
.ta{display:block;width:100%;min-height:128px;margin-top:14px;resize:none;border:1px solid rgba(232,215,165,.22);border-radius:16px;background:#0B1A2E!important;color:#F5F3EE!important;font-size:16px;line-height:1.75;padding:14px;outline:none}.ta::placeholder{color:rgba(201,205,211,.45)}
.note{margin:12px 0 0;color:rgba(201,205,211,.7)!important;font-size:12px;line-height:1.8}
.pr{display:flex;justify-content:space-between;gap:12px;color:#6F86A3!important;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.14em!important}
.track{height:4px;margin-top:14px;overflow:hidden;border-radius:999px;background:rgba(255,255,255,.1)}.bar{height:100%;border-radius:inherit;background:#E8D7A5;transition:width .3s ease}
.qt{margin:30px 0 0;color:#F5F3EE!important;font-size:19px;font-weight:700;line-height:1.75}
.answers{display:grid;gap:12px;margin-top:24px}.ans{width:100%;min-height:56px;border:1px solid rgba(255,255,255,.11);border-radius:999px;background:rgba(255,255,255,.07);color:#F5F3EE!important;font-size:15px;font-weight:700;text-align:center}.ans.sel{border-color:#E8D7A5;background:#E8D7A5;color:#071426!important;box-shadow:0 0 34px rgba(232,215,165,.24)}
.nav{display:flex;gap:12px;margin-top:20px}.nav button{flex:1;min-height:44px;border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(255,255,255,.04);color:#C9CDD3!important;font-size:13px;font-weight:700}.nav button:disabled{opacity:.35}
.bottom{margin-top:auto;padding-top:30px}.light{width:100%;min-height:56px;border:0;border-radius:999px;background:#E8D7A5;color:#071426!important;font-size:15px;font-weight:800;box-shadow:0 0 34px rgba(232,215,165,.24)}
.wait{margin:0;text-align:center;color:rgba(201,205,211,.68)!important;font-size:12px;line-height:1.9}
.hide{display:none!important}.result{display:flex;aspect-ratio:9/16;flex-direction:column;justify-content:space-between;overflow:hidden;margin-top:24px;border:1px solid rgba(232,215,165,.3);border-radius:22px;background:#0B1A2E;padding:24px}
.rt{margin:36px 0 0;color:#F5F3EE!important;font-size:30px;font-weight:700;line-height:1.3}.rs,.ra{color:#F5F3EE!important;font-size:16px;line-height:1.85}.rs{margin:20px 0 0}.block{border-left:2px solid #E8D7A5;padding-left:16px}.sl{margin:0;color:#E8D7A5!important;font-size:12px;font-weight:700;letter-spacing:.16em!important}.ra{margin:12px 0 0;font-weight:700}
.re{margin-top:24px;border:1px solid rgba(232,215,165,.25);border-radius:16px;background:rgba(232,215,165,.1);padding:16px}.re p,.ll{color:#E8D7A5!important}.re p{margin:0;font-size:16px;font-weight:700;line-height:1.85}.ll{margin:20px 0 0;font-size:14px;font-style:italic;line-height:1.8}
.help{padding:18px}.save,.reset{width:100%;min-height:48px;border-radius:999px;font-size:14px;font-weight:800}.save{margin-top:16px;border:1px solid rgba(232,215,165,.36);background:transparent;color:#E8D7A5!important}.reset{margin-top:16px;border:0;background:rgba(255,255,255,.05);color:#C9CDD3!important}
`;

const mobileJs = `
(() => {
  const qs = ${JSON.stringify(questions)};
  const results = ${JSON.stringify(results)};
  const scores = {info:0,decision:0,steps:0,emotion:0,noise:0,perfect:0,priority:0};
  let current = 0;
  let answers = {};
  const problem = document.getElementById('problem');
  const qbox = document.getElementById('qbox');
  const qtext = document.getElementById('qtext');
  const ans = document.getElementById('answers');
  const count = document.getElementById('count');
  const bar = document.getElementById('bar');
  const light = document.getElementById('light');
  const wait = document.getElementById('wait');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const form = document.getElementById('form');
  const result = document.getElementById('result');

  function renderQuestion() {
    const hasProblem = problem.value.trim().length > 0;
    qbox.classList.toggle('hide', !hasProblem);
    wait.classList.toggle('hide', hasProblem);
    if (!hasProblem) return;
    const q = qs[current];
    qtext.textContent = q.text;
    count.textContent = String(current + 1).padStart(2, '0') + ' / 07';
    bar.style.width = (((current + 1) / qs.length) * 100) + '%';
    ans.textContent = '';
    q.options.forEach((o) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = answers[q.id] === o.value ? 'ans sel' : 'ans';
      b.textContent = o.label;
      b.onclick = () => {
        answers[q.id] = o.value;
        if (current < qs.length - 1) {
          current += 1;
          setTimeout(renderQuestion, 160);
        } else {
          renderQuestion();
        }
      };
      ans.appendChild(b);
    });
    prev.disabled = current === 0;
    next.disabled = current === qs.length - 1;
    light.classList.toggle('hide', !(problem.value.trim() && Object.keys(answers).length === qs.length));
  }

  function diagnose() {
    Object.keys(scores).forEach((k) => scores[k] = answers[k] || 0);
    const text = problem.value.toLowerCase();
    const kw = {
      info:['調べ','情報','記事','動画','講座','比較','ai疲れ'],
      decision:['迷','選べ','決め','正解','どっち','判断'],
      steps:['何から','手順','進め方','始め','最初','やり方'],
      emotion:['怖','不安','恥','失敗','自信','緊張'],
      noise:['通知','忙','時間がない','集中','邪魔','疲'],
      perfect:['完璧','ちゃんと','まだ出せ','品質','納得'],
      priority:['優先','多すぎ','タスク','どれから','全部','整理']
    };
    Object.entries(kw).forEach(([k, list]) => list.forEach((w) => { if (text.includes(w.toLowerCase())) scores[k] += 1; }));
    return ['emotion','noise','steps','priority','decision','perfect','info'].reduce((best,k) => scores[k] > scores[best] ? k : best, 'steps');
  }

  function showResult() {
    const r = results[diagnose()];
    form.classList.add('hide');
    result.classList.remove('hide');
    document.getElementById('rtype').textContent = r.type;
    document.getElementById('rsummary').textContent = r.summary;
    document.getElementById('raction').textContent = r.nextAction;
    document.getElementById('rre').textContent = r.reassurance;
    document.getElementById('rline').textContent = r.lightLine;
    document.getElementById('date').textContent = new Intl.DateTimeFormat('ja-JP', {year:'numeric', month:'long', day:'numeric'}).format(new Date());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function savePng() {
    const node = document.getElementById('card');
    const c = document.createElement('canvas');
    c.width = 1080; c.height = 1920;
    const x = c.getContext('2d');
    x.fillStyle = '#0B1A2E'; x.fillRect(0,0,c.width,c.height);
    x.fillStyle = '#6F86A3'; x.font = '700 32px sans-serif'; x.fillText('ILLUME WORKS', 90, 130);
    x.fillStyle = '#E8D7A5'; x.font = '700 34px sans-serif'; x.fillText(document.getElementById('date').textContent, 90, 205);
    x.fillStyle = '#F5F3EE'; x.font = '700 68px sans-serif'; wrap(x, document.getElementById('rtype').textContent, 90, 360, 900, 82);
    x.font = '500 42px sans-serif'; wrap(x, document.getElementById('rsummary').textContent, 90, 560, 900, 64);
    x.fillStyle = '#E8D7A5'; x.font = '700 34px sans-serif'; x.fillText('今日の小さな灯り', 90, 910);
    x.fillStyle = '#F5F3EE'; x.font = '700 44px sans-serif'; wrap(x, document.getElementById('raction').textContent, 90, 1000, 900, 68);
    x.fillStyle = '#E8D7A5'; x.font = '700 42px sans-serif'; wrap(x, document.getElementById('rre').textContent, 90, 1370, 900, 68);
    const url = c.toDataURL('image/png');
    document.getElementById('preview').src = url;
    document.getElementById('preview').classList.remove('hide');
    document.getElementById('save-note').textContent = '共有シートが開いたら「画像を保存」を選んでください。下の画像を長押しして保存することもできます。';
    c.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], 'illume-light.png', { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] }) && navigator.share) {
        try {
          await navigator.share({
            files: [file],
            title: '今日の小さな灯り',
            text: '未来の自分へ残す小さな灯り'
          });
          return;
        } catch (error) {
          document.getElementById('save-note').textContent = '共有を閉じました。下の画像を長押しして「写真に保存」してください。';
          return;
        }
      }
      document.getElementById('save-note').textContent = '下の画像を長押しして「写真に保存」してください。';
    }, 'image/png');
  }
  function wrap(ctx, text, x, y, max, lh){let line=''; for (const ch of text){const t=line+ch; if(ctx.measureText(t).width>max && line){ctx.fillText(line,x,y); line=ch; y+=lh;} else line=t;} if(line) ctx.fillText(line,x,y);}

  problem.addEventListener('input', renderQuestion);
  prev.onclick = () => { current = Math.max(0, current - 1); renderQuestion(); };
  next.onclick = () => { current = Math.min(qs.length - 1, current + 1); renderQuestion(); };
  light.onclick = showResult;
  document.getElementById('save').onclick = savePng;
  document.getElementById('reset').onclick = () => {
    answers = {};
    current = 0;
    problem.value = '';
    document.getElementById('preview').classList.add('hide');
    document.getElementById('preview').removeAttribute('src');
    document.getElementById('save-note').textContent = '写真に残すには、共有シートで「画像を保存」を選びます。';
    result.classList.add('hide');
    form.classList.remove('hide');
    renderQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  renderQuestion();
})();
`;

export default function MobilePage() {
  return (
    <main className="mw">
      <style>{mobileCss}</style>
      <div className="wrap">
        <div className="glow" />
        <div className="dot" />
        <div className="line" />

        <div id="form" style={{ display: "flex", flexDirection: "column", minHeight: "calc(100svh - 62px)" }}>
          <p className="k">Illume Works</p>
          <section className="hero">
            <p className="label">One breath</p>
            <h1 className="h">今の詰まりを、<br />ひとつだけ置いてみる。</h1>
            <p className="copy">全部を説明しなくて大丈夫です。ここでは、今の状態を少しだけ静かに整理します。</p>
          </section>

          <section className="card">
            <label className="ft" htmlFor="problem">今、何に詰まっていますか？</label>
            <textarea id="problem" className="ta" placeholder="一言だけでも大丈夫です" maxLength={600} />
            <p className="note">外部送信も保存もしません</p>
          </section>

          <section id="qbox" className="q hide">
            <div className="pr"><span id="count">01 / 07</span><span>one breath</span></div>
            <div className="track"><div id="bar" className="bar" /></div>
            <p id="qtext" className="qt" />
            <div id="answers" className="answers" />
            <div className="nav">
              <button id="prev" type="button">戻る</button>
              <button id="next" type="button">次へ</button>
            </div>
          </section>

          <div className="bottom">
            <button id="light" type="button" className="light hide">今日の小さな灯りを見る</button>
            <p id="wait" className="wait">入力したら、ひとつずつ質問が出ます。<br />今はここまでで大丈夫です。</p>
          </div>
        </div>

        <div id="result" className="hide">
          <p className="k">Today's light</p>
          <section id="card" className="result">
            <div>
              <p className="k">Illume Works</p>
              <p id="date" className="label" style={{ marginTop: 12 }} />
              <h1 id="rtype" className="rt" />
              <p id="rsummary" className="rs" />
            </div>
            <div>
              <div className="block">
                <p className="sl">今日の小さな灯り</p>
                <p id="raction" className="ra" />
              </div>
              <div className="re"><p id="rre" /></div>
              <p id="rline" className="ll" />
            </div>
          </section>
          <section className="help">
            <p id="save-note" className="note">写真に残すには、共有シートで「画像を保存」を選びます。</p>
            <button id="save" type="button" className="save">写真に残す画面を開く🌙</button>
            <img id="preview" alt="今日の小さな灯りカード" className="hide" style={{ marginTop: 14, width: "100%", borderRadius: 16 }} />
            <button id="reset" type="button" className="reset">もう一度、静かに見直す</button>
          </section>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: mobileJs }} />
    </main>
  );
}
