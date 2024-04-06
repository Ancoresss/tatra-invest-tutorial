import { Header } from "@/components/Header";

export default function Template({ children }) {
  return (
    <>
      <Header></Header>
      {children}
    </>
  );
}
