import Link from "next/link";
import { IngredientTable } from "./_components/ingredient-table";
import { ProductTable } from "./_components/produt-table";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getServerAuthSession } from "~/server/auth";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
}

const ButtonLink = ({ href, children }: ButtonLinkProps) => (
  <Link
    href={href}
    className="mt-2 max-w-xs rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
  >
    {children}
  </Link>
);

export default async function Home() {
  const session = await getServerAuthSession();

  // Basic error handling
  if (!session) {
    return (
      <div className="text-red-500">Session not found. Please log in.</div>
    );
  }

  return (
    <main className="flex flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <SpeedInsights />
      <ButtonLink href="/ingredients">Criar Ingredients</ButtonLink>
      <ButtonLink href="/racoes">Criar Racoes</ButtonLink>
      <ButtonLink href="/print-pdf">Imprimir Formulacoes</ButtonLink>
      <div className="mx-5 flex flex-row flex-wrap justify-around">
        <ProductTable />
        <IngredientTable />
      </div>
    </main>
  );
}
