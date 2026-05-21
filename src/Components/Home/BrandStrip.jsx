const brands = ['ALUCARD', 'ZOTAC', 'FURY', 'PREMIUM', 'URBAN', 'NEXTGEN'];

const BrandStrip = () => {
  return (
    <section className="bg-black py-8">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {brands.map((brand) => (
            <div
              key={brand}
              className="rounded-2xl border border-yellow-400/30 px-4 py-4 text-center text-sm font-black tracking-[0.18em] text-yellow-400"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandStrip;