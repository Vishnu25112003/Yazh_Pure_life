import { IRON_REMOVER } from "../data";
import { ProductImage } from "./ProductImage";

export function IronRemoverSection() {
  return (
    <section id="iron-remover" className="grid gap-[var(--space-3)]">
      <h2 className="m-0">Iron remover</h2>
      <div className="grid grid-cols-2 gap-[var(--space-3)]">
        {IRON_REMOVER.map((item) => (
          <a key={item.id} href="/iron-remover" className="card ypl-card p-[var(--space-3)] gap-[var(--space-2)]">
            <ProductImage label={item.name} className="w-full h-[100px] rounded-md" />
            <div className="card-title text-sm">{item.name}</div>
            <div className="card-body m-0 text-xs">{item.description}</div>
            <div className="tag tag-outline">Starting from {item.startingPrice}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
