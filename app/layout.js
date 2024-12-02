import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html className="h-full" lang="en">
      <body className="h-full">
        <div className="h-full">
          {children}
        </div>
      </body>
    </html>
  );
}
