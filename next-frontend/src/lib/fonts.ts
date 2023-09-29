import {
  Josefin_Sans as FontJosefin,
  JetBrains_Mono as FontMono,
  Poppins as FontPoppins,
  Quicksand as FontQuickSand,
  Inter as FontSans,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontJosefin = FontJosefin({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontQuickSand = FontQuickSand({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontPoppins = FontPoppins({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-sans",
});
