import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "LAUDI",
    template: "%s | LAUDI",
  },
  description:
    "laudi объединяет лучшие AI-модели, генерацию контента и рабочие сценарии в одном премиальном интерфейсе.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
