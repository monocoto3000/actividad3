import ProductosGenerator from "./ProductosGenerator"
export default function Carrito(productos) {
    return (
        <ProductosGenerator productos={productos} />
    )
}