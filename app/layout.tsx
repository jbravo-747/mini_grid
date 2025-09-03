export const metadata = {
  title: "Mini Grid Aranceles",
  description: "Grid de 6 tarjetas para investigaciones sobre aranceles (IMCO & El Universal).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
