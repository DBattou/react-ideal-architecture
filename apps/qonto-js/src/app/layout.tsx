import "@/styles/global.css";
import { ReactQueryProvider } from "@/providers/react-query";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
  <html lang="en">
    <body>
      <ReactQueryProvider>
        {children}
      </ReactQueryProvider>
    </body>
  </html>
  )
}
