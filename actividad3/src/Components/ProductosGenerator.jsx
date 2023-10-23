import * as React from 'react';
import ProdcutoCards from './Productos';

export default function ProductosGenerator(productos) {
    let array = productos.productos.productos
    console.log(array)
    return (
        <div>
            {array.map(producto =>
                <ProdcutoCards aux={producto} array={array} />
            )}
        </div>
    )
}