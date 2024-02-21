



PostgreSQL Database
-------------


**Database Name:** grocery\_booking

**Table Schema**

**tbl\_grocery\_items**

| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      | 

1.  **tbl\_cart**


CREATE TABLE tbl_grocery_items (
  id SERIAL,
  name VARCHAR(255) UNIQUE,
  category VARCHAR(255),
  price REAL
);

CREATE TABLE tbl_cart (
  id SERIAL,
  user_email VARCHAR(255),
  item_name VARCHAR(255),
  quantity INT
);