import type { Metadata } from "next";
import { StubPage } from "@/components/sections/StubPage";
export const metadata: Metadata = { title: "Terms of Use", description: "Terms of use of A.P. Auto Components." };
export default function Page() { return <StubPage title="Terms of Use" note="Terms text to be supplied by the owner." />; }
