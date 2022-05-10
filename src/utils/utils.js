/**
 * Función para encontrar productos por descripción y marca de acuerdo a la consulta
 * @param {Array<object>} productsArray - Arreglo de productos existentes
 * @param {string} query - consulta realizada en búsqueda
 * @returns - Arreglo de productos
 */
function findProduct(productsArray, query){
    let results = [];
    results = results.concat(productsArray.filter(product => product.description.indexOf(query) > -1));
    results = results.concat(productsArray.filter(product => product.brand.indexOf(query) > -1));
    return results;
}

/**
 * Función para asignar descuento a productos encontrados
 * @param {Array<object>} productsArray - Arreglo de productos que fueron filtrados por la búsqueda
 * @param {float} discount - Valor entre 0 y 1 que permite identificar el porcentaje de descuento en los productos
 * @returns - Arreglo de productos
 */
function applyDiscount(prods, discount){
    prods.forEach(product=>{
        const priceDiscount = product.price * discount;
        product.price -= priceDiscount; // eslint-disable-line
    });
    return prods;
}

/**
 * Función para encontrar productos por id de acuerdo a la consulta
 * @param {Array<object>} productsArray - Arreglo de productos existentes
 * @param {string} query - consulta realizada en búsqueda
 * @returns - Arreglo de productos
 */
function findProductById(productsArray, query){
    let results = [];
    results = productsArray.filter(product => product.id === Number(query));
    return results;
}


export default {findProduct, applyDiscount, findProductById};
