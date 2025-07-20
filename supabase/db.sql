-- Bảng users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  full_name VARCHAR,
  phone VARCHAR,
  address TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Bảng products
create table products (
  id serial primary key,
  name varchar not null,
  price decimal not null,
  description text,
  category varchar,
  is_new boolean default false,
   featured_image varchar,
   quantity integer default 0,
  created_at timestamp default timezone('utc'::text, now()),
  updated_at timestamp default timezone('utc'::text, now())
);

-- Bảng product_details
create table product_details (
  id serial primary key,
  product_id integer references products(id) on delete cascade,
  material varchar,
  fit varchar,
  care varchar,
  origin varchar
);

-- Bảng product_sizes
create table product_sizes (
  id serial primary key,
  product_id integer references products(id) on delete cascade,
  size varchar not null
);

-- Bảng product_colors
create table product_colors (
  id serial primary key,
  product_id integer references products(id) on delete cascade,
  color varchar not null
);

-- Bảng product_images
create table product_images (
  id serial primary key,
  product_id integer references products(id) on delete cascade,
  image_url varchar not null,
);

-- Bảng carts
create table carts (
  id serial primary key,
  user_id integer,
  session_id varchar,
  created_at timestamp default timezone('utc'::text, now())
);

-- Bảng cart_items
create table cart_items (
  id serial primary key,
  cart_id integer references carts(id) on delete cascade,
  product_id integer references products(id),
  quantity integer not null,
  selected_size varchar,
  selected_color varchar,
);

-- Bảng orders
create table orders (
  id serial primary key,
  user_id integer not null,
  total_amount decimal not null,
  status varchar default 'pending',
  created_at timestamp default timezone('utc'::text, now())
);

-- Bảng order_items
create table order_items (
  id serial primary key,
  order_id integer references orders(id) on delete cascade,
  product_id integer references products(id),
  quantity integer not null,
  selected_size varchar,
  selected_color varchar,
  price_snapshot decimal not null
);
