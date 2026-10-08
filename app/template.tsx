import { Template } from "@/components/layout/Template";

export default function RootTemplate({ children }: { children: React.ReactNode }) {
  return <Template>{children}</Template>;
}
