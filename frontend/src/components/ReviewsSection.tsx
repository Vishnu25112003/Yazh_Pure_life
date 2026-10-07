import { REVIEWS } from "../data";
import { StarIcon } from "./icons";

export function ReviewsSection() {
  return (
    <section className="grid gap-[var(--space-3)]">
      <div className="card ypl-card p-[var(--space-4)] gap-[var(--space-4)]">
        <div className="flex items-center justify-between gap-[var(--space-3)] flex-wrap">
          <div className="flex items-center gap-[var(--space-3)] flex-wrap">
            <div className="flex items-baseline gap-1.5">
              <div
                className="text-[38px] leading-none"
                style={{ fontFamily: "var(--font-heading)", color: "var(--color-accent-800)" }}
              >
                {REVIEWS.rating}
              </div>
              <div className="text-[13px] opacity-60">/5</div>
            </div>
            <div className="grid gap-1">
              <div className="flex gap-0.5" style={{ color: "var(--color-accent-600)" }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              <div className="text-[13px] font-semibold opacity-75">{REVIEWS.count} Google reviews</div>
            </div>
          </div>
          <a href={REVIEWS.url} target="_blank" rel="noopener" className="btn btn-secondary text-xs flex-none">
            Read all reviews
          </a>
        </div>
        <div className="grid gap-[var(--space-3)] grid-cols-1">
          {REVIEWS.items.map((review) => {
            const isAccent2 = review.tint === "accent2";
            return (
              <div
                key={review.name}
                className="flex gap-[var(--space-3)] p-[var(--space-3)] rounded-lg"
                style={{ background: isAccent2 ? "var(--color-accent-2-100)" : "var(--color-accent-100)" }}
              >
                <div
                  className="flex-none w-[38px] h-[38px] rounded-full text-white flex items-center justify-center font-semibold"
                  style={{
                    background: isAccent2 ? "var(--color-accent-2-600)" : "var(--color-accent-600)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {review.initials}
                </div>
                <div className="grid gap-0.5">
                  <div className="text-[13px] font-semibold">{review.name}</div>
                  <p className="m-0 text-[13px] opacity-85">{review.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
