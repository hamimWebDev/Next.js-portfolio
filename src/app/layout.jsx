"use client";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider, useIsFetching } from "@tanstack/react-query";
import UserProvider from "../context/user.provider";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";
import { useUser } from "../context/user.provider";

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-inter",
});

const bebasNeue = Bebas_Neue({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-bebas",
});

const queryClient = new QueryClient();

function GlobalPreloader() {
  const isFetching = useIsFetching();
  const { isLoading: userLoading } = useUser();
  const showPreloader = userLoading || isFetching > 0;
  return showPreloader ? <Loading /> : null;
}

export default function RootLayout({ children }) {
  const router = useRouter();

  return (
    <html lang="en">
      <head>
        <title>Md. Hamim Howlader Asif</title>
        
        
        <meta
          name="Md. Hamim Howlader Asif"
          content="I am a full-stack developer, and I love to build web applications."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`antialiased ${inter.variable} ${bebasNeue.variable}`} suppressHydrationWarning>
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <NextUIProvider navigate={router.push}>
              <Toaster />
              <GlobalPreloader />
              {children}
            </NextUIProvider>
          </UserProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
