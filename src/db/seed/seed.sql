INSERT INTO users (name, email) VALUES
    ('John Doe', 'john@example.com'),
    ('Alice Smith', 'alice@example.com'),
    ('Bob Johnson', 'bob@example.com');


INSERT INTO products (user_id, name, product) VALUES
    (1, 'Product A', 'Description for Product A'),
    (2, 'Product B', 'Description for Product B'),
    (1, 'Product C', 'Description for Product C'),
    (3, 'Product D', 'Description for Product D');