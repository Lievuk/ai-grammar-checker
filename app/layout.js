import './globals.css'

export const metadata = {
  title: 'AI Grammar Checker',
  description: 'Analyze your writing for grammar, style, and readability',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <div className="container">
          <header>
            <h1>AI Grammar Checker</h1>
            <p className="subtitle">Analyze your writing for grammar, style, and readability</p>
          </header>
          <main>{children}</main>
          <footer>Powered by MiMo AI &mdash; 100T Token Grant Program</footer>
        </div>
      </body>
    </html>
  )
}