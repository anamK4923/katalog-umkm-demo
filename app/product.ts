export const product = {
  name: "Kopi Susu Gula Aren",
  category: "Kopi susu",
  description: "Espresso dan susu segar dengan manis karamel dari gula aren.",
  price: 22_000,
  image: "/kopi-susu-gula-aren.webp",
  imageAlt: "Es kopi susu gula aren dalam gelas bening dengan es batu",
  href: "/produk/kopi-susu-gula-aren",
  variants: [
    { id: "es", name: "Es", size: "350 ml" },
    { id: "panas", name: "Panas", size: "250 ml" },
  ],
} as const;

const rupiah = new Intl.NumberFormat("id-ID");

export function formatRupiah(amount: number) {
  return `Rp${rupiah.format(amount)}`;
}
