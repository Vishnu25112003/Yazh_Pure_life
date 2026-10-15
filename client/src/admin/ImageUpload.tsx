import { useRef, useState } from "react";
import { api } from "./api";
import { errMsg, Icons, useUi } from "./ui";

// Image picker: upload to Cloudinary (when configured) or paste a link / existing /assets path.
export function ImageUpload({
  id,
  value,
  onChange,
  section,
  uploadsEnabled,
  invalid,
}: {
  id?: string;
  value: string;
  onChange: (url: string) => void;
  section: string;
  uploadsEnabled: boolean;
  invalid?: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const { toast } = useUi();

  const pick = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    try {
      const [url] = await api.upload([files[0]], section);
      onChange(url);
    } catch (e) {
      toast(errMsg(e), true);
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  };

  return (
    <div className="adm-img">
      {value && <img className="adm-img-preview" src={value} alt="Preview" />}
      <div className="adm-img-actions">
        <input
          ref={input}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          hidden
          onChange={(e) => pick(e.target.files)}
        />
        <button
          type="button"
          className="adm-btn"
          disabled={busy || !uploadsEnabled}
          onClick={() => input.current?.click()}
          title={uploadsEnabled ? undefined : "Image upload is not set up on the server yet"}
        >
          <Icons.upload /> {busy ? "Uploading…" : value ? "Replace image" : "Upload image"}
        </button>
      </div>
      <input
        id={id}
        className="adm-input"
        type="text"
        inputMode="url"
        placeholder={uploadsEnabled ? "…or paste an image link" : "Paste an image link (uploads not set up yet)"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={invalid}
      />
    </div>
  );
}
