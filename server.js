const cds = require('@sap/cds');
const axios = require('axios');

cds.once('served', async () => {
    const { Products, Categories, Suppliers } = cds.entities;

    await getProducts('Products');
    await getCategories('Categories');
    await getSuppliers('Suppliers');

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
                            category_categoryID: product.CategoryID,
                            supplier_supplierID: product.SupplierID,
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

    async function getCategories(url) {
        await axios.get(`https://services.odata.org/Experimental/Northwind/Northwind.svc/${url}`)
            .then(async function (response) {
                try {
                    const allCategories = response.data.value;
                    let categories = [];
                    for (let categorie of allCategories) {
                        categories.push({
                            categoryID: categorie.categoryID,
                            categoryName: categorie.CategoryName,
                            description: categorie.Description,
                            picture: String.Picture
                        });
                    }
                    await cds.run(INSERT.into(Categories).entries(categories));
                    console.log("Se han insertado las categorias correctamente.");

                    let nextLink = response.data['@odata.nextLink'];
                    if (nextLink) {
                        await getCategories(nextLink);
                    }

                } catch (err) {
                    console.log("Ha ocurrido un error");
                    console.log(err);
                    return "Ha ocurrido un error al insertar los datos de las categorias";
                }
            })
            .catch(function (err) {
                console.log(err);
                console.log("Ocurrieron errores:");
                return "Ha ocurrido un error al intendar dar con la url categories";
            })
    }

    async function getSuppliers(url) {
        await axios.get(`https://services.odata.org/Experimental/Northwind/Northwind.svc/${url}`)
            .then(async function (response) {
                try {
                    const allSuppliers = response.data.value;
                    let suppliers = [];
                    for (let supplier of allSuppliers) {
                        suppliers.push({
                            supplierID: supplier.SupplierID,
                            companyName: supplier.CompanyName,
                            contactName: supplier.ContactName,
                            contactTitle: supplier.ContactTitle,
                            address: supplier.Address,
                            city: supplier.City,
                            region: supplier.Region,
                            postalCode: supplier.PostalCode,
                            country: supplier.Country,
                            phone: supplier.Phone,
                            fax: supplier.Fax,
                            homePage: supplier.HomePage
                        });
                    }
                    await cds.run(INSERT.into(Suppliers).entries(suppliers));
                    console.log("Se han insertado los proveedores correctamente.");

                    let nextLink = response.data['@odata.nextLink'];
                    if (nextLink) {
                        await getSuppliers(nextLink);
                    }

                } catch (err) {
                    console.log("Ha ocurrido un error");
                    console.log(err);
                    return "Ha ocurrido un error al insertar los datos de los proveedores";
                }
            })
            .catch(function (err) {
                console.log(err);
                console.log("Ocurrieron errores:");
                return "Ha ocurrido un error al intendar dar con la url suppliers";
            })
    }

});

module.exports = cds.server;