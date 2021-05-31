//using { cuid } from '@sap/cds/common';

namespace PruebaCAPUI5Jira.db;

entity Products {
    key productID       : Integer;
        name            : String;
        quantityPerUnit : String;
        unitPrice       : Decimal(7, 4);
        unitsInStock    : Integer;
        unitsOnOrder    : Integer;
        //categoryID: Association to Categories
        //supplierID: Association to Suppliers 
        reOrderLevel    : Integer;
        discontinued    : Boolean;
}

entity Customers
{
    key customerID: String;
    companyName: String;
    contactName: String;
    contactTitle: String;
    address: String;
    city: String;
    //Region: null,
    postalCode: Integer;
    country: String;
    phone: String;
    fax: String;
}

entity Invoices
{
    invoiceID: Integer;
    shipName: String;
    shipAddress: String;
    shipCity: String;
    shipPostalCode: Integer;
    shipCountry: String;
    //customerID: Association to Customers;
    address: String;
    postalCode: Integer;
    country: String;
    salesperson: String;
    //orderID: Association to Orders;
    productID: Association to Products;
    quantity: Integer;
    discount: Integer;
    extendedPrice: Decimal(7, 4);
    freight: Decimal(7, 4);
}