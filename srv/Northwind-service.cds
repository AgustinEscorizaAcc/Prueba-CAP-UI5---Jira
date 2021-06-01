using {PruebaCAPUI5Jira.db as my} from '../db/Northwind-schema';

service Api {

    entity Products   as
        select from my.Products {
            *
        };

    entity Categories as
        select from my.Categories {
            *
        };

    entity Suppliers  as
        select from my.Suppliers {
            *
        };
    entity Employees as 
        select from my.Employees {
            *
        };
    entity Orders as 
        select from my.Orders{
            *
        };
}
