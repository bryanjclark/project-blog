import React from "react";
import { Work_Sans, Spline_Sans_Mono } from "next/font/google";
import clsx from "clsx";

import { LIGHT_TOKENS, DARK_TOKENS, COLOR_THEME_COOKIE_ID } from "@/constants";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./styles.css";
import MotionRespectingLayout from "@/components/MotionRespectingLayout";
import { cookies } from "next/headers";
import DarkModeProvider from "@/components/DarkMode";

const mainFont = Work_Sans({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family",
});
const monoFont = Spline_Sans_Mono({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family-mono",
});

function RootLayout({ children }) {
  // TODO: Dynamic theme depending on user preference
  const savedTheme = cookies().get(COLOR_THEME_COOKIE_ID);
  const theme = savedTheme?.value || "light";
  const themeColors = theme === "light" ? LIGHT_TOKENS : DARK_TOKENS;

  return (
    <html
      lang="en"
      className={clsx(mainFont.variable, monoFont.variable)}
      data-color-theme={theme}
      style={themeColors}
    >
      <MotionRespectingLayout>
        <DarkModeProvider initialTheme={theme}>
          <body>
            <Header theme={theme} />
            <main>{children}</main>
            <Footer />
          </body>
        </DarkModeProvider>
      </MotionRespectingLayout>
    </html>
  );
}

export default RootLayout;
