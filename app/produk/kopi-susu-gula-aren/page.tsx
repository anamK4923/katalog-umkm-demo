import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { formatRupiah, product } from "../../product";
import { OrderForm } from "./order-form";

export const metadata: Metadata = {
  title: product.name,
  description: product.description,
};

export default function ProductPage() {
  return (
    <main id="konten" className="shell detail" tabIndex={-1}>
      <Link className="back-link" href="/">Kembali ke katalog</Link>
      <div className="detail-grid">
        <div className="detail-photo">
          <Image src={product.image} alt={product.imageAlt} fill sizes="(min-width: 1160px) 500px, (min-width: 760px) 48vw, 100vw" preload />
        </div>
        <div className="detail-info">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="detail-description">{product.description}</p>
          <p className="detail-price"><strong>{formatRupiah(product.price)}</strong> <span>/ gelas</span></p>
          <OrderForm />
        </div>
      </div>
    </main>
  );
}
