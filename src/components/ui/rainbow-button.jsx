// Rainbow Button (Magic UI, MIT) — via 21st.dev. Adaptado para JSX, renderiza um <a>.
import {cn} from '@/lib/utils';

export function RainbowButton({className, children, ...props}) {
  return (
    <a
      className={cn(
        'relative cursor-pointer group transition-all animate-rainbow inline-flex items-center justify-center gap-2 shrink-0 outline-none focus-visible:ring-[3px] focus-visible:ring-white/70 whitespace-nowrap',
        'border-0 bg-[linear-gradient(#140a26,#140a26),linear-gradient(#140a26_50%,rgba(20,10,38,0.6)_80%,rgba(20,10,38,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] bg-[length:200%] text-white [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.15rem)_solid_transparent]',
        'before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] before:bg-[length:200%] before:[filter:blur(0.75rem)]',
        'rounded-2xl h-14 px-8 text-lg font-extrabold uppercase tracking-wide hover:scale-[1.03] active:scale-[0.98]',
        className,
      )}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </a>
  );
}
