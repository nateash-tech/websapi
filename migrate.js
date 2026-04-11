const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres.akfmdyarpcbcocjcuzlr:Irza520408301@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres',
  ssl: { rejectUnauthorized: false }
});

const sql = `
-- DROP EXISTING TABLES TO ENSURE CLEAN STATE
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS farms CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- CATEGORIES
CREATE TABLE categories (
  id       bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name     text NOT NULL,
  slug     text NOT NULL UNIQUE,
  icon     text
);

INSERT INTO categories (name, slug, icon) VALUES
  ('Ekonomis',     'ekonomis',      '🐄'),
  ('Medium',       'medium',        '🐄'),
  ('Premium',      'premium',       '🐄'),
  ('Kambing Domba','kambing-domba', '🐐'),
  ('Sapi Bali',    'sapi-bali',     '🐂');

-- FARMS
CREATE TABLE farms (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name        text NOT NULL,
  location    text,
  logo_url    text
);

INSERT INTO farms (name, location) VALUES
  ('Nusa Farm Tajurhalang', 'Tajurhalang, Bogor'),
  ('Mumbul Sari',           'Jawa Tengah'),
  ('Nusa Farm Ciseeng',     'Ciseeng, Bogor'),
  ('Nusa Farm Klaten',      'Klaten, Jawa Tengah'),
  ('Nusa Farm Jampang',     'Sukabumi, Jawa Barat');

-- PRODUCTS
CREATE TABLE products (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  kode_unik   text,
  name        text NOT NULL,
  jenis       text,
  bobot       int,
  posisi      text,
  harga       bigint DEFAULT 0,
  image_url   text,
  category_id bigint REFERENCES categories(id),
  farm_id     bigint REFERENCES farms(id),
  is_active   boolean DEFAULT true,
  created_at  timestamptz DEFAULT now()
);

-- SEED SOME SAMPLE PRODUCTS (Based on nusaQu reference)
INSERT INTO products (kode_unik, name, jenis, bobot, harga, category_id, farm_id) VALUES
  ('DQ057', 'Domba DQ057 2026 Bobot 41Kg', 'Domba', 41, 4100000, 4, 5),
  ('NQ008', 'Sapi Brangus NQ008 2026 Bobot 950Kg', 'Sapi Brangus', 950, 0, 1, 1),
  ('NQ084', 'Sapi Pegon Cross Brangus NQ084 2026 Bobot 1000Kg', 'Sapi Pegon', 1000, 0, 2, 1),
  ('NQ011', 'Sapi Simental NQ011 2026 Bobot 950Kg', 'Sapi Simental', 950, 0, 3, 1);

-- RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE farms      ENABLE ROW LEVEL SECURITY;
ALTER TABLE products   ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read farms"      ON farms      FOR SELECT USING (true);
CREATE POLICY "Public read products"   ON products   FOR SELECT USING (is_active = true);
`;

async function run() {
  try {
    await client.connect();
    console.log('✅ Connected to Supabase!');
    await client.query(sql);
    console.log('✅ Schema created and seeded successfully!');

    const cats = await client.query('SELECT * FROM categories ORDER BY id');
    console.log('\n📋 Categories:');
    cats.rows.forEach(r => console.log(`  - ${r.id}: ${r.name} (${r.slug})`));

    const farms = await client.query('SELECT * FROM farms ORDER BY id');
    console.log('\n🏡 Farms:');
    farms.rows.forEach(r => console.log(`  - ${r.id}: ${r.name}`));

    const prods = await client.query('SELECT count(*) FROM products');
    console.log(`\n📦 Total Products: ${prods.rows[0].count}`);

  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await client.end();
  }
}

run();
