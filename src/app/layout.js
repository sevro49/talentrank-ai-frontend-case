import "../styles/globals.scss" // Import global styles
import StoreProvider from "./StoreProvider";

export const metadata = {
  title: "Talentrank.ai Frontend Case | Emre Güler", 
  description: "Developed by Emre Güler for Talentrank.ai",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
