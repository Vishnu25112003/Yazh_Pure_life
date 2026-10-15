import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../api";
import { ImageUpload } from "../ImageUpload";
import { PointsEditor } from "../PointsEditor";
import { PRODUCT_SECTIONS } from "../sections";
import type { Category, Product, ProductInput } from "../types";
import { errMsg, Field, fieldErrors, Icons, PageHead, Spinner, Switch, useLoad, useUi } from "../ui";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

const EMPTY: ProductInput = { slug: "", label: "", spec: "", imageUrl: "", points: [], isActive: true };

export function ProductForm({ category }: { category: Category }) {
  const meta = PRODUCT_SECTIONS[category];
  const { id } = useParams();
  const editing = id !== undefined;
  const navigate = useNavigate();
  const { toast } = useUi();

  const list = useLoad(() => (editing ? api.get<Product[]>(`/products/${category}`) : Promise.resolve([])), [category, id]);
  const config = useLoad(() => api.get<{ uploadsEnabled: boolean }>("/config"));

  const [form, setForm] = useState<ProductInput>(EMPTY);
  const [slugTouched, setSlugTouched] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!editing || !list.data) return;
    const p = list.data.find((x) => String(x.id) === id);
    if (p) setForm({ slug: p.slug, label: p.label, spec: p.spec, imageUrl: p.imageUrl, points: p.points, isActive: p.isActive });
  }, [list.data, editing, id]);

  const set = <K extends keyof ProductInput>(key: K, value: ProductInput[K]) => setForm((f) => ({ ...f, [key]: value }));

  if (list.error) return <div className="adm-alert">{list.error}</div>;
  if (!list.data || !config.data) return <Spinner />;
  if (editing && !list.data.some((x) => String(x.id) === id)) {
    return (
      <div className="adm-card adm-empty">
        That item no longer exists. <Link to={`/${category}`}>Back to list</Link>
      </div>
    );
  }

  const pointsError = errors.points ?? Object.entries(errors).find(([k]) => k.startsWith("points."))?.[1];

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErrors({});
    const body = { ...form, points: form.points.map((p) => p.trim()).filter(Boolean) };
    try {
      if (editing) await api.put(`/products/${category}/${id}`, body);
      else await api.post(`/products/${category}`, body);
      toast(editing ? "Changes saved" : `${form.label} added`);
      navigate(`/${category}`);
    } catch (err) {
      setErrors(fieldErrors(err));
      toast(errMsg(err), true);
      setBusy(false);
    }
  };

  return (
    <>
      <PageHead title={editing ? `Edit ${form.label || meta.noun}` : `Add ${meta.noun}`}>
        <Link to={`/${category}`} className="adm-btn adm-btn-sm">
          <Icons.back /> Back
        </Link>
      </PageHead>

      <form className="adm-form adm-card" onSubmit={submit} noValidate>
        <div className="adm-cols">
          <Field label="Name" htmlFor="label" error={errors.label}>
            <input
              id="label"
              className="adm-input"
              value={form.label}
              maxLength={120}
              placeholder="e.g. YPL Dolphin"
              aria-invalid={!!errors.label}
              onChange={(e) => {
                const label = e.target.value;
                setForm((f) => ({ ...f, label, slug: editing || slugTouched ? f.slug : slugify(label) }));
              }}
            />
          </Field>
          <Field
            label="Link name (slug)"
            htmlFor="slug"
            error={errors.slug}
            hint={
              editing
                ? "Used in the share link /?product=… — changing it breaks links people already shared."
                : "Auto-filled from the name. Used in the product's share link."
            }
          >
            <input
              id="slug"
              className="adm-input"
              value={form.slug}
              maxLength={80}
              aria-invalid={!!errors.slug}
              onChange={(e) => {
                setSlugTouched(true);
                set("slug", e.target.value.toLowerCase());
              }}
            />
          </Field>
        </div>

        <Field label="Short spec line" htmlFor="spec" error={errors.spec} hint="One line shown under the name, e.g. “RO + UV · 7 stage · 12 L”.">
          <input id="spec" className="adm-input" value={form.spec} maxLength={200} aria-invalid={!!errors.spec} onChange={(e) => set("spec", e.target.value)} />
        </Field>

        <Field label="Product image" htmlFor="image" error={errors.imageUrl} hint="Clear photo on a plain background works best (JPG, PNG or WebP, up to 5 MB).">
          <ImageUpload
            id="image"
            value={form.imageUrl}
            onChange={(url) => set("imageUrl", url)}
            section={category}
            uploadsEnabled={config.data.uploadsEnabled}
            invalid={!!errors.imageUrl}
          />
        </Field>

        <Field label="Key points" error={pointsError} hint="Bullet list shown in the product details (up to 12). Press Enter to add the next one.">
          <PointsEditor value={form.points} onChange={(v) => set("points", v)} />
        </Field>

        <Switch checked={form.isActive} onChange={(v) => set("isActive", v)} label={form.isActive ? "Visible on the website" : "Hidden from the website"} />

        <div className="adm-savebar">
          <Link to={`/${category}`} className="adm-btn">
            Cancel
          </Link>
          <button className="adm-btn adm-btn-primary" disabled={busy}>
            {busy ? "Saving…" : editing ? "Save changes" : `Add ${meta.noun}`}
          </button>
        </div>
      </form>
    </>
  );
}
