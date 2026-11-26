import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "./icons";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Katalog UMKM", template: "%s · Katalog UMKM" },
  description: "Demo katalog kopi lokal. Pilih varian kopi dan siapkan draf pesananmu.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id">
      <body>
        <a className="skip-link" href="#konten">Lewati ke konten</a>
        <header className="site-header">
          <div className="shell header-inner">
            <Link href="/" className="brand">
              <span className="brand-mark"><Icon name="cup" /></span>
              Katalog UMKM
            </Link>
            <span className="demo-label">Demo Project</span>
          </div>
        </header>
        {children}
        <footer className="shell site-footer">
          <span>Katalog UMKM</span>
          <span>Produk fiktif untuk demo.</span>
        </footer>
      </body>
    </html>
  );
}
