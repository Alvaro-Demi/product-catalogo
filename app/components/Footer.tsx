export default function Footer() {
    return (
      <footer className="mt-10 border-t border-white/10 bg-black/20">
        <div className="mx-auto max-w-6xl p-4 text-center text-xs text-white/60 sm:p-6">
          © {new Date().getFullYear()} Tienda de Productos · Alvaro de Miguel
        </div>
      </footer>
    );
  }