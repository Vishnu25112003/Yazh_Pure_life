import { Icons } from "./ui";

// Editable list of short text lines (key points) with add / remove / reorder.
export function PointsEditor({
  value,
  onChange,
  error,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  error?: string;
}) {
  const set = (i: number, text: string) => onChange(value.map((p, j) => (j === i ? text : p)));
  const remove = (i: number) => onChange(value.filter((_, j) => j !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div className="adm-points">
      {value.map((p, i) => (
        <div className="adm-point" key={i}>
          <input
            className="adm-input"
            value={p}
            maxLength={160}
            placeholder={`Point ${i + 1}`}
            aria-label={`Key point ${i + 1}`}
            onChange={(e) => set(i, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onChange([...value.slice(0, i + 1), "", ...value.slice(i + 1)]);
              }
            }}
          />
          <div className="adm-point-btns">
            <button type="button" className="adm-btn adm-btn-sm adm-btn-icon" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">
              <Icons.up />
            </button>
            <button type="button" className="adm-btn adm-btn-sm adm-btn-icon" onClick={() => move(i, 1)} disabled={i === value.length - 1} aria-label="Move down">
              <Icons.down />
            </button>
            <button type="button" className="adm-btn adm-btn-sm adm-btn-icon adm-btn-danger" onClick={() => remove(i)} aria-label="Remove point">
              <Icons.trash />
            </button>
          </div>
        </div>
      ))}
      {error && <span className="adm-error">{error}</span>}
      <div>
        <button type="button" className="adm-btn adm-btn-sm" onClick={() => onChange([...value, ""])} disabled={value.length >= 12}>
          <Icons.plus /> Add point
        </button>
      </div>
    </div>
  );
}
