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
