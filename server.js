const cds = require('@sap/cds');
const axios = require('axios');

cds.once('served', async () => {
    const { Products, Customers, Invoices } = cds.entities;

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

    await getCustomers('Customers');

    async function getCustomers(url) {
        await axios.get(`https://services.odata.org/Experimental/Northwind/Northwind.svc/${url}`)
            .then(async function (response) {
                try {
                    const allCustomers = response.data.value;
                    let customers = [];
                    for (let customer of allCustomers) {
                        customers.push({
                            customerID: customer.CustomerID,
                            companyName: customer.CompanyName,
                            contactName: customer.ContactName,
                            contactTitle: customer.ContactTitle,
                            address: customer.Address,
                            city: customer.City,
                            postalCode: customer.PostalCode,
                            country: customer.Country,
                            phone: customer.Phone,
                            fax: customer.Fax
                        });
                    }
                    await cds.run(INSERT.into(Customers).entries(customers));
                    console.log("Se han insertado los Consumidores correctamente.");

                    let nextLink = response.data['@odata.nextLink'];
                    if (nextLink) {
                        await getCustomers(nextLink);
                    }

                } catch (err) {
                    console.log("Ha ocurrido un error");
                    console.log(err);
                    return "Ha ocurrido un error al insertar los datos de los Consumidores";
                }
            })
            .catch(function (err) {
                console.log(err);
                console.log("Ocurrieron errores:");
                return "Ha ocurrido un error al intentar dar con la url Customers";
            });
    }

    await getInvoices('Invoices');

    async function getInvoices(url) {
        await axios.get(`https://services.odata.org/Experimental/Northwind/Northwind.svc/${url}`)
            .then(async function (response) {
                try {
                    const allInvoices = response.data.value;
                    let invoices = [];
                    for (let invoice of allInvoices) {
                        invoices.push({
                            invoiceID: invoice.InvoiceID,
                            shipName: invoice.ShipName,
                            shipAddress: invoice.ShipAddress,
                            shipCity: invoice.ShipCity,
                            shipPostalCode: invoice.ShipPostalCode,
                            shipCountry: invoice.ShipCountry,
                            address: invoice.Address,
                            postalCode: invoice.PostalCode,
                            country: invoice.Country,
                            salesperson: invoice.Salesperson,
                            quantity: invoice.Quantity,
                            discount: invoice.Discount,
                            extendedPrice: invoice.ExtendedPrice,
                            freight: invoice.Freight
                        });
                    }
                    await cds.run(INSERT.into(Invoices).entries(invoices));
                    console.log("Se han insertado los Invoices correctamente.");

                    let nextLink = response.data['@odata.nextLink'];
                    if (nextLink) {
                        await getInvoices(nextLink);
                    }

                } catch (err) {
                    console.log("Ha ocurrido un error");
                    console.log(err);
                    return "Ha ocurrido un error al insertar los datos de los Invoices";
                }
            })
            .catch(function (err) {
                console.log(err);
                console.log("Ocurrieron errores:");
                return "Ha ocurrido un error al intentar dar con la url Invoices";
            });
    }

});

module.exports = cds.server;