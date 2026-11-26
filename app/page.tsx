import Image from "next/image";
import Link from "next/link";
import { formatRupiah, product } from "./product";

export default function CatalogPage() {
  return (
    <main id="konten" className="shell catalog" tabIndex={-1}>
      <section className="hero" aria-labelledby="judul-katalog">
        <div className="hero-copy">
          <h1 id="judul-katalog">Kopi susu <em>gula aren.</em></h1>
          <p>{product.description} Nikmati dingin atau panas.</p>
          <Link className="button primary" href={product.href}>Lihat detail produk</Link>
        </div>
        <div className="hero-photo">
          <Image src={product.image} alt={product.imageAlt} fill sizes="(min-width: 1160px) 580px, (min-width: 760px) 52vw, 100vw" preload />
        </div>
      </section>

      <section className="catalog-menu" aria-labelledby="judul-menu">
        <div className="section-heading">
          <h2 id="judul-menu">Menu kopi</h2>
          <span>1 produk</span>
        </div>
        <article className="menu-card">
          <div className="menu-photo">
            <Image src={product.image} alt="" fill sizes="96px" />
          </div>
          <div className="menu-product">
            <p className="eyebrow">{product.category}</p>
            <h3><Link href={product.href}>{product.name}</Link></h3>
            <p className="menu-variants">
              {product.variants.map(({ id, name, size }) => <span key={id}>{name} {size}</span>)}
            </p>
          </div>
          <p className="menu-price"><strong>{formatRupiah(product.price)}</strong> <span>/ gelas</span></p>
        </article>
      </section>
    </main>
  );
}
