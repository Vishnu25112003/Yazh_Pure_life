import type { ClipboardEvent } from "react";
import { cleanMobile } from "../inputRules";

/**
 * Indian mobile number box: a fixed "+91" in front, then exactly 10 digits. Letters, symbols and a pasted
 * "+91 " or leading 0 are removed automatically. `value` / `onChange` carry the 10 digits only.
 */
export function MobileInput({
  id,
  value,
  onChange,
  invalid,
  className = "",
  inputClassName = "",
  placeholder = "10-digit mobile number",
  describedBy,
}: {
  id?: string;
  value: string;
  onChange: (digits: string) => void;
  invalid?: boolean;
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  describedBy?: string;
}) {
  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    onChange(cleanMobile(e.clipboardData.getData("text")));
  };
  return (
    <span className={`ypl-tel ${className}`} data-invalid={invalid || undefined}>
      <span className="ypl-tel-cc" aria-hidden="true">
        +91
      </span>
      <input
        id={id}
        className={inputClassName}
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        placeholder={placeholder}
        value={value}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        onPaste={onPaste}
        onChange={(e) => onChange(cleanMobile(e.target.value))}
      />
    </span>
  );
}
