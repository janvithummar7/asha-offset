import Image from "next/image";
import { clients } from "@/lib/content";
import { Reveal } from "./Reveal";

/**
 * The client logo wall. Every logo sits on a white plate: several of the
 * supplied logos have a white background of their own, and a plate makes
 * that look deliberate instead of like a stray rectangle.
 *
 * `compact` is the slim home-page strip; the default is the roomier wall
 * used on the About page.
 */
export function ClientGrid({ compact = false }: { compact?: boolean }) {
  return (
    <ul
      className={`grid gap-px border border-ink/15 bg-ink/12 ${
        compact
          ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
          : "grid-cols-2 md:grid-cols-3"
      }`}
    >
      {clients.map((client, i) => (
        <li key={client.name} className="bg-white">
          <Reveal variant="zoom" delay={i * 90} className="h-full">
            <div
              className={`group flex items-center justify-center px-5 transition-colors duration-500 hover:bg-paper ${
                compact ? "h-28 py-5" : "h-40 py-8 sm:h-48"
              }`}
            >
              <Image
                src={client.src}
                alt={client.name}
                width={client.width}
                height={client.height}
                sizes={compact ? "(max-width: 1024px) 40vw, 14vw" : "(max-width: 768px) 44vw, 28vw"}
                className={`h-auto w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-105 ${
                  compact ? "max-h-16" : "max-h-24 sm:max-h-28"
                }`}
              />
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
