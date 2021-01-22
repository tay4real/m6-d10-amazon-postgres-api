

CREATE TABLE IF NOT EXISTS 
users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL
);                                                                                                                                                                                                                                                   


CREATE TABLE IF NOT EXISTS 
categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    categoryName VARCHAR(50) NOT NULL,
    categoryImageUrl VARCHAR(50) NOT NULL
);


CREATE TABLE IF NOT EXISTS 
products (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    productName VARCHAR(50) NOT NULL,
    productDescription VARCHAR(50) NOT NULL,
    productBrand VARCHAR(50) NOT NULL,
    productImageUrl VARCHAR(50) NOT NULL,
    productPrice NUMERIC NOT NULL,
    productCategory VARCHAR(50) NOT NULL,
    categoryId INTEGER NOT NULL,

    FOREIGN KEY (categoryId) REFERENCES categories
);                                                                                                                                                                                                                                                   

CREATE TABLE IF NOT EXISTS 
carts (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    userId INTEGER NOT NULL,
    productId INTEGER NOT NULL,
        
    FOREIGN KEY (userId) REFERENCES users,
    FOREIGN KEY (productId) REFERENCES products
);



CREATE TABLE  IF NOT EXISTS 
reviews(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, /* AUTO GENERATED ID */
    comment TEXT  NOT NULL ,
    rate SMALLINT NOT NULL CHECK(rate < 6) ,
    productId INTEGER NOT NULL,

    FOREIGN KEY (productId) REFERENCES products
);










