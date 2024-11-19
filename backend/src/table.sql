CREATE TABLE customer (
    customer_id serial PRIMARY KEY,
    customer_name VARCHAR(100) not null,
    customer_phone VARCHAR(100) not null,
    customer_addr VARCHAR(100) not null,
    customer_remark VARCHAR(255)
);

CREATE TABLE engineer (
    engineer_id INT PRIMARY KEY,
    engineer_name VARCHAR(255) not null,
    engineer_phone VARCHAR(20) not null,
    engineer_addr VARCHAR(255) not null,
    engineer_remark VARCHAR(255),
    engineer_commission INT DEFAULT 0,
    engineer_dayoff VARCHAR(20),
    engineer_holiday VARCHAR(20),
    engineer_payday VARCHAR(20) not null
);

CREATE TABLE "order" (
    order_id INT PRIMARY KEY,
    order_category VARCHAR(255) not null,
    order_date VARCHAR(20) not null,
    order_product VARCHAR(255) not null,
    order_total_amount INT not null,
    order_count INT not null DEFAULT 0,
    order_isDiscount BOOLEAN DEFAULT FALSE,
    order_discount_ratio INT,
    order_remark VARCHAR(255),
    order_deposit INT,
    deposit_payed BOOLEAN DEFAULT FALSE,
    order_payment VARCHAR(20) not null,
    order_reciept_docs VARCHAR(50) not null,
    reciept_docs_issued BOOLEAN
);

CREATE TABLE engineer_daily_earning (
    idx INT PRIMARY KEY,
    order_id INT REFERENCES "order"(order_id),
    engineer_id INT REFERENCES engineer(engineer_id),
    daily_income INT,
    date varchar(255) not null
);

CREATE TABLE skills (
    skill_id INT PRIMARY KEY,
    skill_type VARCHAR(255) not null 
);

CREATE TABLE engineer_skill (
    engineer_id INT REFERENCES engineer(engineer_id),
    skill_id INT REFERENCES skills(skill_id),
    PRIMARY KEY (engineer_id, skill_id)
);

CREATE TABLE customer_engineer_order (
    idx INT PRIMARY KEY,
    customer_id INT REFERENCES customer(customer_id),
    order_id INT REFERENCES "order"(order_id),
    engineer_id INT REFERENCES engineer(engineer_id)
);

CREATE TABLE admin_refresh_tokens (
    idx INT PRIMARY KEY,
    token_id INT not null,
    refresh_token VARCHAR(255) not null,
    created_at VARCHAR(50) not null,
    expires_at VARCHAR(50) not null
);

CREATE TABLE admin_account (
    idx INT PRIMARY KEY,
    admin_id VARCHAR(50) not null,
    admin_pw VARCHAR(255) not null,
    role VARCHAR(50) not null,
    token_version INT not null
);