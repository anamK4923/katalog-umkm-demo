"use client";

import { useRef, useState, type FormEvent } from "react";
import { Icon } from "../../icons";
import { formatRupiah, product } from "../../product";

type Variant = (typeof product.variants)[number];

export function OrderForm() {
  const [variant, setVariant] = useState<Variant>();
  const [quantity, setQuantity] = useState(1);
  const [variantError, setVariantError] = useState(false);
  const [copyResult, setCopyResult] = useState<{ draft: string; copied: boolean }>();
  const [copying, setCopying] = useState(false);
  const firstVariant = useRef<HTMLInputElement>(null);

  const rows = [
    { label: "Produk", value: product.name },
    { label: "Varian", value: variant ? `${variant.name} ${variant.size}` : "Belum dipilih" },
    { label: "Jumlah", value: `${quantity} gelas` },
    { label: "Total", value: formatRupiah(product.price * quantity) },
  ];
  const draft = rows.map(({ label, value }) => `${label}: ${value}`).join("\n");
  const activeResult = copyResult?.draft === draft ? copyResult : undefined;

  function changeQuantity(delta: number) {
    setQuantity((current) => Math.max(1, current + delta));
    setCopyResult(undefined);
  }

  async function copyDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!variant) {
      setVariantError(true);
      firstVariant.current?.focus();
      return;
    }

    setCopying(true);
    try {
      await navigator.clipboard.writeText(draft);
      setCopyResult({ draft, copied: true });
    } catch {
      setCopyResult({ draft, copied: false });
    } finally {
      setCopying(false);
    }
  }

  return (
    <form className="order-form" onSubmit={copyDraft} noValidate>
      <fieldset className="variant-group">
        <legend>Pilih varian <span className="required-label">Wajib</span></legend>
        <div className="variant-options">
          {product.variants.map((option, index) => (
            <label className="variant-option" key={option.id}>
              <Icon name={option.id === "es" ? "cold" : "hot"} />
              <span className="variant-label"><strong>{option.name}</strong> <span>{option.size}</span></span>
              <input
                ref={index === 0 ? firstVariant : undefined}
                type="radio"
                name="variant"
                value={option.id}
                checked={variant?.id === option.id}
                required
                aria-describedby={variantError ? "varian-error" : undefined}
                onChange={() => {
                  setVariant(option);
                  setVariantError(false);
                  setCopyResult(undefined);
                }}
              />
            </label>
          ))}
        </div>
        {variantError && <p className="form-error" id="varian-error" role="alert">Pilih varian sebelum menyalin draf.</p>}
      </fieldset>

      <div className="quantity" role="group" aria-labelledby="jumlah-label">
        <span id="jumlah-label">Jumlah</span>
        <div className="stepper">
          <button type="button" onClick={() => changeQuantity(-1)} disabled={quantity === 1} aria-label="Kurangi jumlah"><Icon name="minus" /></button>
          <span className="quantity-value" aria-live="polite">{quantity}<span className="sr-only"> gelas</span></span>
          <button type="button" onClick={() => changeQuantity(1)} aria-label="Tambah jumlah"><Icon name="plus" /></button>
        </div>
      </div>

      <section className="order-summary" aria-labelledby="ringkasan-label">
        <h2 id="ringkasan-label"><Icon name="receipt" /> Ringkasan pesanan</h2>
        <dl>
          {rows.map(({ label, value }) => (
            <div className={label === "Total" ? "summary-total" : undefined} key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <button className="button primary copy-button" type="submit" disabled={copying}>
          <Icon name="copy" /> {copying ? "Menyalin…" : "Salin draf"}
        </button>
        <p className="copy-status" role="status">
          {activeResult?.copied ? "Draf pesanan disalin." : activeResult ? "Penyalinan otomatis gagal. Salin teks di bawah secara manual." : "Draf disalin sebagai teks."}
        </p>
        {activeResult && !activeResult.copied && (
          <textarea className="copy-fallback" aria-label="Teks draf pesanan" value={draft} readOnly rows={5} onFocus={(event) => event.currentTarget.select()} />
        )}
      </section>
    </form>
  );
}
