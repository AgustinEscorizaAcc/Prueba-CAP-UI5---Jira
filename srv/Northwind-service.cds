using {PruebaCAPUI5Jira.db as my} from '../db/Northwind-schema';

service Api {

    entity Products as
        select from my.Products {
            *
        };

}
