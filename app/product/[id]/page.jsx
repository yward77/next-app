const API_URL = "http://localhost:1337";

export default async function ProductPage({ params }) {
  const { id } = params;

  const res = await fetch(`${API_URL}/api/products/${id}?populate=*`, {
    cache: "no-store",
  });

  if (!res.ok) return <p>Product not found</p>;

  const data = await res.json();
  const p = data.data;
  if (!p) return <p>Product not found</p>;

  const attributes = p.attributes || {};
  const imgData = attributes.imag?.data;
  const firstImg = Array.isArray(imgData) ? imgData[0] : imgData;

  const img =
    firstImg?.attributes?.formats?.medium?.url ||
    firstImg?.attributes?.formats?.small?.url ||
    firstImg?.attributes?.url ||
    null;

  const fullImg = img ? `${API_URL}${img}` : null;
  const desc =
    attributes.description ||
    attributes.description?.[0]?.children?.[0]?.text ||
    "";

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">{attributes.name}</h1>

      {fullImg ? (
        <img
          src={fullImg}
          alt={attributes.name}
          className="w-full h-auto mb-4 rounded-xl shadow"
        />
      ) : (
        <div className="w-full h-60 bg-gray-200 flex items-center justify-center rounded-xl">
          No Image
        </div>
      )}

      <p className="mb-4 text-lg">{desc}</p>

      <p className="text-2xl font-extrabold text-gray-800">
        ${attributes.price || 0}
      </p>
    </div>
  );
}
