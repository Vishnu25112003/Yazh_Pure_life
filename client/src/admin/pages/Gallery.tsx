import { useRef, useState, type FormEvent } from "react";
import { api } from "../api";
import { ImageUpload } from "../ImageUpload";
import type { GalleryInput, GalleryItem } from "../types";
import { errMsg, Field, fieldErrors, Icons, PageHead, Sheet, Spinner, Switch, useLoad, useUi } from "../ui";

const EMPTY: GalleryInput = { imageUrl: "", name: "", isActive: true };

// "ypl-dolphin_1.webp" -> "Ypl dolphin 1"
const nameFromFile = (file: string) => {
  const base = file.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim();
  return (base.charAt(0).toUpperCase() + base.slice(1)).slice(0, 120) || "Photo";
};

function EditSheet({
  item,
  uploadsEnabled,
  onClose,
  onSaved,
}: {
  item: GalleryItem | null;
  uploadsEnabled: boolean;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<GalleryInput>(item ? { imageUrl: item.imageUrl, name: item.name, isActive: item.isActive } : EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const { toast } = useUi();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErrors({});
    try {
      if (item) await api.put(`/gallery/${item.id}`, form);
      else await api.post("/gallery", form);
      toast(item ? "Photo updated" : "Photo added");
      onSaved();
    } catch (err) {
      setErrors(fieldErrors(err));
      toast(errMsg(err), true);
      setBusy(false);
    }
  };

  return (
    <Sheet title={item ? "Edit photo" : "Add photo"} onClose={onClose}>
      <form onSubmit={submit} noValidate>
        <Field label="Name" htmlFor="g-name" error={errors.name} hint="Shown as the caption when the photo is opened.">
          <input
            id="g-name"
            className="adm-input"
            value={form.name}
            maxLength={120}
            aria-invalid={!!errors.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </Field>
        <Field label="Photo" htmlFor="g-img" error={errors.imageUrl}>
          <ImageUpload
            id="g-img"
            value={form.imageUrl}
            onChange={(url) => setForm({ ...form, imageUrl: url })}
            section="gallery"
            uploadsEnabled={uploadsEnabled}
            invalid={!!errors.imageUrl}
          />
        </Field>
        <Switch checked={form.isActive} onChange={(v) => setForm({ ...form, isActive: v })} label={form.isActive ? "Visible on the website" : "Hidden from the website"} />
        <div className="adm-sheet-actions">
          <button type="button" className="adm-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="adm-btn adm-btn-primary" disabled={busy}>
            {busy ? "Saving…" : "Save"}
          </button>
        </div>
      </form>
    </Sheet>
  );
}

export function GalleryPage() {
  const { data, setData, error, reload } = useLoad(() => api.get<GalleryItem[]>("/gallery"));
  const config = useLoad(() => api.get<{ uploadsEnabled: boolean }>("/config"));
  const [editing, setEditing] = useState<GalleryItem | "new" | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const { toast, confirm } = useUi();

  if (error) return <div className="adm-alert">{error}</div>;
  if (!data || !config.data) return <Spinner />;
  const uploadsEnabled = config.data.uploadsEnabled;

  const uploadMany = async (files: FileList | null) => {
    if (!files?.length) return;
    const list = Array.from(files);
    setUploading(true);
    try {
      const urls = await api.upload(list, "gallery");
      for (const [i, url] of urls.entries()) {
        await api.post("/gallery", { imageUrl: url, name: nameFromFile(list[i].name), isActive: true });
      }
      toast(`${urls.length} photo${urls.length > 1 ? "s" : ""} added — tap Edit to rename`);
      reload();
    } catch (e) {
      toast(errMsg(e), true);
      reload();
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  };

  const move = async (index: number, dir: -1 | 1) => {
    const j = index + dir;
    if (j < 0 || j >= data.length) return;
    const next = [...data];
    [next[index], next[j]] = [next[j], next[index]];
    setData(next);
    try {
      await api.put("/gallery/reorder", { ids: next.map((g) => g.id) });
    } catch (e) {
      toast(errMsg(e), true);
      reload();
    }
  };

  const toggle = async (g: GalleryItem) => {
    try {
      const updated = await api.put<GalleryItem>(`/gallery/${g.id}`, { imageUrl: g.imageUrl, name: g.name, isActive: !g.isActive });
      setData(data.map((x) => (x.id === g.id ? updated : x)));
    } catch (e) {
      toast(errMsg(e), true);
    }
  };

  const remove = async (g: GalleryItem) => {
    const ok = await confirm({
      title: `Delete “${g.name}”?`,
      message: "This removes the photo from the gallery. To keep it but hide it from the site, use the eye button instead.",
      confirmLabel: "Delete",
      danger: true,
    });
    if (!ok) return;
    try {
      await api.del(`/gallery/${g.id}`);
      setData(data.filter((x) => x.id !== g.id));
      toast("Photo deleted");
    } catch (e) {
      toast(errMsg(e), true);
    }
  };

  return (
    <>
      <PageHead title="Gallery" sub={`${data.length} photos in the scrolling gallery. Photos appear on the site in this order.`}>
        <input
          ref={fileInput}
          type="file"
          multiple
          hidden
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          onChange={(e) => uploadMany(e.target.files)}
        />
        <button className="adm-btn" onClick={() => setEditing("new")}>
          <Icons.plus /> Add by link
        </button>
        <button
          className="adm-btn adm-btn-primary"
          disabled={uploading || !uploadsEnabled}
          onClick={() => fileInput.current?.click()}
          title={uploadsEnabled ? undefined : "Image upload is not set up on the server yet"}
        >
          <Icons.upload /> {uploading ? "Uploading…" : "Upload photos"}
        </button>
      </PageHead>

      {data.length === 0 ? (
        <div className="adm-card adm-empty">No photos yet. Upload some to fill the gallery.</div>
      ) : (
        <ul className="adm-grid">
          {data.map((g, i) => (
            <li key={g.id} className={`adm-tile${g.isActive ? "" : " is-hidden"}`}>
              <img src={g.imageUrl} alt={g.name} loading="lazy" />
              <div className="adm-tile-name">
                {g.name}
                {!g.isActive && <span className="adm-badge">Hidden</span>}
              </div>
              <div className="adm-tile-actions">
                <button className="adm-btn adm-btn-sm adm-btn-icon" onClick={() => move(i, -1)} disabled={i === 0} aria-label={`Move ${g.name} earlier`}>
                  <Icons.up />
                </button>
                <button className="adm-btn adm-btn-sm adm-btn-icon" onClick={() => move(i, 1)} disabled={i === data.length - 1} aria-label={`Move ${g.name} later`}>
                  <Icons.down />
                </button>
                <button className="adm-btn adm-btn-sm adm-btn-icon" onClick={() => toggle(g)} aria-label={g.isActive ? `Hide ${g.name}` : `Show ${g.name}`}>
                  {g.isActive ? <Icons.eye /> : <Icons.eyeOff />}
                </button>
                <button className="adm-btn adm-btn-sm adm-btn-icon" onClick={() => setEditing(g)} aria-label={`Edit ${g.name}`}>
                  <Icons.edit />
                </button>
                <button className="adm-btn adm-btn-sm adm-btn-icon adm-btn-danger" onClick={() => remove(g)} aria-label={`Delete ${g.name}`}>
                  <Icons.trash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {editing && (
        <EditSheet
          item={editing === "new" ? null : editing}
          uploadsEnabled={uploadsEnabled}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            reload();
          }}
        />
      )}
    </>
  );
}
