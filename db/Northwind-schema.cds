//using { cuid } from '@sap/cds/common';

namespace PruebaCAPUI5Jira.db;

entity Products {
    key productID       : Integer;
        name            : String;
        quantityPerUnit : String;
        unitPrice       : Decimal(7, 4);
        unitsInStock    : Integer;
        unitsOnOrder    : Integer;
        //categoryId: Association to Categories
        //supplierId: Association to Suppliers 
        reOrderLevel    : Integer;
        discontinued    : Boolean;
}

entity Employees{
    key employeeID : Integer;
        lastName : String;
        firstName : String;
        title : String;
        titleOfCourtesy : String;
        birthDate : DateTime;
        hireDate : DateTime;
        address: String;
        city: String;
        region: String;
        postalCode : String;
        country : String;
        homePhone : String;
        extension : String;
        photo : LargeString;
        notes : String;
        reportsTo : String;
        photopath : String;
}

entity Orders{
    key ordersId : Integer;
        customer : Association to Customers;
        employee : Association to Employees;
        orderDate : DateTime;
        requiredDate : DateTime;
        shippedDate : DateTime;
        shipVia : Integer;
        freight : Decimal(7,4);
        shipName : String;
        shipAddress : String;
        shipCity : String;
        shipRegion : String;
        shipPostalCode : String;
        shipCountry : String;
}

entity Customers{
    key CustomerID : Integer;
}
