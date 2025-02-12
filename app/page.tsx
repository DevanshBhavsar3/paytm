"use client";

import { SessionProvider, useSession } from "next-auth/react";

export default function Home() {
  return (
    <SessionProvider>
      <TempHome />
    </SessionProvider>
  );
}

function TempHome() {
  const session = useSession();

  return <div>{JSON.stringify(session)}</div>;
}
