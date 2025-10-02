import {
    DM_Sans,
    Geist,
    Inter,
    Open_Sans,
    Roboto_Mono,
    Poppins,
  } from "next/font/google";
  
  export const geistFont = Geist({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  });
  
  export const interFont = Inter({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  });
  
  export const poppinsFont = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  });
  
  export const dmSansFont = DM_Sans({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  });
  
  export const openSansFont = Open_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
  });
  
  export const robotoMonoFont = Roboto_Mono({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
  });
  