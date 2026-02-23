"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import ProductoCard from "./components/ProductoCard";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [category, setCategory] = useState("");

  // Obtener géneros únicos para el select
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category).filter(Boolean));
    return ["", ...Array.from(set).sort()];
  }, [products]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const url = category
          ? `http://localhost:4000/products?category=${encodeURIComponent(category)}`
          : "http://localhost:4000/products";

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("No se pudo cargar la lista de productos.");
        }

        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Error inesperado.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category]);

  return (
    <main className="mx-auto max-w-6xl p-4 sm:p-6">
      <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Catálogo de productos</h1>
          <p className="mt-1 text-sm text-white/60">
            {loading ? "Cargando..." : `${products.length} producto(s)`}
          </p>
        </div>

        {/* Filtro por género */}
        <div className="w-full sm:w-64">
          <label className="text-sm text-white/70">Categoría</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white outline-none hover:border-white/30 focus:border-indigo-400/70"
          >
            {categories.map((g) => (
              <option key={g || "all"} value={g} className="text-black">
                {g || "Todos"}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Estados */}
      {error && (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/70">
          Cargando catálogo...
        </div>
      ) : (
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {products.map((p) => (
            <ProductoCard key={p.id} product={p} />
          ))}
        </section>
      )}
    </main>
  );
}