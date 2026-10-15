import { useEffect, useState, type FormEvent } from "react";
import { api } from "../api";
import { errMsg, Field, fieldErrors, PageHead, Spinner, useLoad, useUi } from "../ui";

interface CloudinaryStatus {
  configured: boolean;
  source: "database" | "env" | null;
  cloudName: string;
  apiKey: string;
  hasSecret: boolean;
}

function CloudinaryCard() {
  const { data, setData, error } = useLoad(() => api.get<CloudinaryStatus>("/settings/cloudinary"));
  const [cloudName, setCloudName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const { toast, confirm } = useUi();

  useEffect(() => {
    if (data) {
      setCloudName(data.cloudName);
      setApiKey(data.apiKey);
    }
  }, [data]);

  if (error) return <div className="adm-alert">{error}</div>;
  if (!data) return <Spinner />;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErrors({});
    try {
      const status = await api.put<CloudinaryStatus>("/settings/cloudinary", { cloudName, apiKey, apiSecret });
      setData(status);
      setApiSecret("");
      toast("Cloudinary connected — image uploads are ready");
    } catch (err) {
      setErrors(fieldErrors(err));
      toast(errMsg(err), true);
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    const ok = await confirm({
      title: "Remove Cloudinary details?",
      message: "Image uploads will stop working until you add the details again. Images already uploaded keep working.",
      confirmLabel: "Remove",
      danger: true,
    });
    if (!ok) return;
    try {
      setData(await api.del<CloudinaryStatus>("/settings/cloudinary"));
      setCloudName("");
      setApiKey("");
      toast("Cloudinary details removed");
    } catch (err) {
      toast(errMsg(err), true);
    }
  };

  return (
    <form className="adm-card adm-form" onSubmit={submit} noValidate>
      <h2>
        Image uploads (Cloudinary){" "}
        <span className={`adm-pill ${data.configured ? "is-ok" : "is-off"}`}>
          {data.configured ? (data.source === "env" ? "Connected (server file)" : "Connected") : "Not connected"}
        </span>
      </h2>
      <p className="adm-hint" style={{ margin: "0 0 14px" }}>
        Find these three values in your Cloudinary dashboard under <b>Settings → API Keys</b> (the cloud name is shown at the top of the dashboard).
        We check them with Cloudinary before saving. The secret is stored encrypted and is never shown again.
      </p>
      {data.source === "env" && (
        <p className="adm-attn" style={{ margin: "0 0 14px" }}>
          Currently using details from the server's .env file. Saving here overrides them.
        </p>
      )}

      <Field label="Cloud name" htmlFor="cl-name" error={errors.cloudName}>
        <input
          id="cl-name"
          className="adm-input"
          value={cloudName}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          maxLength={60}
          aria-invalid={!!errors.cloudName}
          onChange={(e) => setCloudName(e.target.value)}
        />
      </Field>
      <Field label="API key" htmlFor="cl-key" error={errors.apiKey}>
        <input
          id="cl-key"
          className="adm-input"
          inputMode="numeric"
          value={apiKey}
          autoComplete="off"
          maxLength={30}
          aria-invalid={!!errors.apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
      </Field>
      <Field
        label="API secret"
        htmlFor="cl-secret"
        error={errors.apiSecret}
        hint={data.hasSecret ? "A secret is saved. Leave blank to keep it, or type a new one to replace it." : undefined}
      >
        <input
          id="cl-secret"
          className="adm-input"
          type="password"
          value={apiSecret}
          autoComplete="new-password"
          placeholder={data.hasSecret ? "••••••••••••••••" : ""}
          maxLength={100}
          aria-invalid={!!errors.apiSecret}
          onChange={(e) => setApiSecret(e.target.value)}
        />
      </Field>

      <div className="adm-savebar">
        {data.hasSecret && (
          <button type="button" className="adm-btn adm-btn-danger" onClick={remove}>
            Remove
          </button>
        )}
        <button className="adm-btn adm-btn-primary" disabled={busy || !cloudName || !apiKey || (!apiSecret && !data.hasSecret)}>
          {busy ? "Checking…" : "Save & test connection"}
        </button>
      </div>
    </form>
  );
}

export function SettingsPage() {
  return (
    <>
      <PageHead title="Settings" sub="Connections used by the admin panel." />
      <CloudinaryCard />
    </>
  );
}
