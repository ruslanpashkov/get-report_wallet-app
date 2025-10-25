import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import type { Metadata } from "next";
import type { ReactNode } from "react";

// Prevent Font Awesome from adding its CSS automatically since we import it manually
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Wallet App",
  description: "Mobile wallet application with transaction management",
};

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className="antialiased text-text-primary bg-background-primary max-w-[420px] mx-auto">
        {children}
      </body>
    </html>
  );
}
