import { useEffect, useState, type FormEvent } from "react";
import { api } from "../api";
import type { Branch, BranchInput, Contact } from "../types";
import { errMsg, Field, fieldErrors, Icons, PageHead, Sheet, Spinner, Switch, useLoad, useUi } from "../ui";

/* ---------------- Contact ---------------- */
function ContactTab() {
  const { data, error } = useLoad(() => api.get<Contact & { updatedAt: string }>("/contact"));
  const [form, setForm] = useState<Contact | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const { toast } = useUi();

  useEffect(() => {
    if (data) {
      const { updatedAt: _ignored, ...c } = data;
      setForm(c);
    }
  }, [data]);

  if (error) return <div className="adm-alert">{error}</div>;
  if (!form) return <Spinner />;

  const set = (k: keyof Contact, v: string) => setForm({ ...form, [k]: v });
  const text = (k: keyof Contact, label: string, props: { hint?: string; type?: string; inputMode?: "tel" | "email" | "url" | "numeric"; max?: number; area?: boolean } = {}) => (
    <Field label={label} htmlFor={`c-${k}`} error={errors[k]} hint={props.hint}>
      {props.area ? (
        <textarea id={`c-${k}`} className="adm-input" value={form[k]} maxLength={props.max} aria-invalid={!!errors[k]} onChange={(e) => set(k, e.target.value)} />
      ) : (
        <input
          id={`c-${k}`}
          className="adm-input"
          type={props.type ?? "text"}
          inputMode={props.inputMode}
          value={form[k]}
          maxLength={props.max}
          aria-invalid={!!errors[k]}
          onChange={(e) => set(k, e.target.value)}
        />
      )}
    </Field>
  );

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErrors({});
    try {
      await api.put("/contact", form);
      toast("Contact details saved");
    } catch (err) {
      setErrors(fieldErrors(err));
      toast(errMsg(err), true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="adm-two">
      <form className="adm-card" onSubmit={submit} noValidate>
        <h2>Contact details</h2>
        <div className="adm-cols">
          {text("phone", "Phone (for calls)", { inputMode: "tel", hint: "Include country code, e.g. +91 98765 43210", max: 20 })}
          {text("phoneDisplay", "Phone shown on site", { inputMode: "tel", hint: "How it appears on buttons, e.g. 98765 43210", max: 30 })}
          {text("whatsapp", "WhatsApp number", { inputMode: "numeric", hint: "Digits only with country code, e.g. 919876543210", max: 15 })}
          {text("email", "Email", { type: "email", inputMode: "email", max: 200 })}
        </div>
        {text("address", "Main address", { area: true, max: 400 })}
        {text("hours", "Opening hours", { hint: "e.g. Mon – Sat, 9:00 AM – 8:00 PM", max: 120 })}
        {text("mycrd", "Catalogue link", { type: "url", inputMode: "url", hint: "Full link starting with https://", max: 2000 })}
        <div className="adm-savebar">
          <button className="adm-btn adm-btn-primary" disabled={busy}>
            {busy ? "Saving…" : "Save contact details"}
          </button>
        </div>
      </form>

      <aside className="adm-card" aria-label="Footer preview">
        <h2>Footer preview</h2>
        <div className="adm-preview">
          <h3>Yazh Pure Life</h3>
          <span>📞 {form.phoneDisplay || "—"}</span>
          <span>✉️ {form.email || "—"}</span>
          <span>🕘 {form.hours || "—"}</span>
          <span>📍 {form.address || "—"}</span>
        </div>
      </aside>
    </div>
  );
}

/* ---------------- Branches ---------------- */
const EMPTY: BranchInput = { name: "", tag: "Branch", address: "", mapsUrl: "", isActive: true };

function BranchSheet({ branch, onClose, onSaved }: { branch: Branch | null; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState<BranchInput>(
    branch ? { name: branch.name, tag: branch.tag, address: branch.address, mapsUrl: branch.mapsUrl, isActive: branch.isActive } : EMPTY
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const { toast } = useUi();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErrors({});
    try {
      if (branch) await api.put(`/branches/${branch.id}`, form);
      else await api.post("/branches", form);
      toast(branch ? "Branch updated" : "Branch added");
      onSaved();
    } catch (err) {
      setErrors(fieldErrors(err));
      toast(errMsg(err), true);
      setBusy(false);
    }
  };

  return (
    <Sheet title={branch ? "Edit branch" : "Add branch"} onClose={onClose}>
      <form onSubmit={submit} noValidate>
        <div className="adm-cols">
          <Field label="Branch name" htmlFor="b-name" error={errors.name}>
            <input id="b-name" className="adm-input" value={form.name} maxLength={100} aria-invalid={!!errors.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field label="Tag" htmlFor="b-tag" error={errors.tag} hint="e.g. Head office, Branch">
            <input id="b-tag" className="adm-input" value={form.tag} maxLength={40} aria-invalid={!!errors.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} />
          </Field>
        </div>
        <Field label="Full address" htmlFor="b-address" error={errors.address}>
          <textarea id="b-address" className="adm-input" value={form.address} maxLength={400} aria-invalid={!!errors.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        </Field>
        <Field label="Google Maps link" htmlFor="b-maps" error={errors.mapsUrl} hint="Open the place in Google Maps, tap Share, and paste the link.">
          <input id="b-maps" className="adm-input" type="url" inputMode="url" value={form.mapsUrl} aria-invalid={!!errors.mapsUrl} onChange={(e) => setForm({ ...form, mapsUrl: e.target.value })} />
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

function BranchesTab() {
  const { data, setData, error, reload } = useLoad(() => api.get<Branch[]>("/branches"));
  const [editing, setEditing] = useState<Branch | "new" | null>(null);
  const { toast, confirm } = useUi();

  if (error) return <div className="adm-alert">{error}</div>;
  if (!data) return <Spinner />;

  const move = async (index: number, dir: -1 | 1) => {
    const j = index + dir;
    if (j < 0 || j >= data.length) return;
    const next = [...data];
    [next[index], next[j]] = [next[j], next[index]];
    setData(next);
    try {
      await api.put("/branches/reorder", { ids: next.map((b) => b.id) });
    } catch (e) {
      toast(errMsg(e), true);
      reload();
    }
  };

  const toggle = async (b: Branch) => {
    try {
      const updated = await api.put<Branch>(`/branches/${b.id}`, { name: b.name, tag: b.tag, address: b.address, mapsUrl: b.mapsUrl, isActive: !b.isActive });
      setData(data.map((x) => (x.id === b.id ? updated : x)));
    } catch (e) {
      toast(errMsg(e), true);
    }
  };

  const remove = async (b: Branch) => {
    const ok = await confirm({
      title: `Delete ${b.name}?`,
      message: "This removes the branch from the footer. To keep it but hide it, use the eye button instead.",
      confirmLabel: "Delete",
      danger: true,
    });
    if (!ok) return;
    try {
      await api.del(`/branches/${b.id}`);
      setData(data.filter((x) => x.id !== b.id));
      toast("Branch deleted");
    } catch (e) {
      toast(errMsg(e), true);
    }
  };

  return (
    <>
      <div className="adm-toolbar">
        <button className="adm-btn adm-btn-primary" onClick={() => setEditing("new")}>
          <Icons.plus /> Add branch
        </button>
      </div>
      {data.length === 0 ? (
        <div className="adm-card adm-empty">No branches yet.</div>
      ) : (
        <ul className="adm-list">
          {data.map((b, i) => (
            <li key={b.id} className={`adm-row no-thumb${b.isActive ? "" : " is-hidden"}`}>
              <div className="adm-row-body">
                <div className="adm-row-title">
                  {b.name} <span className="adm-badge" style={{ background: "var(--color-accent-100)", color: "var(--color-accent-800)" }}>{b.tag}</span>
                  {!b.isActive && <span className="adm-badge">Hidden</span>}
                </div>
                <div className="adm-row-sub">{b.address}</div>
              </div>
              <div className="adm-row-actions">
                <button className="adm-btn adm-btn-sm adm-btn-icon" onClick={() => move(i, -1)} disabled={i === 0} aria-label={`Move ${b.name} up`}>
                  <Icons.up />
                </button>
                <button className="adm-btn adm-btn-sm adm-btn-icon" onClick={() => move(i, 1)} disabled={i === data.length - 1} aria-label={`Move ${b.name} down`}>
                  <Icons.down />
                </button>
                <button className="adm-btn adm-btn-sm adm-btn-icon" onClick={() => toggle(b)} aria-label={b.isActive ? `Hide ${b.name}` : `Show ${b.name}`}>
                  {b.isActive ? <Icons.eye /> : <Icons.eyeOff />}
                </button>
                <button className="adm-btn adm-btn-sm spacer" onClick={() => setEditing(b)}>
                  <Icons.edit /> Edit
                </button>
                <button className="adm-btn adm-btn-sm adm-btn-icon adm-btn-danger" onClick={() => remove(b)} aria-label={`Delete ${b.name}`}>
                  <Icons.trash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {editing && (
        <BranchSheet
          branch={editing === "new" ? null : editing}
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

export function FooterPage() {
  const [tab, setTab] = useState<"branches" | "contact">("branches");
  return (
    <>
      <PageHead title="Footer" sub="Branches and contact details shown in the footer, header and call buttons." />
      <div className="adm-tabs" role="tablist">
        <button role="tab" aria-selected={tab === "branches"} onClick={() => setTab("branches")}>
          Branches
        </button>
        <button role="tab" aria-selected={tab === "contact"} onClick={() => setTab("contact")}>
          Contact
        </button>
      </div>
      {tab === "branches" ? <BranchesTab /> : <ContactTab />}
    </>
  );
}
