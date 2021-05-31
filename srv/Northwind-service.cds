using {PruebaCAPUI5Jira.db as my} from '../db/Northwind-schema';

service Api {

    entity Products as
        select from my.Products {
            *
        };

    entity Customers as
        select from my.Customers {
            *
        };

    entity Invoices as
        select from my.Customers {
            *
        };
}
