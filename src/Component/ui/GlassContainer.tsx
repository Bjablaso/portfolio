import type {ReactNode} from 'react';

interface GlassContainerProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'light' | 'dark' | 'colorful';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  tint?: string;
  gloss?: boolean;
  border?: boolean;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  containerDirection?: 'row' | 'column'
}

export function GlassContainer_two({
                                     children,
                                     className = '',
                                     variant = 'default',
                                     padding = 'md',
                                     blur = 'lg',
                                     tint,
                                     gloss = true,
                                     border = true,
                                     shadow = 'md',
                                      rounded='lg',
                                     containerDirection = 'row',
                                   }: GlassContainerProps) {

  const paddingStyles = {
    none: 'p-0',
    sm: 'px-2 py-0',
    md: 'px-3 py-1',
    lg: 'px-4 py-1.5',
  };

  const blurStyles = {
    sm:  'blur(8px)  saturate(140%) brightness(1.05)',
    md:  'blur(14px) saturate(160%) brightness(1.08)',
    lg:  'blur(20px) saturate(180%) brightness(1.1)',
    xl:  'blur(32px) saturate(200%) brightness(1.15)',
  };

  const shadowStyles = {
    none: 'none',
    sm:  '0 1px 4px rgba(0,0,0,0.15), 0 1px 0px rgba(255,255,255,0.25) inset, 0 -1px 0px rgba(0,0,0,0.1) inset',
    md:  '0 2px 8px rgba(0,0,0,0.25), 0 1px 0px rgba(255,255,255,0.35) inset, 0 -1px 0px rgba(0,0,0,0.15) inset',
    lg:  '0 4px 16px rgba(0,0,0,0.35), 0 1px 0px rgba(255,255,255,0.45) inset, 0 -1px 0px rgba(0,0,0,0.2) inset',
  };

  const roundedStyles = {
    none: 'rounded-none',
    sm:   'rounded-sm',
    md:   'rounded-md',
    lg:   'rounded-lg',
    xl:   'rounded-xl',
    full: 'rounded-full',
  };
    const directionStyles = {
        row: 'flex-row',
        column: 'flex-col',
    };

// in className:
    // replace hardcoded rounded-2xl

  const variantTint = {
    default:  'rgba(255,255,255,0.18)',
    light:    'rgba(255,255,255,0.28)',
    dark:     'rgba(0,0,0,0.25)',
    colorful: 'rgba(120,80,255,0.15)',
  };

  const resolvedTint = tint ?? variantTint[variant];

  return (
      <div
          className={`
        relative flex gap-2 rounded-2xl items-center overscroll-none overflow-hidden
        ${directionStyles[containerDirection]}
       ${border ? 'ring-1 ring-white/20 ring-inset' : ''}
         ${paddingStyles[padding]}
        ${roundedStyles[rounded ?? 'xl']}
        ${className}
      `}
          style={{
            background: `linear-gradient(135deg, ${resolvedTint} 0%, rgba(255,255,255,0.04) 100%)`,
            backdropFilter: blurStyles[blur],
            WebkitBackdropFilter: blurStyles[blur],
            boxShadow: shadowStyles[shadow],

          }}
      >
        {/* top gloss streak */}
        {gloss && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: '10%',
              width: '80%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}/>
        )}
        {children}
      </div>
  );
}