import { Header } from "../../components/ui/header";

  
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full">
      <Header />

      {children}
    </div>
  );
}