import "./globals.css";

export const metadata = {
  title: "株式会社 玄 | リフォーム・給排水・土木工事",
  description:
    "株式会社 玄は、リフォーム・給排水・土木工事を通じて、暮らしと街を支えます。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}