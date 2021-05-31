const cds = require('@sap/cds');
const axios = require('axios');

cds.once('served', async () => {
    const { Products } = cds.entities;

    await getProducts('Products');

    async function getProducts(url) {
        await axios.get(`https://services.odata.org/Experimental/Northwind/Northwind.svc/${url}`)
            .then(async function (response) {
                try {
                    const allProducts = response.data.value;
                    let products = [];
                    for (let product of allProducts) {
                        products.push({
                            productID: product.ProductID,
                            name: product.ProductName,
                            quantityPerUnit: product.QuantityPerUnit,
                            unitPrice: product.UnitPrice,
                            unitsInStock: product.UnitsInStock,
                            unitsOnOrder: product.UnitsOnOrder,
                            reOrderLevel: product.ReorderLevel,
                            discontinued: product.Discontinued
                        });
                    }
                    await cds.run(INSERT.into(Products).entries(products));
                    console.log("Se han insertado los productos correctamente.");

                    let nextLink = response.data['@odata.nextLink'];
                    if (nextLink) {
                        await getProducts(nextLink);
                    }

                } catch (err) {
                    console.log("Ha ocurrido un error");
                    console.log(err);
                    return "Ha ocurrido un error al insertar los datos de los products";
                }
            })
            .catch(function (err) {
                console.log(err);
                console.log("Ocurrieron errores:");
                return "Ha ocurrido un error al intendar dar con la url products";
            });
    }

});

module.exports = cds.server;