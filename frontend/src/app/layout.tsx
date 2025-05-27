import '../styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body >
        <div className="bg-gray-100">
          {children}
        </div>
      </body>
    </html>
  );
}