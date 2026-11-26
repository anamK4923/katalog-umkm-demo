const paths = {
  cup: "M3 8h14v5a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm14 1h2a2.5 2.5 0 0 1 0 5h-2M2 21h18M8 3v2m5-2v2",
  cold: "M12 2v20M3.34 7l17.32 10M3.34 17 20.66 7M9 4l3 3 3-3M9 20l3-3 3 3M4 10l4-1-1-4m13 9-4 1 1 4M7 19l1-4-4-1m13-9-1 4 4 1",
  hot: "M5 13h12v3a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-3Zm12 0h2a2 2 0 1 1 0 4h-2M9 3c-2 2 2 3 0 5m5-5c-2 2 2 3 0 5",
  minus: "M5 12h14",
  plus: "M5 12h14m-7-7v14",
  copy: "M9 9h11v11H9zM15 5V4H4v11h1",
  receipt: "M6 3h12v18l-3-2-3 2-3-2-3 2V3Zm3 5h6m-6 4h6",
} as const;

export function Icon({ name }: { name: keyof typeof paths }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name]} />
    </svg>
  );
}
