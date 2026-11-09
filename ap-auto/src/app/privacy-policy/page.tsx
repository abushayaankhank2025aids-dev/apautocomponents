import type { Metadata } from "next";
import { StubPage } from "@/components/sections/StubPage";
export const metadata: Metadata = { title: "Privacy Policy", description: "Privacy policy of A.P. Auto Components." };
export default function Page() { return <StubPage title="Privacy Policy" note="Policy text to be supplied by the owner." />; }
