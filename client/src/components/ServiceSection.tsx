import { FormEvent, useState } from "react";
import { waLink } from "../data";
import { useSite } from "../site";
import { check, clean, formatMobile } from "../inputRules";
import { WrenchIcon } from "./icons";
import { MobileInput } from "./MobileInput";

type Field = "name" | "phone" | "customerId" | "address" | "complaint";
type Errors = Partial<Record<Field, string>>;

export function ServiceSection() {
  const { contact } = useSite();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(""); // 10 digits; +91 is fixed in front
  const [customerId, setCustomerId] = useState("");
  const [address, setAddress] = useState("");
  const [complaint, setComplaint] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  // Typing in a field clears its own error.
  const edit = (field: Field, setter: (v: string) => void) => (v: string) => {
    setter(v);
    if (errors[field]) setErrors(({ [field]: _gone, ...rest }) => rest);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found: Errors = {
      name: check.name(name),
      phone: check.mobile(phone),
      customerId: check.customerId(customerId),
      address: check.address(address),
      complaint: check.message(complaint, { min: 10, max: 300, what: "the problem" }),
    };
    const nextErrors = Object.fromEntries(Object.entries(found).filter(([, m]) => m)) as Errors;
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      const first = Object.keys(nextErrors)[0];
      document.getElementById(`svc-${first}`)?.focus();
      return;
    }

    const message = `New service request from website:\nName: ${name.trim()}\nMobile: ${formatMobile(phone)}\nCustomer ID: ${customerId.trim()}\nAddress: ${address.trim()}\nComplaint: ${complaint.trim()}`;
    window.open(waLink(contact, message), "_blank", "noopener");
    setSent(true);
    setErrors({});
  };

  const err = (f: Field) =>
    errors[f] ? (
      <div id={`svc-${f}-err`} className="ypl-field-error" role="alert">
        {errors[f]}
      </div>
    ) : null;

  return (
    <section id="service" className="grid gap-[var(--space-3)]">
      <h2 className="m-0 flex items-center gap-[var(--space-3)]">
        <span className="service-badge">
          <WrenchIcon size={28} />
        </span>
        Complaint Registration
      </h2>

      {sent ? (
        <div className="card ypl-card p-[var(--space-4)] text-center">
          <p className="m-0">
            Thanks — your request is ready on WhatsApp. Send it across and we will call you back shortly.
          </p>
        </div>
      ) : (
        <form
          className="card ypl-card p-[var(--space-4)] gap-[var(--space-3)] dsk:!grid dsk:grid-cols-2 dsk:gap-x-[var(--space-6)]"
          onSubmit={handleSubmit}
        >
          <div className="field">
            <label htmlFor="svc-name">Name</label>
            <input
              id="svc-name"
              className="input"
              type="text"
              autoComplete="name"
              maxLength={60}
              value={name}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "svc-name-err" : undefined}
              onChange={(e) => edit("name", setName)(clean("name", e.target.value))}
              placeholder="Your name"
            />
            {err("name")}
          </div>
          <div className="field">
            <label htmlFor="svc-phone">Mobile number</label>
            <MobileInput
              id="svc-phone"
              inputClassName="input"
              value={phone}
              invalid={!!errors.phone}
              describedBy={errors.phone ? "svc-phone-err" : undefined}
              onChange={edit("phone", setPhone)}
            />
            {err("phone")}
          </div>
          <div className="field">
            <label htmlFor="svc-customerId">Customer ID</label>
            <input
              id="svc-customerId"
              className="input"
              type="text"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              maxLength={30}
              value={customerId}
              aria-invalid={!!errors.customerId}
              aria-describedby={errors.customerId ? "svc-customerId-err" : undefined}
              onChange={(e) => edit("customerId", setCustomerId)(clean("customerId", e.target.value))}
              placeholder="e.g. YPL-10234"
            />
            {err("customerId")}
          </div>
          <div className="field">
            <label htmlFor="svc-address">Address</label>
            <textarea
              id="svc-address"
              className="input dsk:!min-h-[36px] dsk:!h-[36px] dsk:!resize-none"
              autoComplete="street-address"
              maxLength={250}
              value={address}
              aria-invalid={!!errors.address}
              aria-describedby={errors.address ? "svc-address-err" : undefined}
              onChange={(e) => edit("address", setAddress)(clean("address", e.target.value))}
              placeholder="House no., street, area, city"
            />
            {err("address")}
          </div>
          <div className="field dsk:col-span-2">
            <label htmlFor="svc-complaint">What's the complaint?</label>
            <textarea
              id="svc-complaint"
              className="input"
              maxLength={300}
              value={complaint}
              aria-invalid={!!errors.complaint}
              aria-describedby={errors.complaint ? "svc-complaint-err" : undefined}
              onChange={(e) => edit("complaint", setComplaint)(clean("message", e.target.value))}
              placeholder="E.g. Low water flow from RO unit"
            />
            {err("complaint")}
          </div>
          <button type="submit" className="btn btn-primary btn-block dsk:col-span-2">
            Send request on WhatsApp
          </button>
        </form>
      )}
    </section>
  );
}
