import "./globals.css";

export const metadata = {
  title: "Recyclu",
  description: "AI Powered Waste Management Platform",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <body>
      {children}
      </body>
      </html>
  );
}
