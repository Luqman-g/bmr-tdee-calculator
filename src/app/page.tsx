import BmrTdeeCalculator from "@/components/BmrTdeeCalculator";

export default function Page() {
  return (
    <main className="px-4 md:px-6 py-10">
      {/* Central container — tweak max-w to taste: 6xl (~1152px) or 7xl (~1280px) */}
      <div className="mx-auto w-full max-w-7xl">
        <BmrTdeeCalculator />
      </div>
    </main>
  );
}
