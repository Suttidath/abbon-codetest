"use client";

import { Provider } from "react-redux";
import userStore from "../store/userStore";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Provider store={userStore}>{children}</Provider>;
}
