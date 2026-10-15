import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { PRODUCT_SECTIONS } from "../sections";
import type { Category, Product } from "../types";
import { errMsg, Icons, PageHead, Spinner, useLoad, useUi } from "../ui";

export function ProductsPage({ category }: { category: Category }) {
  const meta = PRODUCT_SECTIONS[category];
  const { data, setData, error, reload } = useLoad(() => api.get<Product[]>(`/products/${category}`), [category]);
  const [q, setQ] = useState("");
  const { toast, confirm } = useUi();

  const shown = useMemo(() => {
    const term = q.trim().toLowerCase();
    return (data ?? []).filter((p) => !term || `${p.label} ${p.spec} ${p.slug}`.toLowerCase().includes(term));
  }, [data, q]);

  if (error) return <div className="adm-alert">{error}</div>;
  if (!data) return <Spinner />;

  const move = async (index: number, dir: -1 | 1) => {
    const j = index + dir;
    if (j < 0 || j >= data.length) return;
    const next = [...data];
    [next[index], next[j]] = [next[j], next[index]];
    setData(next); // optimistic
    try {
      await api.put(`/products/${category}/reorder`, { ids: next.map((p) => p.id) });
    } catch (e) {
      toast(errMsg(e), true);
      reload();
    }
  };

  const toggle = async (p: Product) => {
    try {
      const updated = await api.put<Product>(`/products/${category}/${p.id}`, {
        slug: p.slug,
        label: p.label,
        spec: p.spec,
        imageUrl: p.imageUrl,
        points: p.points,
        isActive: !p.isActive,
      });
      setData(data.map((x) => (x.id === p.id ? updated : x)));
      toast(updated.isActive ? `"${p.label}" is now visible on the site` : `"${p.label}" is hidden from the site`);
    } catch (e) {
      toast(errMsg(e), true);
    }
  };

  const remove = async (p: Product) => {
    const ok = await confirm({
      title: `Delete ${p.label}?`,
      message: `This permanently removes it from the ${meta.title.toLowerCase()} list and its share link stops working. To keep it but hide it from the site, use the eye button instead.`,
      confirmLabel: "Delete",
      danger: true,
    });
    if (!ok) return;
    try {
      await api.del(`/products/${category}/${p.id}`);
      setData(data.filter((x) => x.id !== p.id));
      toast(`Deleted "${p.label}"`);
    } catch (e) {
      toast(errMsg(e), true);
    }
  };

  return (
    <>
      <PageHead title={meta.title} sub={meta.sub}>
        <Link to={`/${category}/new`} className="adm-btn adm-btn-primary">
          <Icons.plus /> Add {meta.noun}
        </Link>
      </PageHead>

      <div className="adm-toolbar">
        <input
          className="adm-input"
          type="search"
          placeholder={`Search ${data.length} ${meta.noun}s…`}
          aria-label="Search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {data.length === 0 ? (
        <div className="adm-card adm-empty">
          No {meta.noun}s yet. <Link to={`/${category}/new`}>Add the first one</Link>.
        </div>
      ) : shown.length === 0 ? (
        <div className="adm-card adm-empty">Nothing matches “{q}”.</div>
      ) : (
        <ul className="adm-list">
          {shown.map((p) => {
            const index = data.indexOf(p);
            return (
              <li key={p.id} className={`adm-row${p.isActive ? "" : " is-hidden"}`}>
                <img className="adm-thumb" src={p.imageUrl} alt="" loading="lazy" />
                <div className="adm-row-body">
                  <div className="adm-row-title">
                    {p.label}
                    {!p.isActive && <span className="adm-badge">Hidden</span>}
                  </div>
                  <div className="adm-row-sub">{p.spec}</div>
                </div>
                <div className="adm-row-actions">
                  <button
                    className="adm-btn adm-btn-sm adm-btn-icon"
                    onClick={() => move(index, -1)}
                    disabled={!!q || index === 0}
                    aria-label={`Move ${p.label} up`}
                  >
                    <Icons.up />
                  </button>
                  <button
                    className="adm-btn adm-btn-sm adm-btn-icon"
                    onClick={() => move(index, 1)}
                    disabled={!!q || index === data.length - 1}
                    aria-label={`Move ${p.label} down`}
                  >
                    <Icons.down />
                  </button>
                  <button
                    className="adm-btn adm-btn-sm adm-btn-icon"
                    onClick={() => toggle(p)}
                    aria-label={p.isActive ? `Hide ${p.label}` : `Show ${p.label}`}
                    title={p.isActive ? "Hide from site" : "Show on site"}
                  >
                    {p.isActive ? <Icons.eye /> : <Icons.eyeOff />}
                  </button>
                  <Link className="adm-btn adm-btn-sm spacer" to={`/${category}/${p.id}`}>
                    <Icons.edit /> Edit
                  </Link>
                  <button
                    className="adm-btn adm-btn-sm adm-btn-icon adm-btn-danger"
                    onClick={() => remove(p)}
                    aria-label={`Delete ${p.label}`}
                  >
                    <Icons.trash />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
