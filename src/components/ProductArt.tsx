import type { ArtKey } from "@/lib/content";

/**
 * Technical line-art for each product category, drawn in the style of an
 * old printing-trade catalogue: flat shapes, halftone fills, die lines
 * shown as dashes.
 *
 * These are illustrations of the *product type*, not photographs of work
 * — nothing here claims to be a particular job for a particular client.
 */

const VIEW = "0 0 160 120";

function Defs({ id }: { id: string }) {
  return (
    <defs>
      {/* Halftone screen, used as a tint fill. */}
      <pattern
        id={`${id}-dots`}
        width="4"
        height="4"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="2" cy="2" r="0.85" fill="currentColor" opacity="0.4" />
      </pattern>
      {/* Coarser screen for the heavier shadow areas. */}
      <pattern
        id={`${id}-dots-coarse`}
        width="6"
        height="6"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="3" cy="3" r="1.5" fill="currentColor" opacity="0.5" />
      </pattern>
    </defs>
  );
}

type ArtProps = { className?: string };

/* ------------------------------------------------------------------ */

function Frame({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox={VIEW}
      className={`h-full w-full ${className}`}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
    >
      <Defs id={id} />
      <rect width="160" height="120" fill="var(--color-cream)" />
      {children}
    </svg>
  );
}

/* --- Labels & stickers -------------------------------------------- */

function LabelArt({ className }: ArtProps) {
  return (
    <Frame id="label" className={className}>
      <g className="text-coffee">
        {/* A sheet of rectangular industrial labels, three across. */}
        {[0, 1, 2].map((col) =>
          [0, 1].map((row) => (
            <g key={`${col}-${row}`}>
              <rect
                x={18 + col * 44}
                y={24 + row * 40}
                width="36"
                height="30"
                rx="2.5"
                fill="var(--color-paper)"
                stroke="currentColor"
                strokeWidth="0.9"
              />
              <rect
                x={18 + col * 44}
                y={24 + row * 40}
                width="36"
                height="9"
                rx="2.5"
                fill="var(--color-burgundy)"
                opacity="0.85"
              />
              {/* Specification lines. */}
              {[0, 1, 2].map((l) => (
                <rect
                  key={l}
                  x={22 + col * 44}
                  y={37 + row * 40 + l * 5}
                  width={l === 2 ? 16 : 28}
                  height="1.6"
                  fill="currentColor"
                  opacity="0.35"
                />
              ))}
            </g>
          )),
        )}
        {/* Trim line around the sheet. */}
        <rect
          x="12"
          y="18"
          width="136"
          height="84"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
          strokeDasharray="3 3"
          opacity="0.5"
        />
      </g>
    </Frame>
  );
}

function StickerArt({ className }: ArtProps) {
  return (
    <Frame id="sticker" className={className}>
      <g className="text-coffee">
        {/* Heavy-duty circular warning-style stickers. */}
        <circle
          cx="54"
          cy="56"
          r="30"
          fill="var(--color-paper)"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle
          cx="54"
          cy="56"
          r="24"
          fill="url(#sticker-dots)"
          className="text-burgundy"
        />
        <circle
          cx="54"
          cy="56"
          r="24"
          fill="none"
          stroke="var(--color-burgundy)"
          strokeWidth="2.5"
        />
        <rect
          x="42"
          y="53"
          width="24"
          height="6"
          rx="1"
          fill="var(--color-burgundy)"
        />

        {/* A second sticker, peeling at one corner. */}
        <path
          d="M92 30h46a3 3 0 0 1 3 3v44a3 3 0 0 1-3 3h-32l-14-12z"
          fill="var(--color-paper)"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M106 80l-14-12v12z"
          fill="var(--color-beige)"
          stroke="currentColor"
          strokeWidth="0.9"
        />
        {[0, 1, 2, 3].map((l) => (
          <rect
            key={l}
            x="99"
            y={40 + l * 8}
            width={l === 3 ? 20 : 34}
            height="2.2"
            fill="currentColor"
            opacity="0.32"
          />
        ))}
        <rect x="99" y="38" width="12" height="2.5" fill="var(--color-brass)" />
      </g>
    </Frame>
  );
}

function DieCutArt({ className }: ArtProps) {
  return (
    <Frame id="diecut" className={className}>
      <g className="text-coffee">
        {/* Shaped die-cut forms with the cutting line shown as dashes. */}
        <path
          d="M80 22l10.5 21.5L114 47l-17 16.5 4 23.5L80 76l-21 11 4-23.5L46 47l23.5-3.5z"
          fill="var(--color-burgundy)"
          opacity="0.9"
        />
        <path
          d="M80 16l13 26.5L122 47l-21 20.5 5 29L80 83l-26 13.5 5-29L38 47l29-4.5z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="3.5 3"
          opacity="0.65"
        />
        {/* Small satellite shapes. */}
        <circle
          cx="26"
          cy="94"
          r="11"
          fill="var(--color-paper)"
          stroke="currentColor"
          strokeWidth="0.9"
        />
        <circle
          cx="26"
          cy="94"
          r="7"
          fill="url(#diecut-dots)"
          className="text-brass"
        />
        <rect
          x="120"
          y="84"
          width="24"
          height="20"
          rx="10"
          fill="var(--color-paper)"
          stroke="currentColor"
          strokeWidth="0.9"
        />
        <rect
          x="120"
          y="84"
          width="24"
          height="20"
          rx="10"
          fill="url(#diecut-dots)"
          className="text-plate-c"
        />
      </g>
    </Frame>
  );
}

/* --- Commercial printing ------------------------------------------ */

function PamphletArt({ className }: ArtProps) {
  return (
    <Frame id="pamphlet" className={className}>
      <g className="text-coffee">
        {/* Fanned single-sheet leaflets. */}
        {[
          { x: 20, y: 26, r: -8 },
          { x: 48, y: 20, r: -2 },
          { x: 78, y: 24, r: 5 },
        ].map((s, i) => (
          <g key={i} transform={`rotate(${s.r} ${s.x + 24} ${s.y + 36})`}>
            <rect
              x={s.x}
              y={s.y}
              width="48"
              height="72"
              fill="var(--color-paper)"
              stroke="currentColor"
              strokeWidth="0.9"
            />
            <rect
              x={s.x}
              y={s.y}
              width="48"
              height="22"
              fill={i === 1 ? "var(--color-burgundy)" : "var(--color-beige)"}
              opacity={i === 1 ? 0.9 : 1}
            />
            {[0, 1, 2, 3].map((l) => (
              <rect
                key={l}
                x={s.x + 6}
                y={s.y + 30 + l * 7}
                width={l === 3 ? 20 : 36}
                height="2"
                fill="currentColor"
                opacity="0.3"
              />
            ))}
          </g>
        ))}
      </g>
    </Frame>
  );
}

function BrochureArt({ className }: ArtProps) {
  return (
    <Frame id="brochure" className={className}>
      <g className="text-coffee">
        {/* Tri-fold brochure, opened. */}
        <path
          d="M18 30l40-8v76l-40 8z"
          fill="var(--color-paper)"
          stroke="currentColor"
          strokeWidth="0.9"
        />
        <path
          d="M58 22h44v76H58z"
          fill="var(--color-cream)"
          stroke="currentColor"
          strokeWidth="0.9"
        />
        <path
          d="M102 22l40 8v60l-40 8z"
          fill="var(--color-paper)"
          stroke="currentColor"
          strokeWidth="0.9"
        />
        {/* Cover panel artwork. */}
        <rect
          x="58"
          y="22"
          width="44"
          height="28"
          fill="var(--color-burgundy)"
          opacity="0.9"
        />
        <rect
          x="64"
          y="58"
          width="32"
          height="2.4"
          fill="currentColor"
          opacity="0.35"
        />
        <rect
          x="64"
          y="65"
          width="32"
          height="2.4"
          fill="currentColor"
          opacity="0.35"
        />
        <rect x="64" y="72" width="18" height="2.4" fill="var(--color-brass)" />
        <rect
          x="24"
          y="44"
          width="26"
          height="24"
          fill="url(#brochure-dots)"
          className="text-coffee"
        />
        <rect
          x="110"
          y="42"
          width="24"
          height="22"
          fill="url(#brochure-dots)"
          className="text-coffee"
        />
      </g>
    </Frame>
  );
}

function PosterArt({ className }: ArtProps) {
  return (
    <Frame id="poster" className={className}>
      <g className="text-coffee">
        {/* A large pinned poster. */}
        <rect
          x="34"
          y="12"
          width="92"
          height="96"
          fill="var(--color-paper)"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect
          x="34"
          y="12"
          width="92"
          height="46"
          fill="url(#poster-dots-coarse)"
          className="text-burgundy"
        />
        <circle
          cx="80"
          cy="35"
          r="15"
          fill="var(--color-burgundy)"
          opacity="0.9"
        />
        <rect
          x="44"
          y="68"
          width="72"
          height="5"
          fill="currentColor"
          opacity="0.45"
        />
        <rect
          x="44"
          y="78"
          width="54"
          height="3"
          fill="currentColor"
          opacity="0.28"
        />
        <rect
          x="44"
          y="85"
          width="62"
          height="3"
          fill="currentColor"
          opacity="0.28"
        />
        <rect x="44" y="96" width="26" height="3.4" fill="var(--color-brass)" />
        {/* Corner pins. */}
        <circle cx="40" cy="18" r="2.4" fill="var(--color-coffee)" />
        <circle cx="120" cy="18" r="2.4" fill="var(--color-coffee)" />
      </g>
    </Frame>
  );
}

function CatalogueArt({ className }: ArtProps) {
  return (
    <Frame id="catalogue" className={className}>
      <g className="text-coffee">
        {/* An open, saddle-stitched catalogue. */}
        <path
          d="M80 28c-14-7-30-9-44-7v68c14-2 30 0 44 7z"
          fill="var(--color-paper)"
          stroke="currentColor"
          strokeWidth="0.9"
        />
        <path
          d="M80 28c14-7 30-9 44-7v68c-14-2-30 0-44 7z"
          fill="var(--color-cream)"
          stroke="currentColor"
          strokeWidth="0.9"
        />
        <path
          d="M80 28v68"
          stroke="currentColor"
          strokeWidth="0.9"
          opacity="0.6"
        />
        {/* Left page: image block + caption rules. */}
        <rect
          x="44"
          y="34"
          width="28"
          height="20"
          fill="url(#catalogue-dots)"
          className="text-burgundy"
        />
        {[0, 1, 2, 3].map((l) => (
          <rect
            key={l}
            x="44"
            y={60 + l * 7}
            width={l === 3 ? 14 : 28}
            height="2"
            fill="currentColor"
            opacity="0.3"
          />
        ))}
        {/* Right page: product grid. */}
        {[0, 1].map((r) =>
          [0, 1].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={90 + c * 16}
              y={36 + r * 24}
              width="12"
              height="18"
              fill="var(--color-beige)"
              stroke="currentColor"
              strokeWidth="0.6"
            />
          )),
        )}
        <rect x="90" y="88" width="20" height="2.4" fill="var(--color-brass)" />
      </g>
    </Frame>
  );
}

/* --- Packaging ----------------------------------------------------- */

function DuplexArt({ className }: ArtProps) {
  return (
    <Frame id="duplex" className={className}>
      <g className="text-coffee">
        {/* An open-lid duplex box drawn in simple isometric. */}
        <path
          d="M30 56l40-20 40 20-40 20z"
          fill="var(--color-beige)"
          stroke="currentColor"
          strokeWidth="0.9"
        />
        <path
          d="M30 56v26l40 20V76z"
          fill="var(--color-paper)"
          stroke="currentColor"
          strokeWidth="0.9"
        />
        <path
          d="M110 56v26l-40 20V76z"
          fill="var(--color-burgundy)"
          opacity="0.88"
          stroke="currentColor"
          strokeWidth="0.9"
        />
        {/* Lid, lifted and tilted. */}
        <path
          d="M66 28l40-20 40 20-40 20z"
          fill="var(--color-paper)"
          stroke="currentColor"
          strokeWidth="0.9"
        />
        <path
          d="M66 28v8l40 20v-8z"
          fill="var(--color-beige)"
          stroke="currentColor"
          strokeWidth="0.9"
        />
        <path
          d="M146 28v8l-40 20v-8z"
          fill="var(--color-coffee)"
          opacity="0.3"
          stroke="currentColor"
          strokeWidth="0.9"
        />
        {/* Printed panel on the face. */}
        <path
          d="M78 84l24-12v10l-24 12z"
          fill="var(--color-paper)"
          opacity="0.75"
        />
      </g>
    </Frame>
  );
}

function CartonArt({ className }: ArtProps) {
  return (
    <Frame id="carton" className={className}>
      <g className="text-coffee">
        {/* A row of upright mono cartons, retail-shelf style. */}
        {[
          { x: 22, w: 30, h: 64, fill: "var(--color-burgundy)" },
          { x: 58, w: 36, h: 76, fill: "var(--color-beige)" },
          { x: 100, w: 28, h: 58, fill: "var(--color-brass)" },
        ].map((b, i) => (
          <g key={i}>
            {/* Front face. */}
            <rect
              x={b.x}
              y={104 - b.h}
              width={b.w}
              height={b.h}
              fill="var(--color-paper)"
              stroke="currentColor"
              strokeWidth="0.9"
            />
            {/* Side face, suggesting depth. */}
            <path
              d={`M${b.x + b.w} ${104 - b.h}l8-5v${b.h}l-8 5z`}
              fill="var(--color-coffee)"
              opacity="0.18"
              stroke="currentColor"
              strokeWidth="0.7"
            />
            <path
              d={`M${b.x} ${104 - b.h}l8-5h${b.w}l-8 5z`}
              fill="var(--color-coffee)"
              opacity="0.1"
              stroke="currentColor"
              strokeWidth="0.7"
            />
            {/* Printed band + copy rules. */}
            <rect
              x={b.x}
              y={104 - b.h + 10}
              width={b.w}
              height={b.h * 0.3}
              fill={b.fill}
              opacity="0.85"
            />
            <rect
              x={b.x + 5}
              y={104 - b.h * 0.42}
              width={b.w - 14}
              height="2"
              fill="currentColor"
              opacity="0.3"
            />
            <rect
              x={b.x + 5}
              y={104 - b.h * 0.42 + 6}
              width={b.w - 20}
              height="2"
              fill="currentColor"
              opacity="0.3"
            />
          </g>
        ))}
        {/* Shelf rule. */}
        <rect
          x="12"
          y="104"
          width="136"
          height="1.2"
          fill="currentColor"
          opacity="0.4"
        />
      </g>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */

const ART: Record<ArtKey, (p: ArtProps) => React.JSX.Element> = {
  label: LabelArt,
  sticker: StickerArt,
  diecut: DieCutArt,
  pamphlet: PamphletArt,
  brochure: BrochureArt,
  poster: PosterArt,
  catalogue: CatalogueArt,
  duplex: DuplexArt,
  carton: CartonArt,
};

export function ProductArt({
  art,
  className = "",
}: {
  art: ArtKey;
  className?: string;
}) {
  const Component = ART[art];
  return <Component className={className} />;
}
