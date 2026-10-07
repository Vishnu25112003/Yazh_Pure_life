import { FormEvent, useState } from "react";
import { waLink } from "../data";
import { ChevronRightIcon, DropletIcon, WrenchIcon } from "./icons";

type Errors = Partial<Record<"name" | "phone" | "customerId" | "address" | "complaint", string>>;

export function ServiceSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [address, setAddress] = useState("");
  const [complaint, setComplaint] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors: Errors = {};
    if (name.trim().length < 2 || name.trim().length > 60) {
      nextErrors.name = "Enter your name (2-60 characters).";
    }
    if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      nextErrors.phone = "Enter a valid 10-digit mobile number.";
    }
    if (customerId.trim().length < 1 || customerId.trim().length > 30) {
      nextErrors.customerId = "Enter your customer ID (up to 30 characters).";
    }
    if (address.trim().length < 5 || address.trim().length > 250) {
      nextErrors.address = "Enter your address (5-250 characters).";
    }
    if (complaint.trim().length < 5 || complaint.trim().length > 200) {
      nextErrors.complaint = "Describe the issue (5-200 characters).";
    }
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const message = `New service request from website:\nName: ${name.trim()}\nMobile: ${phone.trim()}\nCustomer ID: ${customerId.trim()}\nAddress: ${address.trim()}\nComplaint: ${complaint.trim()}`;
    window.open(waLink(message), "_blank");
    setSent(true);
    setErrors({});
  };

  return (
    <section id="service" className="grid gap-[var(--space-3)]">
      <h2 className="m-0">Report a fault, fast</h2>

      {sent ? (
        <div className="card ypl-card p-[var(--space-4)] text-center">
          <p className="m-0">
            Thanks — your request is ready on WhatsApp. Send it across and we will call you back shortly.
          </p>
        </div>
      ) : (
        <form className="card ypl-card p-[var(--space-4)] gap-[var(--space-3)]" onSubmit={handleSubmit}>
          <div className="field">
            <label>Name</label>
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
            {errors.name && (
              <div className="text-[12px] mt-1" style={{ color: "var(--color-accent-900)" }}>
                {errors.name}
              </div>
            )}
          </div>
          <div className="field">
            <label>Mobile number</label>
            <input
              className="input"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="10-digit mobile number"
            />
            {errors.phone && (
              <div className="text-[12px] mt-1" style={{ color: "var(--color-accent-900)" }}>
                {errors.phone}
              </div>
            )}
          </div>
          <div className="field">
            <label>Customer ID</label>
            <input
              className="input"
              type="text"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              placeholder="Your customer ID"
            />
            {errors.customerId && (
              <div className="text-[12px] mt-1" style={{ color: "var(--color-accent-900)" }}>
                {errors.customerId}
              </div>
            )}
          </div>
          <div className="field">
            <label>Address</label>
            <textarea
              className="input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House no., street, area, city"
            />
            {errors.address && (
              <div className="text-[12px] mt-1" style={{ color: "var(--color-accent-900)" }}>
                {errors.address}
              </div>
            )}
          </div>
          <div className="field">
            <label>What's the complaint?</label>
            <textarea
              className="input"
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              placeholder="E.g. Low water flow from RO unit"
            />
            {errors.complaint && (
              <div className="text-[12px] mt-1" style={{ color: "var(--color-accent-900)" }}>
                {errors.complaint}
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Send request on WhatsApp
          </button>
        </form>
      )}

      <div className="grid grid-cols-3 gap-[var(--space-2)]">
        <a href="#service" className="card ypl-card p-[var(--space-3)] text-center text-xs gap-1 items-center">
          <WrenchIcon className="mx-auto" />
          Book service
        </a>
        <a href="#spares" className="card ypl-card p-[var(--space-3)] text-center text-xs gap-1 items-center">
          <DropletIcon className="mx-auto" />
          Order spares
        </a>
        <a
          href="#consultation"
          className="card ypl-card p-[var(--space-3)] text-center text-xs gap-1 items-center"
        >
          <ChevronRightIcon className="mx-auto" />
          Get a quote
        </a>
      </div>
    </section>
  );
}
