import "@/styles/global.css";
import { ReactQueryProvider } from "@/providers/react-query";
import { AbilitiesProvider } from "@/services/abilities/abilities-context";
import { MSWComponent } from "@/providers/msw";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
    <MSWComponent />
    <html lang="en">
      <body>
        <AbilitiesProvider
          context={{
            permissions: {
              teams: "access",
              bank_accounts: "create",
              savings: "access",
            },
          }}
        >
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </AbilitiesProvider>
      </body>
    </html>
    </>
  );
}
