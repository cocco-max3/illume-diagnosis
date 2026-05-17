import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Illume Works | 詰まり診断",
  description: "入力を外部送信せず、ルールベースで詰まりタイプと次の一手を診断します。",
  robots: {
    index: false,
    follow: false
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
