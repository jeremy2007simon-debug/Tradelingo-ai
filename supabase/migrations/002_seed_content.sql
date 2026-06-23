-- ════════════════════════════════════════════════════
-- TradeLingo AI — Contenido inicial del curso
-- ════════════════════════════════════════════════════

-- ── MÓDULOS ───────────────────────────────────────────
INSERT INTO modules (slug, title, description, order_index, required_xp, icon, color) VALUES
  ('fundamentos',        'Fundamentos del Mercado',          'Entiende qué son los mercados financieros y cómo funcionan.', 1, 0,   '📈', '#3b82f6'),
  ('tipos-activos',      'Tipos de Activos',                 'Conoce acciones, Forex, criptomonedas e índices.',            2, 100, '💰', '#8b5cf6'),
  ('velas-japonesas',    'Velas Japonesas',                  'Lee el lenguaje visual de los precios.',                      3, 200, '🕯️', '#f59e0b'),
  ('tendencias',         'Tendencias de Mercado',            'Aprende a identificar hacia dónde va el precio.',             4, 350, '📊', '#10b981'),
  ('soporte-resistencia','Soporte y Resistencia',            'Los niveles clave que todo trader debe conocer.',             5, 500, '🧱', '#ef4444'),
  ('gestion-riesgo',     'Gestión del Riesgo',               'La habilidad más importante para sobrevivir en trading.',     6, 700, '🛡️', '#06b6d4'),
  ('psicologia',         'Psicología del Trading',           'Controla tus emociones para tomar mejores decisiones.',       7, 900, '🧠', '#ec4899'),
  ('backtesting',        'Backtesting',                      'Prueba tu estrategia con datos históricos antes de arriesgar.', 8, 1100, '🔬', '#84cc16'),
  ('cuenta-demo',        'Cuenta Demo',                      'Practica en tiempo real sin arriesgar dinero real.',          9, 1300, '🎮', '#f97316'),
  ('estrategia',         'Tu Estrategia Personal',           'Construye y documenta tu propio sistema de trading.',         10, 1500, '🏆', '#a855f7')
ON CONFLICT (slug) DO NOTHING;

-- ── LECCIONES: MÓDULO 1 — FUNDAMENTOS ─────────────────
INSERT INTO lessons (module_id, title, order_index, xp_reward, content) VALUES
(
  (SELECT id FROM modules WHERE slug = 'fundamentos'),
  '¿Qué es el mercado financiero?',
  1,
  20,
  '{
    "explanation": "Un mercado financiero es un espacio (físico o digital) donde compradores y vendedores intercambian activos como acciones, divisas o materias primas. Su función principal es fijar precios de manera eficiente a través de la oferta y la demanda.\n\nExisten mercados financieros en todo el mundo: NYSE en Nueva York, el mercado Forex que opera 24 horas, o Binance para criptomonedas. Todos comparten el mismo principio: conectar a quien quiere comprar con quien quiere vender.",
    "example": "Imagina que Apple vale hoy 170$ por acción. Si muchos inversores creen que Apple va a ganar mucho dinero este trimestre, empezarán a comprar acciones. Esa mayor demanda sube el precio a 180$. Cuando los que ya tenían acciones ven el precio alto, venden para recoger ganancias, y el precio puede bajar de nuevo. Así funciona el mercado: precio = equilibrio entre compradores y vendedores.",
    "quiz": [
      {
        "id": "q1",
        "question": "¿Cuál es la función principal de un mercado financiero?",
        "options": ["Garantizar ganancias a los inversores", "Conectar compradores y vendedores para fijar precios", "Almacenar dinero de forma segura", "Prestar dinero a empresas"],
        "correct_index": 1,
        "explanation": "Correcto. Los mercados financieros actúan como punto de encuentro entre quienes quieren comprar y vender activos, determinando el precio justo a través de la oferta y la demanda."
      },
      {
        "id": "q2",
        "question": "Si la demanda de una acción aumenta mucho, ¿qué ocurre con su precio?",
        "options": ["Baja porque hay más competencia", "Sube porque más gente quiere comprarla", "Se mantiene igual siempre", "Depende solo de los resultados de la empresa"],
        "correct_index": 1,
        "explanation": "Cuando más personas quieren comprar un activo que lo que hay disponible para vender, el precio sube. Es la ley básica de oferta y demanda."
      }
    ],
    "exercise": {
      "prompt": "En la apertura del mercado, una empresa anuncia que duplicará sus beneficios. ¿Qué efecto inmediato esperas en el precio de sus acciones?",
      "type": "multiple_choice",
      "options": ["El precio subirá porque aumentará la demanda", "El precio bajará porque la empresa gastará más", "El precio no cambiará hasta el próximo trimestre", "El mercado cerrará temporalmente"],
      "correct_index": 0
    },
    "summary": "Los mercados financieros conectan compradores y vendedores. Los precios suben cuando hay más demanda que oferta, y bajan cuando ocurre lo contrario. Entender esto es la base de todo lo que aprenderás."
  }'
),
(
  (SELECT id FROM modules WHERE slug = 'fundamentos'),
  '¿Cómo se gana (y pierde) dinero en trading?',
  2,
  25,
  '{
    "explanation": "En trading, la idea básica es comprar barato y vender caro (posición larga o ''long''), o vender caro y recomprar más barato (posición corta o ''short'').\n\n**Posición larga (Long):** Compras un activo esperando que suba. Si compras BTC a 30.000$ y sube a 35.000$, ganas 5.000$ por unidad.\n\n**Posición corta (Short):** Vendes un activo que no tienes (lo pides prestado) esperando que baje. Si vendes a 35.000$ y baja a 30.000$, ganas 5.000$.\n\n**El riesgo real:** Si el precio va en tu contra, pierdes dinero. Por eso la gestión del riesgo es la habilidad más importante en trading.",
    "example": "Jeremy compra 0.1 BTC a 40.000$ (invierte 4.000$). El precio sube a 45.000$. Vende y recibe 4.500$. Ganancia: 500$.\n\nSi en cambio el precio cae a 35.000$ y vende, recibe 3.500$. Pérdida: 500$.\n\nPor esto, NUNCA se invierte más de lo que se puede perder.",
    "quiz": [
      {
        "id": "q1",
        "question": "¿Qué significa tener una posición ''long'' en una acción?",
        "options": ["Mantenerla durante mucho tiempo", "Haberla comprado esperando que suba", "Venderla en corto", "Tenerla en una cuenta demo"],
        "correct_index": 1,
        "explanation": "Una posición long significa que compraste el activo y esperas que su precio suba para venderlo a un precio mayor."
      }
    ],
    "exercise": {
      "prompt": "Compras 10 acciones de una empresa a 50$ cada una. El precio sube a 65$. ¿Cuánto ganas si vendes todas?",
      "type": "multiple_choice",
      "options": ["100$", "150$", "650$", "500$"],
      "correct_index": 1
    },
    "summary": "Ganas en trading cuando el precio va en la dirección que esperabas. Pierdes cuando va en tu contra. Las pérdidas son inevitables; lo que importa es que tus ganancias sean mayores que tus pérdidas a lo largo del tiempo."
  }'
),
(
  (SELECT id FROM modules WHERE slug = 'fundamentos'),
  'Los participantes del mercado',
  3,
  20,
  '{
    "explanation": "El mercado no es solo traders individuales. Hay distintos tipos de participantes que mueven el dinero:\n\n**Bancos centrales:** Son los más poderosos. Sus decisiones sobre tipos de interés mueven mercados enteros.\n\n**Instituciones financieras:** Fondos de inversión, hedge funds, bancos de inversión. Manejan billones de dólares.\n\n**Empresas:** Compran y venden divisas para cubrir sus operaciones internacionales.\n\n**Traders retail (tú):** Participantes individuales. Representan una pequeña fracción del mercado total.\n\nComo trader individual, es importante entender que competimos contra algoritmos y profesionales con recursos enormes. La ventaja del trader retail es la flexibilidad y poder salir del mercado cuando quiera.",
    "example": "Cuando la Reserva Federal (FED) de EE.UU. anuncia una subida de tipos de interés, el dólar suele fortalecerse. Los bancos y fondos de inversión mueven miles de millones instantáneamente. Si entiendes por qué ocurre esto, puedes anticiparte.",
    "quiz": [
      {
        "id": "q1",
        "question": "¿Quiénes suelen mover más el mercado con sus decisiones?",
        "options": ["Los traders individuales como tú", "Los bancos centrales y grandes instituciones", "Las empresas tecnológicas", "Los medios de comunicación"],
        "correct_index": 1,
        "explanation": "Los bancos centrales y grandes instituciones manejan cantidades de dinero tan grandes que sus decisiones mueven mercados enteros."
      }
    ],
    "exercise": {
      "prompt": "El Banco Central Europeo anuncia que va a subir los tipos de interés. ¿Qué efecto suele tener esto en el euro?",
      "type": "multiple_choice",
      "options": ["El euro se debilita porque la economía crece menos", "El euro se fortalece porque los inversores buscan mayor rentabilidad", "No tiene efecto en el euro", "El euro desaparece temporalmente del mercado"],
      "correct_index": 1
    },
    "summary": "El mercado está formado por bancos centrales, instituciones, empresas y traders retail. Los más grandes mueven el mercado; tu trabajo como trader es leer sus movimientos y posicionarte a favor de la tendencia."
  }'
);

-- ── INSIGNIAS INICIALES ────────────────────────────────
INSERT INTO badges (slug, title, description, icon) VALUES
  ('primera-leccion',   'Primer paso',          'Completaste tu primera lección',                  '🎯'),
  ('racha-3',           'En racha',             'Mantuviste una racha de 3 días',                   '🔥'),
  ('racha-7',           'Semana completa',      'Mantuviste una racha de 7 días',                   '⚡'),
  ('racha-30',          'Trader consistente',   'Mantuviste una racha de 30 días',                  '💎'),
  ('modulo-1',          'Fundamentos dominados','Completaste el módulo de Fundamentos',              '📈'),
  ('modulo-riesgo',     'Guardián del capital', 'Completaste Gestión del Riesgo',                   '🛡️'),
  ('primer-examen',     'Examinado',            'Pasaste tu primer examen de módulo',               '📝'),
  ('nivel-5',           'Nivel 5 alcanzado',    'Llegaste al nivel 5',                              '⭐'),
  ('nivel-10',          'Experto en formación', 'Llegaste al nivel 10',                             '🌟'),
  ('maestro',           'Maestro Trader',       'Completaste todos los módulos del curso',          '🏆')
ON CONFLICT (slug) DO NOTHING;
