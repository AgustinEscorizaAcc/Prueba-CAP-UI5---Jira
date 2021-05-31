const cds = require('@sap/cds');
const axios = require('axios');

cds.once('served', async () => {
    const { Products, Employees, Orders } = cds.entities;

    await getProducts('Products');
    await getOrders('Orders');
    await getEmployees('Employees');
    
    async function getOrders(url){
        await axios.get(`https://services.odata.org/Experimental/Northwind/Northwind.svc/${url}`)
            .then(async function (response){
                try{
                    const allOrders = response.data.value;
                    let aCargar = [];
                    for(let order of allOrders){
                        aCargar.push({
                            ordersId : order.OrderID,
                            //customer_CustomerID : order.CustomerID,  Falta lo de ochu
                            employee_employeeID : order.EmployeeID,
                            orderDate : order.OrderDate,
                            requiredDate : order.RequiredDate,
                            shippedDate : order.ShippedDate,
                            shipVia : order.ShipVia,
                            freight : order.Freight,
                            shipName : order.ShipName,
                            shipAddress : order.ShipAddress,
                            shipCity : order.ShipCity,
                            shipRegion : order.ShipRegion,
                            shipPostalCode : order.ShipPostalCode,
                            shipCountry : order.ShipCountry
                        });
                    }
                    
                    await cds.run(INSERT.into('Orders').entries(aCargar));
                    console.log("Se han insertado los Orders correctamente.");

                    let nextLink = response.data['@odata.nextLink'];
                    if (nextLink) {
                        await getOrders(nextLink);
                    }
                } catch (err){
                    console.log("Ha ocurrido un error");
                    console.log(err);
                    return "Ha ocurrido un error al insertar los datos de los Orders";
                }
            })
            .catch( function(err){
                console.log(err);
                console.log("Ocurrieron errores:");
                return "Ha ocurrido un error al intendar dar con la url Orders";
            })
    };
    async function getEmployees(url) {
        await axios.get(`https://services.odata.org/Experimental/Northwind/Northwind.svc/${url}`)
            .then(async function (response) {
                try {
                    const allEmployees = response.data.value;
                    let employees = [];
                    for (let employee of allEmployees) {
                        employees.push({
                            employeeID: employee.EmployeeID,
                            lastName: employee.LastName,
                            firstName: employee.FirstName,
                            title: employee.Title,
                            titleOfCourtesy: employee.TitleOfCourtesy,
                            birthDate: employee.BirthDate,
                            hireDate: employee.HireDate,
                            address: employee.Address,
                            city: employee.City,
                            region: employee.Region,
                            postalCode: employee.PostalCode,
                            country: employee.Country,
                            homePhone: employee.HomePhone,
                            extension: employee.Extension,
                            notes: employee.Notes,
                            reportsTo: employee.ReportsTo,
                            photopath: employee.PhotoPath
                        });
                    }
                    await cds.run(INSERT.into("Employees").entries(employees));
                    console.log("Se han insertado los employees correctamente.");
                    // let nextLink = response.data['@odata.nextLink'];
                    // if (nextLink) {
                    //     await getEmployees(nextLink);
                    // }
                } catch (err) {
                    console.log("Ha ocurrido un error");
                    console.log(err);
                    return "Ha ocurrido un error al insertar los datos de los Employees";
                }
            })
            .catch(function (err) {
                console.log(err);
                console.log("Ocurrieron errores:");
                return "Ha ocurrido un error al intendar dar con la url Employees";
            })
    };
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
                    await cds.run(INSERT.into("Products").entries(products));
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