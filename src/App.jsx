import {useEffect, useRef, useState} from 'react';
import Aurora from './components/Aurora/Aurora';
import GradientText from './components/GradientText/GradientText';
import ShinyText from './components/ShinyText/ShinyText';
import CountUp from './components/CountUp/CountUp';
import RotatingText from './components/RotatingText/RotatingText';
import SpotlightCard from './components/SpotlightCard/SpotlightCard';
import ScrollVelocity from './components/ScrollVelocity/ScrollVelocity';
import ClickSpark from './components/ClickSpark/ClickSpark';
import Magnet from './components/Magnet/Magnet';
import {ShineBorder} from './components/ui/shine-border';
import {RainbowButton} from './components/ui/rainbow-button';
import {CONFIG} from './config';

const SUNSET = ['#ff2e88', '#ff7a3d', '#ffb36b', '#c724b1', '#6a2bd9'];
const brl = (v) => v.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
const temCheckout = CONFIG.checkout.startsWith('http');
const linkCompra = temCheckout ? CONFIG.checkout : '#oferta';

/* ---------- peças ---------- */
const Etiqueta = ({children}) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-pessego backdrop-blur">
    {children}
  </span>
);

const Titulo = ({children, className = ''}) => (
  <h2 className={`font-display text-[clamp(2.4rem,6vw,4.2rem)] uppercase leading-[0.95] tracking-wide ${className}`}>{children}</h2>
);

const Cta = ({children, className = ''}) => (
  <ClickSpark sparkColor="#ffb36b" sparkCount={10} sparkRadius={34} className="inline-block">
    <Magnet padding={60} magnetStrength={4}>
      <RainbowButton href={linkCompra} className={className}>{children}</RainbowButton>
    </Magnet>
  </ClickSpark>
);

const Palmeiras = ({className = ''}) => (
  <svg className={`pointer-events-none absolute bottom-0 ${className}`} viewBox="0 0 400 420" fill="#0d0618" aria-hidden="true">
    <path d="M190 420 C 196 300 206 200 228 110 L 238 112 C 218 200 210 300 206 420 Z" />
    {[-60, -25, 10, 45, 80, 120, 160].map((a, i) => (
      <path key={i} transform={`translate(232 108) rotate(${a + 180})`} d="M0 0 Q 70 -46 170 12 Q 84 -10 0 9 Z" />
    ))}
    <path d="M70 420 C 76 340 84 280 100 220 L 108 222 C 94 280 88 340 86 420 Z" />
    {[-50, -10, 30, 70, 120].map((a, i) => (
      <path key={'b' + i} transform={`translate(104 218) rotate(${a + 180})`} d="M0 0 Q 50 -32 120 8 Q 60 -6 0 6 Z" />
    ))}
  </svg>
);

function useContagem(alvoISO) {
  const alvo = new Date(alvoISO).getTime();
  const [agora, setAgora] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setAgora(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const ms = Math.max(0, alvo - agora);
  return {
    acabou: ms === 0,
    d: Math.floor(ms / 864e5),
    h: Math.floor(ms / 36e5) % 24,
    m: Math.floor(ms / 6e4) % 60,
    s: Math.floor(ms / 1e3) % 60,
  };
}

/* ---------- seções ---------- */
function Topo({c}) {
  return (
    <div className="relative z-20 bg-gradient-to-r from-rosa via-laranja to-magenta px-4 py-2 text-center text-sm font-extrabold text-noite">
      {c.acabou ? '🎮 O GTA 6 saiu: a corrida dos cortes começou' : `🎮 GTA 6 chega em 19/11 · faltam ${c.d} dias · quem tiver o canal de cortes pronto sai na frente`}
    </div>
  );
}

function Hero() {
  const vid = useRef(null);
  const [mudo, setMudo] = useState(true);
  const alternaSom = () => {
    const v = vid.current;
    v.muted = !v.muted;
    if (!v.muted) { v.currentTime = 0; v.play(); }
    setMudo(v.muted);
  };
  return (
    <header className="relative overflow-hidden bg-gradient-to-b from-noite via-noite2 to-[#2a0b3d]">
      <div className="absolute inset-0 opacity-90">
        <Aurora colorStops={['#6a2bd9', '#ff2e88', '#ff7a3d']} amplitude={1.1} blend={0.6} speed={0.8} layers={2} mouseInteraction={false} />
      </div>
      {/* sol de Vice City */}
      <div className="pointer-events-none absolute left-1/2 top-[52%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-b from-pessego via-laranja to-rosa opacity-70 blur-[2px] [mask-image:repeating-linear-gradient(180deg,#000_0_34px,transparent_34px_44px)] md:left-[72%]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-noite to-transparent" />
      <Palmeiras className="-left-10 w-[260px] md:w-[360px]" />
      <Palmeiras className="-right-16 w-[240px] -scale-x-100 md:w-[340px]" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-4 pb-24 pt-14 md:grid-cols-[1.15fr_0.85fr] md:pt-20">
        <div className="text-center md:text-left">
          <Etiqueta>✂ Skill para o Claude Code</Etiqueta>
          <h1 className="mt-6 font-display text-[clamp(3rem,8.5vw,6.2rem)] uppercase leading-[0.92] tracking-wide">
            Sua live de GTA 6 vira
            <span className="mt-2 block">
              <RotatingText
                texts={['vários Shorts', 'cortes prontos', 'Reels e TikToks']}
                mainClassName="inline-flex whitespace-nowrap text-[0.78em] leading-[1.2] overflow-hidden rounded-xl bg-gradient-to-r from-rosa to-laranja px-4 pt-1 pb-1 text-noite"
                splitLevelClassName="overflow-hidden pt-[0.12em] pb-[0.04em]"
                staggerDuration={0.02}
                staggerFrom="last"
                rotationInterval={2400}
                splitBy="characters"
              />
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg font-medium text-white/85 md:mx-0">
            Você manda o link da live ou do podcast. A <strong className="text-white">Máquina de Cortes</strong> transcreve, acha os melhores ganchos e entrega os cortes no formato metade streamer, metade gameplay, com legenda palavra por palavra, zoom e a sua marca d'água.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 md:flex-row md:items-center">
            <Cta>Quero a máquina ✂</Cta>
            <span className="text-sm font-bold text-white/60">Acesso imediato · pagamento único</span>
          </div>
        </div>

        <div className="relative mx-auto w-[min(300px,78vw)]">
          <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-b from-rosa/50 to-roxo/40 blur-3xl" />
          <div className="relative aspect-[9/16] rotate-2 overflow-hidden rounded-[2.4rem] border border-white/10 bg-black shadow-2xl">
            <ShineBorder borderWidth={4} duration={8} shineColor={SUNSET} />
            <video ref={vid} src="video.mp4" poster="capa.jpg" autoPlay muted loop playsInline preload="metadata" className="h-full w-full object-cover" />
            <button type="button" onClick={alternaSom}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-4 py-2 text-sm font-extrabold text-noite shadow-lg backdrop-blur">
              {mudo ? '🔊 Ativar som' : '🔇 Silenciar'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function Faixa() {
  return (
    <div className="relative z-10 -rotate-2 border-y-2 border-noite bg-gradient-to-r from-rosa via-laranja to-pessego py-3 text-noite">
      <ScrollVelocity
        texts={['GTA 6 · CORTES · SHORTS · 19/11 · ']}
        velocity={60}
        numCopies={6}
        fontSize="clamp(1.6rem,4vw,2.6rem)"
        className="font-display uppercase tracking-wider"
      />
    </div>
  );
}

function Contagem({c}) {
  const caixa = (n, l) => (
    <div className="min-w-[72px] rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-center backdrop-blur md:min-w-[96px]">
      <div className="font-display text-4xl tabular-nums md:text-6xl">{String(n).padStart(2, '0')}</div>
      <div className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-pessego">{l}</div>
    </div>
  );
  if (c.acabou) return null;
  return (
    <section className="px-4 pb-6 pt-20 text-center">
      <Etiqueta>Lançamento em Leonida</Etiqueta>
      <div className="mt-6 flex justify-center gap-3 md:gap-5">
        {caixa(c.d, 'dias')}{caixa(c.h, 'horas')}{caixa(c.m, 'min')}{caixa(c.s, 'seg')}
      </div>
    </section>
  );
}

function Numero() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20 text-center">
      <p className="font-script text-4xl text-pessego md:text-5xl">o hype é real</p>
      <div className="mt-2 font-display text-[clamp(3.4rem,13vw,9rem)] leading-none">
        <GradientText colors={SUNSET} animationSpeed={6}>
          <CountUp to={475000000} separator="." duration={2.5} />
        </GradientText>
      </div>
      <p className="mt-4 text-xl font-extrabold uppercase tracking-wide md:text-2xl">views do trailer 2 em 24 horas</p>
      <p className="mt-2 text-sm text-white/50">somando todas as plataformas, segundo a Rockstar</p>
      <p className="mx-auto mt-8 max-w-2xl text-lg text-white/80">
        No lançamento, todo mundo vai procurar GTA 6. Quem posta primeiro aparece primeiro. E cortar na mão leva horas por vídeo.
      </p>
    </section>
  );
}

function AntesDepois() {
  const itensA = ['Assistir horas de live atrás do momento bom', 'Legendar palavra por palavra no editor', 'Montar o layout vertical corte por corte', 'Postar quando o assunto já esfriou'];
  const itensB = ['A skill lê a live inteira e acha os ganchos', 'Legenda palavra por palavra automática', 'Layout metade streamer, metade vídeo', 'Vários cortes prontos de uma vez'];
  return (
    <section className="mx-auto grid max-w-5xl gap-6 px-4 pb-20 md:grid-cols-2">
      <SpotlightCard className="rounded-3xl border border-white/10 bg-white/[0.03] p-8" spotlightColor="rgba(255,255,255,0.12)">
        <h3 className="font-display text-3xl uppercase text-white/70">😩 Cortando na mão</h3>
        <ul className="mt-5 space-y-3">{itensA.map((t) => <li key={t} className="flex gap-3 font-bold text-white/60"><span className="text-rosa">✕</span>{t}</li>)}</ul>
      </SpotlightCard>
      <SpotlightCard className="rounded-3xl border border-rosa/40 bg-gradient-to-br from-rosa/15 to-laranja/10 p-8" spotlightColor="rgba(255,122,61,0.35)">
        <h3 className="font-display text-3xl uppercase">😎 Com a Máquina de Cortes</h3>
        <ul className="mt-5 space-y-3">{itensB.map((t) => <li key={t} className="flex gap-3 font-bold"><span className="text-ciano">✓</span>{t}</li>)}</ul>
      </SpotlightCard>
    </section>
  );
}

function Passos() {
  const passos = [
    ['Manda o link', 'Cola o link da live, do podcast ou o arquivo de vídeo no Claude Code.'],
    ['Ela transcreve', 'Transcrição no seu computador e uma lista dos melhores momentos para você aprovar.'],
    ['Corta e edita', "Corta as pausas, põe legenda palavra por palavra, zoom e a sua marca d'água."],
    ['Shorts prontos', 'Sai um MP4 vertical por assunto, cada um com um gancho diferente.'],
  ];
  return (
    <section id="como" className="relative overflow-hidden bg-gradient-to-b from-noite via-[#1e0a3a] to-noite px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <Etiqueta>Como funciona</Etiqueta>
          <Titulo className="mt-5">4 passos e os cortes <GradientText colors={SUNSET} className="inline-flex">saem prontos</GradientText></Titulo>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {passos.map(([t, d], i) => (
            <SpotlightCard key={t} className="rounded-3xl border border-white/10 bg-white/[0.04] p-7" spotlightColor="rgba(255,46,136,0.3)">
              <div className="font-display text-6xl leading-none">
                <GradientText colors={SUNSET} animationSpeed={5}>0{i + 1}</GradientText>
              </div>
              <h3 className="mt-4 font-display text-2xl uppercase tracking-wide">{t}</h3>
              <p className="mt-2 font-medium text-white/70">{d}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function Recebe() {
  const itens = [
    'A skill Máquina de Cortes GTA completa, pronta para instalar',
    'Instalador de um comando para Windows, macOS e Linux',
    'Ganchos e estilos de corte já configurados para conteúdo de GTA',
    'Efeitos sonoros opcionais (whoosh, impacto, pop)',
    'Guia de instalação e solução dos problemas mais comuns',
    'Atualizações da skill sem custo extra',
  ];
  const req = [
    'Um computador (Windows, macOS ou Linux)',
    'Claude Code instalado (precisa de um plano pago do Claude)',
    'Node.js 18+, FFmpeg e yt-dlp (o instalador confere tudo)',
    'Cerca de 1 GB livre para as ferramentas de edição',
    'Opcional: conta na ElevenLabs para os efeitos sonoros',
  ];
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-4 py-24 md:grid-cols-2">
      <div>
        <Etiqueta>O que você recebe</Etiqueta>
        <Titulo className="mt-5">Tudo para começar hoje</Titulo>
        <ul className="mt-8 space-y-4">
          {itens.map((t) => (
            <li key={t} className="flex items-start gap-4 border-b border-white/10 pb-4 text-lg font-bold">
              <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-gradient-to-br from-rosa to-laranja text-noite">✓</span>{t}
            </li>
          ))}
        </ul>
      </div>
      <SpotlightCard className="self-start rounded-3xl border border-ciano/30 bg-ciano/[0.06] p-8" spotlightColor="rgba(25,211,230,0.25)">
        <h3 className="font-display text-3xl uppercase">⚙ O que você precisa ter</h3>
        <ul className="mt-5 space-y-3">{req.map((t) => <li key={t} className="flex gap-3 font-semibold text-white/85"><span className="text-ciano">→</span>{t}</li>)}</ul>
        <p className="mt-6 text-sm font-medium text-white/60">Funciona melhor com uma pessoa falando de frente para a câmera. A skill não publica nada por você: os cortes ficam no seu computador.</p>
      </SpotlightCard>
    </section>
  );
}

function Oferta() {
  return (
    <section id="oferta" className="relative overflow-hidden px-4 py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-noite via-[#3a0d4a] to-[#ff2e88]/30" />
      <div className="relative mx-auto max-w-xl text-center">
        <Etiqueta>Oferta de lançamento</Etiqueta>
        <Titulo className="mt-5">Pague uma vez. Corte quantas lives quiser.</Titulo>
        <div className="relative mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-noite/80 p-8 backdrop-blur md:p-10">
          <ShineBorder borderWidth={3} duration={10} shineColor={SUNSET} />
          {CONFIG.precoDe && <p className="text-lg font-bold text-white/50 line-through">de {brl(CONFIG.precoDe)}</p>}
          <div className="my-2 font-display text-[clamp(4rem,14vw,6rem)] leading-none">
            <GradientText colors={SUNSET} animationSpeed={4}>{brl(CONFIG.preco)}</GradientText>
          </div>
          {CONFIG.parcelas && <p className="font-bold text-white/80">ou em até {CONFIG.parcelas}x no cartão</p>}
          <div className="mt-8"><Cta className="w-full">Quero minha máquina ✂</Cta></div>
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs font-extrabold uppercase tracking-wider text-white/70">
            <span className="rounded-full bg-white/5 px-3 py-1.5">🔒 Pagamento seguro</span>
            <span className="rounded-full bg-white/5 px-3 py-1.5">⚡ Acesso imediato</span>
            <span className="rounded-full bg-white/5 px-3 py-1.5">💳 Pix ou cartão</span>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center gap-5 md:flex-row md:text-left">
          <div className="grid h-24 w-24 flex-none place-items-center rounded-full bg-gradient-to-br from-pessego to-rosa text-center font-display text-xl uppercase leading-none text-noite">
            {CONFIG.garantiaDias}<br />dias
          </div>
          <p className="font-medium text-white/85"><strong className="text-white">Garantia incondicional.</strong> Se não gostar, peça o reembolso em até {CONFIG.garantiaDias} dias pela própria plataforma de pagamento e receba 100% do valor de volta, sem perguntas.</p>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const perguntas = [
    ['Preciso saber programar?', 'Não. Você instala com um comando e usa conversando com o Claude Code, em português. Ele roda os comandos e só pede sua aprovação.'],
    ['Funciona com qualquer live?', 'Funciona com lives, podcasts e vídeos longos do YouTube (por link) ou com arquivos de vídeo. O resultado é melhor com uma pessoa falando de frente para a câmera e pouca sobreposição de vozes.'],
    ['Quanto tempo leva para gerar os cortes?', 'Depende do seu computador e do tamanho do vídeo. A transcrição e o render rodam na sua máquina; um corte de 40 segundos costuma levar alguns minutos para renderizar.'],
    ['Tem mensalidade?', 'Não. A skill é pagamento único. Você só precisa ter o seu próprio acesso ao Claude Code, cobrado à parte pela Anthropic.'],
    ['Posso cortar lives de outros streamers?', 'A ferramenta corta qualquer vídeo, mas a responsabilidade pelo conteúdo é sua: use vídeos seus ou de criadores que liberam cortes, e respeite os direitos autorais e as regras de cada plataforma.'],
    ['Vou ganhar dinheiro com isso?', 'A skill acelera a produção dos cortes, mas não garante views nem renda. O resultado depende do seu canal, da constância e das regras de monetização de cada plataforma.'],
    ['Como recebo o produto?', 'Logo após o pagamento você recebe o acesso por e-mail, com o arquivo da skill e o passo a passo de instalação.'],
  ];
  return (
    <section className="mx-auto max-w-3xl px-4 py-24">
      <div className="text-center"><Etiqueta>Dúvidas</Etiqueta><Titulo className="mt-5">Perguntas frequentes</Titulo></div>
      <div className="mt-10 space-y-3">
        {perguntas.map(([q, a]) => (
          <details key={q} className="group rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-5 open:border-rosa/40 open:bg-rosa/[0.06]">
            <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg font-extrabold">
              {q}<span className="font-display text-2xl text-rosa transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 font-medium text-white/75">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Final() {
  return (
    <section className="relative overflow-hidden px-4 pb-28 pt-24 text-center">
      <div className="absolute inset-0 opacity-80">
        <Aurora colorStops={['#ff7a3d', '#ff2e88', '#6a2bd9']} amplitude={1.3} speed={0.6} direction="bottom" mouseInteraction={false} />
      </div>
      <div className="relative">
        <p className="font-script text-4xl text-pessego">bem-vindo a Leonida</p>
        <Titulo className="mt-2 text-[clamp(2.8rem,8vw,5.5rem)]">O GTA 6 não vai esperar</Titulo>
        <p className="mx-auto mt-5 max-w-xl text-lg font-semibold text-white/85">
          <ShinyText text="Deixe a máquina pronta antes do dia 19 e poste os primeiros cortes." color="#ffd9e8" shineColor="#ffffff" speed={3} />
        </p>
        <div className="mt-10"><Cta>Garantir a minha agora ✂</Cta></div>
      </div>
    </section>
  );
}

function Rodape() {
  return (
    <footer className="border-t border-white/10 bg-black/40 px-4 pb-28 pt-10 text-center text-xs leading-relaxed text-white/50 md:pb-10">
      <p>Máquina de Cortes GTA · Todos os direitos reservados.</p>
      <p className="mx-auto mt-2 max-w-3xl">GTA e Grand Theft Auto são marcas da Rockstar Games / Take-Two Interactive. Este produto é independente e não tem vínculo com elas nem com a Anthropic. Claude e Claude Code são marcas da Anthropic.</p>
      <p className="mt-2">Resultados variam. Este produto não garante visualizações, seguidores ou renda.</p>
    </footer>
  );
}

function BarraCelular() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-between gap-3 border-t border-white/10 bg-noite/90 px-4 py-3 backdrop-blur md:hidden">
      <div>
        <div className="text-[11px] font-bold uppercase tracking-wider text-white/60">Pagamento único</div>
        <div className="font-display text-2xl text-pessego">{brl(CONFIG.preco)}</div>
      </div>
      <a href={linkCompra} className="rounded-xl bg-gradient-to-r from-rosa to-laranja px-5 py-3 font-extrabold uppercase text-noite">Quero ✂</a>
    </div>
  );
}

export default function App() {
  const c = useContagem(CONFIG.lancamento);
  return (
    <main>
      <Topo c={c} />
      <Hero />
      <Faixa />
      <Contagem c={c} />
      <Numero />
      <AntesDepois />
      <Passos />
      <Recebe />
      <Oferta />
      <Faq />
      <Final />
      <Rodape />
      <BarraCelular />
    </main>
  );
}
