import './globals.css';

export const metadata = {
  title: 'siwa',
  description: ' test application',
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="antialiased"
        style={{
          fontFamily: 'var(--font-geist-sans)',
        }}
      >
        {children}
      </body>
    </html>
  );
}
