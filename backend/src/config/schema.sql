CREATE TABLE plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  rate_limit_minute INT DEFAULT 30,
  rate_limit_day INT DEFAULT 1000,
  batch_enabled BOOLEAN DEFAULT false,
  price DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  plan_id UUID REFERENCES plans(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'client' CHECK (role IN ('admin', 'client')),
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id),
  name VARCHAR(100),
  key_hash VARCHAR(255) NOT NULL,
  key_prefix VARCHAR(10) NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  last_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE cache_entries (
  cache_key VARCHAR(255) PRIMARY KEY,
  source VARCHAR(50),
  payload_json JSONB NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE requests_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id),
  api_key_id UUID REFERENCES api_keys(id),
  endpoint VARCHAR(100),
  document_hash VARCHAR(255),
  status_code INT,
  cached BOOLEAN DEFAULT false,
  response_time_ms INT,
  ip VARCHAR(45),
  user_agent TEXT,
  request_id VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID,
  action VARCHAR(100),
  target_type VARCHAR(50),
  target_id UUID,
  metadata_json JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO plans (name, rate_limit_minute, rate_limit_day, batch_enabled, price) VALUES
  ('Free', 10, 100, false, 0),
  ('Basic', 30, 1000, false, 49.90),
  ('Pro', 100, 10000, true, 149.90);

-- Insert Master Admin User
DO $$ 
DECLARE 
  pro_plan_id UUID;
  admin_client_id UUID;
BEGIN
  SELECT id INTO pro_plan_id FROM plans WHERE name = 'Pro' LIMIT 1;

  INSERT INTO clients (name, email, plan_id, status) 
  VALUES ('Admin Master', 'megafeiraodasloucas@gmail.com', pro_plan_id, 'active')
  RETURNING id INTO admin_client_id;
  
  INSERT INTO users (client_id, name, email, password_hash, role, status)
  VALUES (
    admin_client_id, 
    'Administrador', 
    'megafeiraodasloucas@gmail.com', 
    '$2b$10$KwkclZYq2ZZRjbJ4LP03Tu7NDLm135OPNCPP8qzpxdqPlgMg/tSTu', 
    'admin',
    'active'
  );
END $$;
