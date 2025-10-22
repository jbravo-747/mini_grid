import "../styles/globals.css";
import { Open_Sans } from "next/font/google";

// Configuración de la fuente Open Sans
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-open-sans",
  display: "swap", // Mejora el rendimiento al cargar la fuente
});

// Metadatos para SEO y accesibilidad
export const metadata = {
  title: "Mini Grid Aranceles",
  description: "Grid de 6 tarjetas para investigaciones sobre aranceles (IMCO & El Universal).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es"> {/* Idioma configurado como español */}
      {/* Activamos la variable de fuente y aplicamos font-sans de Tailwind */}
      <body className={`${openSans.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}