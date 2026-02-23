"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Product } from "@/lib/types";
import Link from "next/link";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`http://localhost:4000/products/${id}`);

        if (!res.ok) {
          throw new Error("No se pudo cargar el producto seleccionado.");
        }

        const data = await res.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message || "Error inesperado.");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  return (
    <main className="mx-auto max-w-5xl p-4 sm:p-6">
      <Link href="/" className="text-sm text-white/60 hover:text-white">
        ← Volver al catálogo
      </Link>

      {error && (
        <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
          {error}
        </div>
      )}

      {loading ? (
        <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-6 text-white/70">
          Cargando producto...
        </div>
      ) : !product ? (
        <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-6 text-white/70">
          Producto no encontrado.
        </div>
      ) : (
        <section className="mt-4 grid gap-6 rounded-2xl border border-white/10 bg-white/5 p-4 sm:grid-cols-[260px_1fr] sm:p-6">
          {/* Poster */}
          <div className="overflow-hidden rounded-xl border border-white/10 bg-white/10">
            {product.img_url ? (
              <img
                src={product.img_url}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex aspect-[2/3] items-center justify-center text-xs text-white/50">
                No poster
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
           

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                <p className="text-xs text-white/60">ID</p>
                <p className="text-sm font-medium">{product.id}</p>
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                <p className="text-xs text-white/60">Categoría</p>
                <p className="text-sm font-medium">{product.category}</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                <p className="text-xs text-white/60">Disponibilidad</p>
                <p className="text-sm font-medium">{product.available ? "Disponible" : "No disponible"}</p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs text-white/60">Descripción</p>
              <p className="mt-2 text-sm leading-relaxed text-white/80">
                {product.description}
              </p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}