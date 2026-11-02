import ProductCard from "./ProductCard";

function ProductList() {
    const products = [
        {
            id: 1,
            name: "GEL-KAYANO 33",
            price: 749,
            image: "https://images.asics.com/is/image/asics/1012B939_402_SB_FR_GLB?$productlist$",
            colours: "9 Colours",
        },
        {
            id: 2,
            name: "GEL-NIMBUS 28 WIDE",
            price: 749,
            image: "https://images.asics.com/is/image/asics/1012B917_251_SB_FR_GLB?$productlist$",
            colours: "6 Colours",
        },
        {
            id: 3,
            name: "GEL-KAYANO 33",
            price: 749,
            image: "https://images.asics.com/is/image/asics/1012B939_700_SB_FR_GLB?$productlist$",
            colours: "9 Colours",
        },
    ];

    return (
        <div className="grid grid-cols-3 gap-10 w-full px-10">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    colours={product.colours}
                />
            ))}
        </div>
    );
}

export default ProductList;