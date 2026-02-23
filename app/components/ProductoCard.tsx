"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";

export default function ProductoCard({ product }: { product: Product }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-white/20">
      <div className="relative aspect-[2/3] w-full bg-white/10">
        {product.img_url ? (
          <img
            src={product.img_url}
            alt={product.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-white/50">
            No poster
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="truncate text-base font-semibold">{product.name}</h3>
        {product.available ? <p className="text-green-500">Disponible</p> : <p className="text-red-500">No disponible</p>}
        <p className="mt-1 text-sm text-white/70">
          {product.category} 
        </p>

        <Link
          href={`/products/${product.id}`}
        >
          {/* From Uiverse.io by Itskrish01 */}
          <div className="p-2 ">
            <button
              className="relative flex items-center px-6 py-2 overflow-hidden font-medium transition-all bg-purple-600 rounded-md group"
            >
              <span
                className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-purple-800 rounded group-hover:-mr-4 group-hover:-mt-4"
              >
                <span
                  className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-purple-500"
                ></span>
              </span>
              <span
                className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-purple-800 rounded group-hover:-ml-4 group-hover:-mb-4"
              >
                <span
                  className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-purple-500"
                ></span>
              </span>
              <span
                className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-purple-800 rounded-md group-hover:translate-x-0"
              ></span>
              <span
                className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white"
              >Ver detalle
              </span>
            </button>
          </div>

        </Link>
      </div>
    </article>
  );
}