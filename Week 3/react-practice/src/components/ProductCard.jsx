function ProductCard({
  id,
  name = "Unknown Product",
  price = 0,
  image = "/placeholder.jpg",
  isOnSale = false,
}) {
  return (
    <div className="w-full bg-white">

      {/* Product Image */}
      <div className="w-full h-[250px] flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="relative text-center mt-2">

        {/* Product Name */}
        <h2 className="text-lg font-bold text-blue-900 mt-2">
          {name}
        </h2>

        {/* Category */}
        <p className="text-sm text-gray-500 mt-1">
          Women's Running Shoes
        </p>

        {/* Price */}
        <p className="text-lg font-bold text-blue-900 mt-1">
          RM {Number(price).toFixed(2)}
        </p>

      </div>
    </div>
  );
}

export default ProductCard;