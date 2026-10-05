import { ColourBar } from "./print";
import { Reveal } from "./Reveal";

/**
 * The four-ink colour bar (cyan · magenta · yellow · key) used as the rule
 * between page sections, like the colour control strip on a press sheet.
 *
 * Purely decorative, so it is hidden from assistive technology. By default
 * it sits across the top edge of the section that contains it; pass
 * `placement="flow"` to render it as an ordinary full-width block instead.
 */
export function SectionDivider({
  placement = "top",
  className = "",
}: {
  placement?: "top" | "flow";
  className?: string;
}) {
  const position =
    placement === "top" ? "absolute inset-x-0 top-0 z-10" : "relative";

  // The bar draws itself, one ink after another, as it scrolls into view.
  return (
    <Reveal variant="draw" className={position}>
      <ColourBar className={`h-[3px] w-full ${className}`} />
    </Reveal>
  );
}
