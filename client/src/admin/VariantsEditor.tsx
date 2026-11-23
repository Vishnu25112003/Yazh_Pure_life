import { useState } from "react";
import { ColorSwatches } from "../components/ColorSwatches";
import type { ProductVariant } from "../types";
import { ImageUpload } from "./ImageUpload";
import { Icons } from "./ui";

export const MAX_VARIANTS = 12;
const HEX = /^#[0-9a-f]{6}$/i;

// Starting swatch for each new colour, so two new rows never look identical.
const STARTERS = ["#1f2937", "#f8fafc", "#2563eb", "#b91c1c", "#9ca3af", "#065f46"];

/** Client-side check that mirrors the server: name, swatch and photo on every colour, names unique. */
export function variantErrors(list: ProductVariant[]): Record<string, string> {
  const out: Record<string, string> = {};
  const seen = new Set<string>();
  list.forEach((v, i) => {
    const name = v.name.trim();
    if (!name) out[`variants.${i}.name`] = "Give this colour a name, e.g. Black";
    else if (seen.has(name.toLowerCase())) out[`variants.${i}.name`] = "Each colour needs a different name";
    seen.add(name.toLowerCase());
    if (!HEX.test(v.color)) out[`variants.${i}.color`] = "Pick a swatch colour";
    if (!v.imageUrl.trim()) out[`variants.${i}.imageUrl`] = "Upload this colour's photo";
  });
  return out;
}

/**
 * Colour variants of one product. Each colour is a swatch + name + its own photo; customers tap the
 * swatch on the website to switch the machine photo. An empty list keeps the single main photo.
 */
export function VariantsEditor({
  value,
  onChange,
  section,
  uploadsEnabled,
  errors,
  productLabel,
}: {
  value: ProductVariant[];
  onChange: (v: ProductVariant[]) => void;
  section: string;
  uploadsEnabled: boolean;
  errors: Record<string, string>;
  productLabel: string;
}) {
  const [preview, setPreview] = useState(0);
  const set = (i: number, patch: Partial<ProductVariant>) => onChange(value.map((v, j) => (j === i ? { ...v, ...patch } : v)));
  const remove = (i: number) => {
    onChange(value.filter((_, j) => j !== i));
    setPreview(0);
  };
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const add = () => {
    const used = new Set(value.map((v) => v.color.toLowerCase()));
    const color = STARTERS.find((c) => !used.has(c)) ?? "#64748b";
    onChange([...value, { name: "", color, imageUrl: "" }]);
  };

  const shown = Math.min(preview, Math.max(0, value.length - 1));
  const ready = value.filter((v) => v.name.trim() && v.imageUrl.trim());
  // One entry = a single-colour product: just its photo, colour details optional.
  const single = value.length === 1;

  return (
    <div className="adm-variants">
      {value.map((v, i) => {
        const err = (k: string) => errors[`variants.${i}.${k}`];
        return (
          <div className="adm-variant" key={i} role="group" aria-label={`Colour ${i + 1}`}>
            <div className="adm-variant-top">
            <span className="adm-variant-head">
              <span className="adm-variant-dot" style={{ background: HEX.test(v.color) ? v.color : "transparent" }} aria-hidden="true" />
              {single ? "Product photo" : i === 0 ? "Colour 1 · main photo, shown first" : `Colour ${i + 1}`}
            </span>
            {!single && (
            <div className="adm-variant-btns">
              <button type="button" className="adm-btn adm-btn-sm adm-btn-icon" onClick={() => move(i, -1)} disabled={i === 0} aria-label={`Move colour ${i + 1} up`}>
                <Icons.up />
              </button>
              <button type="button" className="adm-btn adm-btn-sm adm-btn-icon" onClick={() => move(i, 1)} disabled={i === value.length - 1} aria-label={`Move colour ${i + 1} down`}>
                <Icons.down />
              </button>
              <button type="button" className="adm-btn adm-btn-sm adm-btn-icon adm-btn-danger" onClick={() => remove(i)} aria-label={`Remove colour ${i + 1}`}>
                <Icons.trash />
              </button>
            </div>
            )}
            </div>

            <div className="adm-variant-fields">
              <label className="adm-field">
                <span className="adm-label">Colour name{single ? " (optional)" : ""}</span>
                <input
                  className="adm-input"
                  value={v.name}
                  maxLength={40}
                  placeholder="e.g. Black, Pearl White"
                  aria-invalid={!!err("name")}
                  onChange={(e) => set(i, { name: e.target.value })}
                />
                {err("name") && <span className="adm-error">{err("name")}</span>}
              </label>
              <label className="adm-field">
                <span className="adm-label">Swatch</span>
                <span className="adm-swatchpick">
                  <input type="color" value={HEX.test(v.color) ? v.color : "#000000"} aria-label="Swatch colour" onChange={(e) => set(i, { color: e.target.value })} />
                  <input
                    className="adm-input"
                    value={v.color}
                    maxLength={7}
                    spellCheck={false}
                    aria-label="Swatch colour code"
                    aria-invalid={!!err("color")}
                    onChange={(e) => set(i, { color: e.target.value.trim() })}
                  />
                </span>
                {err("color") && <span className="adm-error">{err("color")}</span>}
              </label>
            </div>

            <div className="adm-field">
              <span className="adm-label">{single ? "Photo" : "Photo of this colour"}</span>
              <ImageUpload
                value={v.imageUrl}
                onChange={(url) => set(i, { imageUrl: url })}
                section={section}
                uploadsEnabled={uploadsEnabled}
                invalid={!!err("imageUrl")}
              />
              {err("imageUrl") && <span className="adm-error">{err("imageUrl")}</span>}
            </div>
          </div>
        );
      })}

      <div>
        <button type="button" className="adm-btn adm-btn-sm" onClick={add} disabled={value.length >= MAX_VARIANTS}>
          <Icons.plus /> Add another colour
        </button>
      </div>

      {ready.length > 1 && (
        <div className="adm-variant-preview" aria-live="polite">
          <span className="adm-pricepreview-label">On the website</span>
          <div className="adm-variant-preview-body">
            <img src={ready[Math.min(shown, ready.length - 1)].imageUrl} alt="" />
            <ColorSwatches variants={ready} value={Math.min(shown, ready.length - 1)} onChange={setPreview} size="lg" productLabel={productLabel || "Product"} />
          </div>
        </div>
      )}
    </div>
  );
}
