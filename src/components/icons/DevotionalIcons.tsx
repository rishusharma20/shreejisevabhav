interface IconProps {
  className?: string;
  size?: number;
}

export function LotusIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Center petal */}
      <path
        d="M32 6C32 6 24 18 24 34C24 44 28 48 32 48C36 48 40 44 40 34C40 18 32 6 32 6Z"
        fill="currentColor"
        opacity="0.9"
      />
      {/* Left petal */}
      <path
        d="M32 18C28 22 16 28 16 38C16 46 22 48 27 46C32 44 32 38 32 38Z"
        fill="currentColor"
        opacity="0.75"
      />
      {/* Right petal */}
      <path
        d="M32 18C36 22 48 28 48 38C48 46 42 48 37 46C32 44 32 38 32 38Z"
        fill="currentColor"
        opacity="0.75"
      />
      {/* Outer left petal */}
      <path
        d="M25 28C20 32 10 34 10 42C10 48 14 50 20 48C24 46 25 42 25 42Z"
        fill="currentColor"
        opacity="0.5"
      />
      {/* Outer right petal */}
      <path
        d="M39 28C44 32 54 34 54 42C54 48 50 50 44 48C40 46 39 42 39 42Z"
        fill="currentColor"
        opacity="0.5"
      />
      {/* Stem */}
      <path
        d="M32 48V58"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}

export function PeacockFeatherIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Feather shaft */}
      <path
        d="M24 0C24 0 24 60 24 80"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.5"
      />
      {/* Eye - outer */}
      <ellipse cx="24" cy="24" rx="14" ry="20" fill="currentColor" opacity="0.2" />
      {/* Eye - middle */}
      <ellipse cx="24" cy="22" rx="9" ry="13" fill="currentColor" opacity="0.4" />
      {/* Eye - inner */}
      <ellipse cx="24" cy="20" rx="5" ry="7" fill="currentColor" opacity="0.7" />
      {/* Eye - center dot */}
      <circle cx="24" cy="18" r="2.5" fill="currentColor" opacity="0.9" />
      {/* Barbs left */}
      <path d="M10 30C14 28 20 26 24 24" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <path d="M8 40C14 36 20 32 24 30" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      {/* Barbs right */}
      <path d="M38 30C34 28 28 26 24 24" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <path d="M40 40C34 36 28 32 24 30" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
    </svg>
  );
}

export function DiyaIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Flame */}
      <path
        d="M32 8C32 8 26 18 26 24C26 28 28.5 30 32 30C35.5 30 38 28 38 24C38 18 32 8 32 8Z"
        fill="currentColor"
        opacity="0.8"
      />
      {/* Flame inner */}
      <path
        d="M32 14C32 14 29 20 29 23C29 25.5 30.5 27 32 27C33.5 27 35 25.5 35 23C35 20 32 14 32 14Z"
        fill="currentColor"
        opacity="0.5"
      />
      {/* Diya bowl */}
      <path
        d="M16 36C16 36 14 44 20 48C24 50 26 50 32 50C38 50 40 50 44 48C50 44 48 36 48 36Z"
        fill="currentColor"
        opacity="0.6"
      />
      {/* Diya rim */}
      <ellipse cx="32" cy="36" rx="16" ry="4" fill="currentColor" opacity="0.8" />
      {/* Wick */}
      <line x1="32" y1="30" x2="32" y2="36" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      {/* Base */}
      <ellipse cx="32" cy="52" rx="10" ry="3" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

export function BellIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Bell body */}
      <path
        d="M32 8L32 12M32 12C22 12 16 22 16 34L14 42H50L48 34C48 22 42 12 32 12Z"
        fill="currentColor"
        opacity="0.7"
      />
      {/* Bell rim */}
      <path
        d="M12 42C12 42 12 48 22 48H42C52 48 52 42 52 42"
        fill="currentColor"
        opacity="0.5"
      />
      {/* Clapper */}
      <circle cx="32" cy="52" r="4" fill="currentColor" opacity="0.8" />
      {/* Top ring */}
      <circle cx="32" cy="8" r="3" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6" />
    </svg>
  );
}

export function MandalaIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer circle */}
      <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      {/* Inner circles */}
      <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="0.75" opacity="0.25" />
      <circle cx="60" cy="60" r="25" stroke="currentColor" strokeWidth="0.75" opacity="0.2" />
      <circle cx="60" cy="60" r="10" fill="currentColor" opacity="0.15" />
      {/* Radial petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <path
          key={angle}
          d="M60 20C55 30 55 35 60 40C65 35 65 30 60 20Z"
          fill="currentColor"
          opacity="0.2"
          transform={`rotate(${angle} 60 60)`}
        />
      ))}
      {/* Decorative dots */}
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <circle
          key={`dot-${angle}`}
          cx="60"
          cy="15"
          r="2"
          fill="currentColor"
          opacity="0.3"
          transform={`rotate(${angle} 60 60)`}
        />
      ))}
    </svg>
  );
}

export function TempleArchIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Arch */}
      <path
        d="M10 100V40C10 18 40 4 40 4C40 4 70 18 70 40V100"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.6"
        fill="none"
      />
      {/* Inner arch */}
      <path
        d="M20 100V48C20 30 40 18 40 18C40 18 60 30 60 48V100"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
        fill="none"
      />
      {/* Top finial */}
      <circle cx="40" cy="4" r="3" fill="currentColor" opacity="0.5" />
      {/* Base line */}
      <line x1="5" y1="100" x2="75" y2="100" stroke="currentColor" strokeWidth="2" opacity="0.4" />
    </svg>
  );
}

export function OmIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <text
        x="32"
        y="46"
        textAnchor="middle"
        fill="currentColor"
        fontSize="42"
        fontFamily="serif"
        opacity="0.8"
      >
        ॐ
      </text>
    </svg>
  );
}

export function FullColorPeacockFeather({ size = 200, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size * 1.875}
      viewBox="0 0 160 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Stem/shaft */}
      <path d="M80 290 C78 220 70 120 80 10" stroke="#B8943F" strokeWidth="3" strokeLinecap="round" />
      
      {/* Barbs / fronds at an angle along the shaft (curved and tapering) */}
      {/* Left barbs */}
      <path d="M78 250 C55 230 40 210 25 180" stroke="#1A8A7D" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
      <path d="M77 220 C50 200 35 175 20 145" stroke="#FF9933" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <path d="M76 190 C45 170 30 140 18 110" stroke="#1A8A7D" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
      <path d="M75 160 C42 140 28 110 15 75" stroke="#2AAFA0" strokeWidth="1.2" opacity="0.6" strokeLinecap="round" />
      <path d="M75 130 C40 110 25 80 15 45" stroke="#D4A853" strokeWidth="1.2" opacity="0.6" strokeLinecap="round" />
      <path d="M76 100 C42 80 28 50 20 20" stroke="#1A8A7D" strokeWidth="1" opacity="0.7" strokeLinecap="round" />

      {/* Right barbs */}
      <path d="M82 250 C105 230 120 210 135 180" stroke="#1A8A7D" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
      <path d="M83 220 C110 200 125 175 140 145" stroke="#FF9933" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <path d="M84 190 C115 170 130 140 142 110" stroke="#1A8A7D" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
      <path d="M85 160 C118 140 132 110 145 75" stroke="#2AAFA0" strokeWidth="1.2" opacity="0.6" strokeLinecap="round" />
      <path d="M85 130 C120 110 135 80 145 45" stroke="#D4A853" strokeWidth="1.2" opacity="0.6" strokeLinecap="round" />
      <path d="M84 100 C118 80 132 50 140 20" stroke="#1A8A7D" strokeWidth="1" opacity="0.7" strokeLinecap="round" />

      {/* Teardrop-shaped Eye at the top/tip */}
      <g transform="translate(80, 50) rotate(-5)">
        {/* Outer gold teardrop (pointy end down) */}
        <path d="M0 -35 C-22 -35 -22 15 0 25 C22 15 22 -35 0 -35 Z" fill="url(#eyeGold)" />
        {/* Outer green teardrop */}
        <path d="M0 -27 C-16 -27 -16 10 0 18 C16 10 16 -27 0 -27 Z" fill="url(#eyeGreen)" />
        {/* Inner blue teardrop */}
        <path d="M0 -18 C-10 -18 -10 5 0 10 C10 5 10 -18 0 -18 Z" fill="url(#eyeBlue)" />
        {/* Center deep purple/black crescent/heart */}
        <path d="M0 -8 C-6 -8 -6 0 0 4 C6 0 6 -8 0 -8 Z" fill="#0C0D2B" />
        <circle cx="-2" cy="-2" r="1.5" fill="#FFFFFF" opacity="0.8" />
      </g>

      <defs>
        <linearGradient id="eyeGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F5D77F" />
          <stop offset="100%" stopColor="#C98B27" />
        </linearGradient>
        <linearGradient id="eyeGreen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3DBF93" />
          <stop offset="100%" stopColor="#13694E" />
        </linearGradient>
        <linearGradient id="eyeBlue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00C0FF" />
          <stop offset="100%" stopColor="#003B94" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function FullColorPinkLotus({ size = 64, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Center petal - deep pink */}
      <path d="M32 8C32 8 20 22 20 34C20 42 25 46 32 46C39 46 44 42 44 34C44 22 32 8 32 8Z" fill="url(#pinkLotusGrad)" />
      {/* Inner detail - gold line */}
      <path d="M32 15C32 15 25 24 25 32" stroke="#FFD700" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      
      {/* Left petal - soft pink */}
      <path d="M32 18 C32 18 14 24 12 36 C10 44 16 48 24 46 C29 45 32 38 32 38 Z" fill="url(#pinkLotusGradSoft)" />
      
      {/* Right petal - soft pink */}
      <path d="M32 18 C32 18 50 24 52 36 C54 44 48 48 40 46 C35 45 32 38 32 38 Z" fill="url(#pinkLotusGradSoft)" />
      
      {/* Lower left/right petals */}
      <path d="M22 28 C22 28 6 30 4 38 C2 44 8 48 15 46 C20 45 22 40 22 40 Z" fill="url(#pinkLotusGradMuted)" />
      <path d="M42 28 C42 28 58 30 60 38 C62 44 56 48 49 46 C44 45 42 40 42 40 Z" fill="url(#pinkLotusGradMuted)" />

      <defs>
        <linearGradient id="pinkLotusGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF8DA1" />
          <stop offset="100%" stopColor="#D81B60" />
        </linearGradient>
        <linearGradient id="pinkLotusGradSoft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFA6B9" />
          <stop offset="100%" stopColor="#E91E63" />
        </linearGradient>
        <linearGradient id="pinkLotusGradMuted" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFB3C6" />
          <stop offset="100%" stopColor="#C2185B" />
        </linearGradient>
      </defs>
    </svg>
  );
}
