-- Insignias para completar módulos 2-10 (módulo 1 y gestión-riesgo ya existen)
INSERT INTO badges (slug, title, description, icon) VALUES
  ('modulo-2',  'Inversor diversificado',  'Completaste el módulo de Tipos de Activos',          '💰'),
  ('modulo-3',  'Lector de velas',          'Completaste el módulo de Velas Japonesas',            '🕯️'),
  ('modulo-4',  'Cazador de tendencias',    'Completaste el módulo de Tendencias de Mercado',      '📊'),
  ('modulo-5',  'Arquitecto del precio',    'Completaste el módulo de Soporte y Resistencia',      '🧱'),
  ('modulo-7',  'Mente de acero',           'Completaste el módulo de Psicología del Trading',     '🧠'),
  ('modulo-8',  'Científico del mercado',   'Completaste el módulo de Backtesting',                '🔬'),
  ('modulo-9',  'Simulador experto',        'Completaste el módulo de Cuenta Demo',                '🎮'),
  ('modulo-10', 'Estratega personal',       'Completaste el módulo Tu Estrategia Personal',        '🏆')
ON CONFLICT (slug) DO NOTHING;
