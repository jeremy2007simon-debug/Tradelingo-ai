-- ════════════════════════════════════════════════════
-- TradeLingo AI — Lecciones módulos 2-10
-- ════════════════════════════════════════════════════

-- ── MÓDULO 2: TIPOS DE ACTIVOS ────────────────────────

INSERT INTO lessons (module_id, title, order_index, xp_reward, content) VALUES
(
  (SELECT id FROM modules WHERE slug = 'tipos-activos'),
  'Acciones: dueño de empresas reales',
  1,
  25,
  '{
    "explanation": "Una **acción** es una fracción de la propiedad de una empresa. Cuando compras una acción de Apple, te conviertes en copropietario de Apple —aunque sea en una proporción muy pequeña.\n\nLas acciones cotizan en bolsas como el NYSE (Nueva York), NASDAQ o el IBEX-35 (España). Su precio sube cuando la empresa va bien y baja cuando va mal o cuando el mercado general cae.\n\n**¿Cómo se gana dinero con acciones?**\n- **Plusvalía:** Comprando barato y vendiendo caro.\n- **Dividendos:** Algunas empresas reparten parte de sus beneficios a los accionistas periódicamente.",
    "example": "En 2020, durante el COVID, las acciones de Zoom subieron un 395% en un año porque todo el mundo trabajaba desde casa. Los que compraron a 70$ vieron cómo llegaban a 350$.\n\nPero también hay riesgos: en 2022, Zoom cayó de 350$ a 70$ cuando las oficinas volvieron a abrir. Esto demuestra por qué diversificar y gestionar el riesgo es fundamental.",
    "quiz": [
      {
        "id": "q1",
        "question": "¿Qué representa una acción de una empresa?",
        "options": ["Un préstamo que le haces a la empresa", "Una fracción de la propiedad de la empresa", "Un bono garantizado por el gobierno", "Una promesa de rendimiento fijo"],
        "correct_index": 1,
        "explanation": "Correcto. Una acción representa propiedad parcial de la empresa. Como accionista, participas en sus ganancias pero también en sus pérdidas."
      },
      {
        "id": "q2",
        "question": "¿Qué es un dividendo?",
        "options": ["La comisión del broker", "Una parte de los beneficios que la empresa reparte a los accionistas", "El precio máximo de una acción", "La diferencia entre compra y venta"],
        "correct_index": 1,
        "explanation": "Los dividendos son pagos periódicos que algunas empresas hacen a sus accionistas como reparto de beneficios. Son una forma de ingreso pasivo."
      }
    ],
    "exercise": {
      "prompt": "Compras 50 acciones de una empresa a 20€ cada una. La empresa anuncia resultados excelentes y el precio sube a 28€. ¿Cuál es tu ganancia total?",
      "type": "multiple_choice",
      "options": ["400€", "200€", "8€", "1.400€"],
      "correct_index": 0
    },
    "summary": "Las acciones te hacen copropietario de empresas reales. Su valor sube y baja según el rendimiento de la empresa y el sentimiento del mercado. Puedes ganar por plusvalía y/o dividendos."
  }'
),
(
  (SELECT id FROM modules WHERE slug = 'tipos-activos'),
  'Forex: el mercado de divisas',
  2,
  25,
  '{
    "explanation": "El **mercado Forex** (Foreign Exchange) es el mercado donde se intercambian divisas. Con un volumen de más de 7 billones de dólares al día, es el mercado más grande y líquido del mundo.\n\nOpera 24 horas al día, 5 días a la semana, en sesiones de Tokio, Londres y Nueva York. Siempre se opera en **pares de divisas**: EUR/USD significa cuántos dólares vale un euro.\n\n**Conceptos clave:**\n- **Pip:** La mínima variación de precio (0,0001 en la mayoría de pares)\n- **Spread:** La diferencia entre precio de compra y venta (beneficio del broker)\n- **Apalancamiento:** Permite controlar posiciones grandes con poco capital (es un arma de doble filo)",
    "example": "Si el EUR/USD cotiza a 1,0850, significa que 1 euro = 1,0850 dólares.\n\nSi crees que el euro va a subir frente al dólar, compras EUR/USD. Si sube a 1,0950, has ganado 100 pips. En un lote estándar (100.000 unidades), cada pip vale aproximadamente 10$, así que ganarías 1.000$.\n\n⚠️ El apalancamiento también multiplica las pérdidas. Con apalancamiento 1:100, un movimiento del 1% en tu contra puede borrar toda tu inversión.",
    "quiz": [
      {
        "id": "q1",
        "question": "¿Qué significa que el EUR/USD cotice a 1,1000?",
        "options": ["El dólar vale 1,10 euros", "1 euro vale 1,10 dólares", "Hay 1,10 euros por cada dólar", "El euro y el dólar están empatados"],
        "correct_index": 1,
        "explanation": "En el par EUR/USD, el euro es la moneda base. Si cotiza a 1,1000, significa que necesitas 1,10 dólares para comprar 1 euro."
      }
    ],
    "exercise": {
      "prompt": "El USD/JPY cotiza a 150,00 (1 dólar = 150 yenes). Si el dólar se fortalece y sube a 152,00, ¿qué ocurrió con el yen japonés?",
      "type": "multiple_choice",
      "options": ["El yen se fortaleció (vale más)", "El yen se debilitó (vale menos)", "El yen y el dólar tienen el mismo valor", "El yen dejó de existir"],
      "correct_index": 1
    },
    "summary": "Forex es el mercado de divisas más grande del mundo. Se opera en pares (EUR/USD, GBP/JPY). El apalancamiento amplifica tanto ganancias como pérdidas, por lo que requiere una gestión del riesgo muy estricta."
  }'
),
(
  (SELECT id FROM modules WHERE slug = 'tipos-activos'),
  'Criptomonedas e índices bursátiles',
  3,
  30,
  '{
    "explanation": "**Criptomonedas:** Son activos digitales que usan criptografía y blockchain. Bitcoin (BTC) fue la primera (2009). Las características principales son:\n- Operan 24/7, sin fines de semana\n- Alta volatilidad: movimientos del 10-20% en un día son comunes\n- Sin regulación central (aunque algunos países las regulan)\n- Menor liquidez que Forex o acciones (excepto BTC y ETH)\n\n**Índices bursátiles:** Representan una cesta de acciones. En lugar de comprar acciones individuales, compras el ''promedio'' del mercado:\n- **S&P 500:** Las 500 empresas más grandes de EE.UU.\n- **NASDAQ:** Enfocado en tecnología\n- **IBEX 35:** Las 35 empresas más grandes de España\n- **DAX:** Las 40 más grandes de Alemania",
    "example": "En 2021, Bitcoin pasó de 30.000$ a 69.000$ en meses. Luego, en 2022, cayó de vuelta a 16.000$. Quien compró en el pico perdió un 77% de su inversión.\n\nEn contraste, el S&P 500 ha tenido una rentabilidad media del 10% anual durante las últimas décadas, con mucha menos volatilidad. Los índices son generalmente más estables que las criptomonedas.",
    "quiz": [
      {
        "id": "q1",
        "question": "¿Cuál de los siguientes NO es un índice bursátil?",
        "options": ["S&P 500", "NASDAQ", "Bitcoin", "IBEX 35"],
        "correct_index": 2,
        "explanation": "Bitcoin es una criptomoneda, no un índice bursátil. Los índices como S&P 500, NASDAQ e IBEX 35 son cestas que agrupan múltiples acciones."
      }
    ],
    "exercise": {
      "prompt": "Un trader quiere exposición al sector tecnológico de EE.UU. sin tener que analizar empresa por empresa. ¿Qué instrumento le recomendarías?",
      "type": "multiple_choice",
      "options": ["Bitcoin", "NASDAQ 100", "Oro", "EUR/USD"],
      "correct_index": 1
    },
    "summary": "Las criptos ofrecen alta rentabilidad potencial pero con riesgo muy elevado. Los índices permiten invertir en un mercado entero con menor volatilidad. Cada activo tiene su perfil de riesgo/recompensa distinto."
  }'
);

-- ── MÓDULO 3: VELAS JAPONESAS ─────────────────────────

INSERT INTO lessons (module_id, title, order_index, xp_reward, content) VALUES
(
  (SELECT id FROM modules WHERE slug = 'velas-japonesas'),
  'Anatomía de una vela japonesa',
  1,
  30,
  '{
    "explanation": "Las **velas japonesas** son la representación gráfica más popular en trading. Cada vela contiene cuatro datos del precio en un período de tiempo determinado:\n\n- **Apertura (Open):** Precio al inicio del período\n- **Cierre (Close):** Precio al final del período\n- **Máximo (High):** El precio más alto alcanzado\n- **Mínimo (Low):** El precio más bajo alcanzado\n\n**Cuerpo:** La parte gruesa entre apertura y cierre.\n**Mechas (sombras):** Las líneas finas que salen del cuerpo.\n\n🟢 **Vela verde/blanca:** El cierre fue MAYOR que la apertura (el precio subió)\n🔴 **Vela roja/negra:** El cierre fue MENOR que la apertura (el precio bajó)",
    "example": "Si en un gráfico de 1 hora el EUR/USD abre a 1,0800, sube hasta 1,0850, baja hasta 1,0780, y cierra a 1,0830:\n\n- Apertura: 1,0800\n- Cierre: 1,0830 → vela VERDE (subió)\n- Máximo: 1,0850 → mecha superior\n- Mínimo: 1,0780 → mecha inferior\n\nEl tamaño del cuerpo indica la fuerza del movimiento. Cuerpo grande = movimiento fuerte.",
    "quiz": [
      {
        "id": "q1",
        "question": "Una vela japonesa roja indica que...",
        "options": ["El precio subió durante ese período", "El precio bajó durante ese período", "El precio no cambió", "Hubo muy poco volumen de operaciones"],
        "correct_index": 1,
        "explanation": "Una vela roja (o negra) indica que el precio cerró más bajo de lo que abrió, es decir, el precio bajó durante ese período de tiempo."
      },
      {
        "id": "q2",
        "question": "¿Qué representa la mecha superior de una vela?",
        "options": ["El precio de apertura", "El precio de cierre", "El precio máximo alcanzado", "El precio mínimo alcanzado"],
        "correct_index": 2,
        "explanation": "La mecha (sombra) superior indica el precio máximo que alcanzó el activo durante ese período, aunque luego el precio no se mantuvo en ese nivel."
      }
    ],
    "exercise": {
      "prompt": "Una vela abre a 100$, sube hasta 115$, baja hasta 95$, y cierra a 105$. ¿De qué color es y qué tamaño tiene su cuerpo?",
      "type": "multiple_choice",
      "options": ["Roja, cuerpo de 20$", "Verde, cuerpo de 5$", "Verde, cuerpo de 15$", "Roja, cuerpo de 5$"],
      "correct_index": 1
    },
    "summary": "Cada vela japonesa muestra apertura, cierre, máximo y mínimo de un período. Verde = subida, Roja = bajada. Las mechas muestran hasta dónde llegó el precio antes de retroceder. Son el ABC del análisis técnico."
  }'
),
(
  (SELECT id FROM modules WHERE slug = 'velas-japonesas'),
  'Patrones de velas más importantes',
  2,
  35,
  '{
    "explanation": "Los patrones de velas son combinaciones que tienen significado estadístico y ayudan a predecir movimientos futuros.\n\n**Patrones de reversión alcista (el precio podría subir):**\n- **Martillo (Hammer):** Mecha inferior larga, cuerpo pequeño arriba. Los vendedores empujaron el precio abajo pero los compradores recuperaron el control.\n- **Engulfing alcista:** Una vela verde grande ''engulle'' a la vela roja anterior. Cambio de control a favor de compradores.\n\n**Patrones de reversión bajista (el precio podría bajar):**\n- **Estrella fugaz (Shooting Star):** Mecha superior larga, cuerpo pequeño abajo. Los compradores intentaron subir pero los vendedores tomaron el control.\n- **Engulfing bajista:** Una vela roja grande engulle a la verde anterior.\n\n**Patrón de continuación:**\n- **Doji:** Apertura y cierre casi iguales (cuerpo muy pequeño). Indecisión en el mercado.",
    "example": "Imagina que Bitcoin ha bajado varios días seguidos. De repente aparece un Martillo: el precio intentó bajar mucho pero cerró casi donde abrió. Esto sugiere que los compradores están entrando y podría empezar una recuperación.\n\n⚠️ Importante: los patrones de velas son señales de probabilidad, NO garantías. Siempre confirma con otros indicadores.",
    "quiz": [
      {
        "id": "q1",
        "question": "¿Qué indica un patrón Doji?",
        "options": ["Una subida fuerte del mercado", "Indecisión: compradores y vendedores están equilibrados", "Una bajada fuerte inminente", "Que el mercado va a abrir con gap"],
        "correct_index": 1,
        "explanation": "El Doji tiene apertura y cierre casi idénticos, formando un cuerpo muy pequeño. Indica equilibrio e indecisión entre compradores y vendedores. Por sí solo no predice la dirección."
      }
    ],
    "exercise": {
      "prompt": "Tras una tendencia bajista prolongada, ves una vela con mecha inferior muy larga y cuerpo pequeño en la parte superior. ¿Qué patrón es y qué podría indicar?",
      "type": "multiple_choice",
      "options": ["Estrella fugaz: podría continuar la bajada", "Martillo: posible reversión alcista", "Doji: el mercado seguirá igual", "Engulfing bajista: más bajadas"],
      "correct_index": 1
    },
    "summary": "Los patrones de velas como el Martillo, Engulfing o Estrella Fugaz son señales de posibles cambios de dirección. Aprende a reconocerlos, pero siempre confírmalos con otros análisis antes de operar."
  }'
),
(
  (SELECT id FROM modules WHERE slug = 'velas-japonesas'),
  'Timeframes: cómo elegir el período correcto',
  3,
  30,
  '{
    "explanation": "El **timeframe** (marco temporal) determina cuánto tiempo representa cada vela en el gráfico:\n\n- **M1, M5, M15:** 1, 5 o 15 minutos por vela. Para scalping (operaciones muy cortas).\n- **H1, H4:** 1 o 4 horas por vela. Trading intradía.\n- **D1:** 1 día por vela. Swing trading (operaciones de días a semanas).\n- **W1, MN:** Semana o mes. Inversión a largo plazo.\n\n**¿Cuál elegir?** Depende de tu estilo:\n- Poco tiempo libre → timeframes largos (D1)\n- Puedes estar frente a la pantalla → H1 o H4\n- Trader muy activo → M15 o menos\n\n**Multi-timeframe analysis:** Los traders profesionales miran varios timeframes. Usan el timeframe largo para ver la tendencia general y el corto para encontrar la entrada exacta.",
    "example": "Laura quiere operar EUR/USD. Primero mira el gráfico diario (D1) y ve que el precio está en tendencia bajista. Luego baja al H4 y espera una pequeña subida (pull-back) para vender en esa corrección y seguir la tendencia bajista principal.",
    "quiz": [
      {
        "id": "q1",
        "question": "Un trader que trabaja y solo puede revisar el mercado una vez al día, ¿qué timeframe le conviene más?",
        "options": ["M1 (1 minuto)", "M15 (15 minutos)", "D1 (diario) o W1 (semanal)", "H1 (1 hora)"],
        "correct_index": 2,
        "explanation": "Los timeframes largos como el diario o semanal requieren menos tiempo de monitoreo porque las operaciones duran días o semanas, no minutos. Son ideales para quienes no pueden estar pendientes del mercado continuamente."
      }
    ],
    "exercise": {
      "prompt": "Ves en el gráfico semanal (W1) que el precio de una acción está en clara tendencia alcista. Bajas al gráfico de 1 hora (H1) y ves una pequeña corrección. ¿Qué haría un trader profesional?",
      "type": "multiple_choice",
      "options": ["Ignorar la tendencia semanal y operar la bajada en H1", "Esperar que la corrección en H1 termine para comprar en dirección de la tendencia semanal", "Vender porque en H1 está bajando", "No hacer nada porque hay contradicción entre timeframes"],
      "correct_index": 1
    },
    "summary": "Los timeframes determinan la duración de tus operaciones. Elige uno que se adapte a tu disponibilidad. El análisis multi-timeframe te da una visión más completa: usa el timeframe grande para la tendencia y el pequeño para la entrada."
  }'
);

-- ── MÓDULO 4: TENDENCIAS ──────────────────────────────

INSERT INTO lessons (module_id, title, order_index, xp_reward, content) VALUES
(
  (SELECT id FROM modules WHERE slug = 'tendencias'),
  'Qué es una tendencia y cómo identificarla',
  1,
  35,
  '{
    "explanation": "Una **tendencia** es la dirección general del precio a lo largo del tiempo. Existen tres tipos:\n\n**Tendencia alcista (uptrend):** El precio hace máximos más altos (Higher Highs) y mínimos más altos (Higher Lows). El precio sube en zigzag pero la dirección general es arriba.\n\n**Tendencia bajista (downtrend):** El precio hace máximos más bajos (Lower Highs) y mínimos más bajos (Lower Lows). La dirección general es abajo.\n\n**Lateral (sideways/ranging):** El precio oscila entre un rango sin dirección clara. Los compradores y vendedores están equilibrados.\n\nEl trader principiante pierde dinero operando contra la tendencia. La regla de oro es: ''The trend is your friend'' (la tendencia es tu amiga).",
    "example": "Si en el S&P 500 ves que cada mes el precio sube, luego baja un poco, luego sube más alto que antes, y vuelve a bajar un poco (pero sin romper el mínimo anterior), estás ante una tendencia alcista.\n\nLos traders inteligentes buscan esos ''bajones'' dentro de la tendencia alcista para comprar en el retroceso y continuar con la tendencia principal.",
    "quiz": [
      {
        "id": "q1",
        "question": "Una tendencia alcista se caracteriza por...",
        "options": ["Máximos más bajos y mínimos más bajos", "Máximos más altos y mínimos más altos", "Precio que no sube ni baja", "Mucha volatilidad sin dirección"],
        "correct_index": 1,
        "explanation": "Una tendencia alcista muestra un patrón de escalones ascendentes: cada pico es más alto que el anterior y cada valle también es más alto que el anterior."
      }
    ],
    "exercise": {
      "prompt": "Analizas un gráfico y observas estos máximos consecutivos: 100, 95, 110, 105, 118, 112. ¿Qué tipo de tendencia muestra?",
      "type": "multiple_choice",
      "options": ["Tendencia bajista", "Tendencia lateral", "Tendencia alcista", "No hay suficientes datos"],
      "correct_index": 2
    },
    "summary": "Las tendencias son la base del análisis técnico. Opera siempre a favor de la tendencia principal: compra en tendencias alcistas y vende en bajistas. El precio raramente sube o baja en línea recta; lo hace en zigzag."
  }'
),
(
  (SELECT id FROM modules WHERE slug = 'tendencias'),
  'Líneas de tendencia y canales',
  2,
  35,
  '{
    "explanation": "Las **líneas de tendencia** son herramientas para visualizar la dirección del mercado:\n\n**Línea de tendencia alcista:** Se traza uniendo los mínimos más altos (Higher Lows). Actúa como soporte dinámico.\n\n**Línea de tendencia bajista:** Se traza uniendo los máximos más bajos (Lower Highs). Actúa como resistencia dinámica.\n\n**Canales de precio:** Cuando puedes trazar líneas paralelas tanto por los máximos como por los mínimos, se forma un canal. El precio ''rebota'' entre las dos líneas.\n\n**Cuántas veces confirma una línea:** Necesitas al menos 2 puntos de contacto para trazar una línea, pero cuantos más puntos la toquen (sin romperla), más fiable es.\n\n**Ruptura de línea de tendencia:** Cuando el precio rompe decisivamente la línea, puede indicar un cambio de tendencia.",
    "example": "En un canal alcista del EUR/USD:\n- Cada vez que el precio toca la línea inferior del canal, los traders compran (esperan que rebote hacia arriba)\n- Cada vez que toca la línea superior, algunos venden (esperan corrección)\n- Si el precio rompe por debajo de la línea inferior con fuerza, muchos interpretan que la tendencia alcista terminó",
    "quiz": [
      {
        "id": "q1",
        "question": "¿Cuántos puntos mínimos necesitas para trazar una línea de tendencia válida?",
        "options": ["1 punto", "Al menos 2 puntos", "Exactamente 5 puntos", "10 o más puntos"],
        "correct_index": 1,
        "explanation": "Necesitas al menos 2 puntos para trazar una línea. Sin embargo, cuantos más puntos de contacto tenga la línea, más significativa y fiable es."
      }
    ],
    "exercise": {
      "prompt": "El precio de una acción viene rebotando 4 veces en una línea de tendencia alcista durante 3 meses. De repente, el precio cae por debajo de esa línea con gran volumen. ¿Qué señal podría ser?",
      "type": "multiple_choice",
      "options": ["Una buena oportunidad de compra, el precio volverá", "Una posible señal de cambio de tendencia (de alcista a bajista)", "No tiene ningún significado técnico", "Una señal de que el activo se va a disparar"],
      "correct_index": 1
    },
    "summary": "Las líneas de tendencia y canales son herramientas básicas para visualizar la dirección del mercado. Una rotura de línea de tendencia con volumen alto puede señalar un cambio importante en la dirección del precio."
  }'
);

-- ── MÓDULO 5: SOPORTE Y RESISTENCIA ──────────────────

INSERT INTO lessons (module_id, title, order_index, xp_reward, content) VALUES
(
  (SELECT id FROM modules WHERE slug = 'soporte-resistencia'),
  'Qué son soporte y resistencia',
  1,
  40,
  '{
    "explanation": "**Soporte:** Es un nivel de precio donde históricamente la caída se ha detenido y el precio ha rebotado hacia arriba. Es una ''zona de demanda'' donde hay suficientes compradores para frenar la caída.\n\n**Resistencia:** Es un nivel donde la subida se ha detenido y el precio ha retrocedido hacia abajo. Es una ''zona de oferta'' donde hay suficientes vendedores para frenar la subida.\n\n**Por qué funcionan:** La psicología del mercado. Los traders recuerdan esos niveles y colocan órdenes en ellos. Los algoritmos también los tienen programados.\n\n**Cuanto más veces se toca un nivel, más fuerte es.** Si el precio ha rebotado 5 veces en los mismos 50€, ese soporte es muy significativo.\n\n**Inversión de roles:** Un soporte roto se convierte en resistencia, y una resistencia rota se convierte en soporte.",
    "example": "El oro tiene una resistencia histórica muy conocida en 2.000$. Cada vez que el precio se acercaba, muchos vendedores aparecían y bajaba. Pero cuando finalmente rompió esa resistencia con fuerza en 2023, muchos analistas vieron ese nivel como nuevo soporte.",
    "quiz": [
      {
        "id": "q1",
        "question": "Si el precio ha rebotado tres veces en los mismos 50$ y luego cae por debajo de ese nivel, ¿qué ocurre con ese nivel?",
        "options": ["Sigue siendo un soporte fuerte", "Desaparece y ya no tiene importancia", "Se convierte en resistencia", "Se convierte en un nivel de compra obligatorio"],
        "correct_index": 2,
        "explanation": "Cuando un soporte es roto de forma decisiva, se ''invierte el rol'': el nivel que antes frenaba las caídas ahora actúa como techo que frena las subidas."
      }
    ],
    "exercise": {
      "prompt": "Una acción ha rebotado 4 veces en los 100€ durante el último año. Ahora el precio vuelve a caer hasta los 100€. ¿Qué esperarías según el análisis técnico?",
      "type": "multiple_choice",
      "options": ["Que el precio caiga más allá de 100€ sin parar", "Que el precio rebote nuevamente desde los 100€", "Que el precio se quede exactamente en 100€", "Que el mercado cierre por mantenimiento"],
      "correct_index": 1
    },
    "summary": "Soporte es donde el precio tiende a rebotar hacia arriba; resistencia es donde tiende a rebotar hacia abajo. Son niveles psicológicos y técnicos clave. Cuando se rompen, invierten su rol."
  }'
),
(
  (SELECT id FROM modules WHERE slug = 'soporte-resistencia'),
  'Cómo operar en soportes y resistencias',
  2,
  40,
  '{
    "explanation": "Hay dos estrategias principales para operar con soportes y resistencias:\n\n**1. Estrategia de rebote (Bounce):**\nOperas esperando que el precio respete el nivel y rebote.\n- En soporte: compras cuando el precio toca el soporte\n- En resistencia: vendes cuando el precio toca la resistencia\n- Stop loss justo debajo del soporte (o arriba de la resistencia)\n\n**2. Estrategia de ruptura (Breakout):**\nOperas cuando el precio rompe el nivel.\n- Compras cuando el precio rompe una resistencia con fuerza y volumen\n- Vendes cuando rompe un soporte\n- Esperas confirmación (el precio cierra más allá del nivel)\n\n**Falsas rupturas (Fakeout):** El precio parece romper pero vuelve. Son trampas comunes. Por eso es importante esperar confirmación antes de entrar.",
    "example": "Estrategia de rebote: El S&P 500 cae hasta los 4.200 puntos, que es un soporte probado. Compras en 4.200 con stop loss en 4.150. El precio rebota a 4.400 y tomas ganancias. Arriesgaste 50 puntos para ganar 200 (ratio 1:4).",
    "quiz": [
      {
        "id": "q1",
        "question": "¿Qué es un ''fakeout'' o falsa ruptura?",
        "options": ["Una ruptura de nivel que resulta ser válida y el precio continúa", "Cuando el precio parece romper un nivel pero vuelve rápidamente hacia donde estaba", "Un error en la plataforma de trading", "Cuando el precio se queda exactamente en el nivel"],
        "correct_index": 1,
        "explanation": "Un fakeout es una trampa común: el precio rompe brevemente un soporte o resistencia, atrapando a traders que esperaban esa ruptura, pero luego vuelve. Por eso se recomienda esperar confirmación."
      }
    ],
    "exercise": {
      "prompt": "El precio de BTC cae hasta 60.000$ (soporte clave). Entra con fuerza y cierra la vela claramente por debajo. ¿Qué estrategia aplicas?",
      "type": "multiple_choice",
      "options": ["Compras inmediatamente porque es un soporte", "Esperas confirmación de la ruptura bajista para vender", "No haces nada porque los niveles ya no importan", "Buscas otro activo"],
      "correct_index": 1
    },
    "summary": "Las estrategias de rebote y ruptura te permiten operar alrededor de soportes y resistencias. Siempre usa stop loss y espera confirmación antes de operar rupturas para evitar los ''fakeouts''."
  }'
);

-- ── MÓDULO 6: GESTIÓN DEL RIESGO ─────────────────────

INSERT INTO lessons (module_id, title, order_index, xp_reward, content) VALUES
(
  (SELECT id FROM modules WHERE slug = 'gestion-riesgo'),
  'La regla del 1-2%: protege tu capital',
  1,
  50,
  '{
    "explanation": "La **gestión del riesgo** es la habilidad más importante en trading. Sin ella, tarde o temprano perderás todo tu capital.\n\n**La regla del 1-2%:** Nunca arriesgues más del 1-2% de tu capital total en una sola operación.\n\nEjemplo con 10.000€ de capital:\n- Riesgo máximo por operación: 200€ (2%)\n- Si pierdes 10 operaciones seguidas (algo que pasa): pierdes 2.000€, todavía tienes 8.000€\n- Con el 2% puedes sobrevivir rachas malas y seguir operando\n\n**¿Por qué es crucial?** La aritmética del trading es asimétrica:\n- Perder el 50% de tu capital requiere ganar el 100% para recuperarse\n- Perder el 20% requiere ganar el 25%\n- Perder el 10% requiere ganar solo el 11,1%",
    "example": "Carlos tiene 5.000€ y arriesga el 10% por operación (500€). Tiene una mala racha de 5 operaciones perdedoras seguidas. Pierde 2.500€ — la mitad de su capital — y ahora necesita ganar un 100% para volver al punto de partida. Es casi imposible.\n\nSi hubiera arriesgado el 2% (100€ por operación), tras esas 5 pérdidas solo habría perdido 500€. Sigue con 4.500€ y puede continuar operando sin presión.",
    "quiz": [
      {
        "id": "q1",
        "question": "Si tienes un capital de 20.000€ y aplicas la regla del 2%, ¿cuánto es el máximo que arriesgas por operación?",
        "options": ["200€", "400€", "2.000€", "20€"],
        "correct_index": 1,
        "explanation": "El 2% de 20.000€ = 400€. Esta es la pérdida máxima que deberías aceptar en cualquier operación individual."
      },
      {
        "id": "q2",
        "question": "¿Por qué una pérdida del 50% de tu capital es especialmente difícil de recuperar?",
        "options": ["Porque las comisiones se acumulan", "Porque necesitas ganar un 100% sobre el capital restante para volver al nivel inicial", "Porque el bróker te cobra penalización", "Porque ya no puedes abrir posiciones"],
        "correct_index": 1,
        "explanation": "La asimetría del trading: si tienes 10.000€ y pierdes el 50% (quedas con 5.000€), necesitas un retorno del 100% sobre esos 5.000€ para recuperar los 10.000€ originales."
      }
    ],
    "exercise": {
      "prompt": "Tienes 8.000€ de capital. Encuentras una operación excelente y quieres arriesgar el 5% porque tienes mucha confianza. ¿Qué debería hacer un buen gestor del riesgo?",
      "type": "multiple_choice",
      "options": ["Arriesgar el 5% porque la operación parece buena", "Arriesgar el 2% máximo (160€) sin importar la confianza", "No operar nunca si no eres 100% seguro", "Arriesgar el 10% para recuperar pérdidas anteriores"],
      "correct_index": 1
    },
    "summary": "La regla del 1-2% por operación es fundamental para la supervivencia en trading. No importa cuánto confíes en una operación: los mercados son impredecibles. Proteger el capital es siempre la prioridad número uno."
  }'
),
(
  (SELECT id FROM modules WHERE slug = 'gestion-riesgo'),
  'Stop loss y take profit: tus mejores herramientas',
  2,
  50,
  '{
    "explanation": "**Stop Loss (SL):** Orden automática que cierra tu posición si el precio va en tu contra hasta un nivel predefinido. Te protege de pérdidas mayores.\n\n**Take Profit (TP):** Orden automática que cierra tu posición cuando el precio alcanza tu objetivo de ganancia.\n\n**¿Por qué son imprescindibles?**\n- Eliminan las decisiones emocionales en caliente\n- Limitan pérdidas si el mercado se mueve inesperadamente\n- Te permiten no estar pegado a la pantalla\n\n**El ratio riesgo/recompensa (R:R):** Compara cuánto arriesgas con cuánto puedes ganar.\n- Stop: 50 pips / Take profit: 150 pips = ratio 1:3\n- Con ratio 1:2 o mejor, puedes ser rentable incluso ganando solo el 40% de tus operaciones\n\n**Stop loss nunca se mueve en contra tuya.** Si el precio está cerca de tu SL, no lo alejes. Eso arruina tu gestión del riesgo.",
    "example": "Operación en EUR/USD:\n- Entrada: 1,0900\n- Stop Loss: 1,0850 (arriesgo 50 pips)\n- Take Profit: 1,1050 (busco ganar 150 pips)\n- Ratio R:R = 1:3\n\nSi ganas 4 de cada 10 operaciones con este ratio:\n- 4 ganadas × 150 pips = 600 pips\n- 6 perdidas × 50 pips = 300 pips\n- Resultado neto: +300 pips ✅",
    "quiz": [
      {
        "id": "q1",
        "question": "¿Qué hace exactamente un Stop Loss?",
        "options": ["Garantiza que no pierdas dinero", "Cierra automáticamente la operación si el precio llega a un nivel de pérdida predefinido", "Maximiza las ganancias de la operación", "Pausa la operación temporalmente"],
        "correct_index": 1,
        "explanation": "El Stop Loss es una orden que se ejecuta automáticamente cuando el precio llega al nivel de pérdida que definiste, limitando así cuánto puedes perder en esa operación."
      }
    ],
    "exercise": {
      "prompt": "Entras en compra a 200€. Colocas stop loss a 190€ y take profit a 230€. ¿Cuál es tu ratio riesgo/recompensa?",
      "type": "multiple_choice",
      "options": ["1:1", "1:2", "1:3", "2:1"],
      "correct_index": 2
    },
    "summary": "Stop Loss y Take Profit son órdenes automáticas que protegen tu capital y aseguran ganancias. Nunca operes sin ellos. Un buen ratio riesgo/recompensa (mínimo 1:2) te permite ser rentable incluso sin ganar la mayoría de operaciones."
  }'
),
(
  (SELECT id FROM modules WHERE slug = 'gestion-riesgo'),
  'Gestión del capital y el tamaño de posición',
  3,
  55,
  '{
    "explanation": "El **sizing** (tamaño de posición) determina cuántas unidades compras o vendes. Es donde se aplica la regla del 1-2%.\n\n**Fórmula para calcular el tamaño de posición:**\nTamaño = (Capital × % Riesgo) / (Precio entrada - Precio Stop Loss)\n\n**Diversificación:** No pongas todo tu capital en un solo activo ni en un solo tipo de mercado.\n\n**Correlación:** Cuidado con tener varias posiciones que se muevan en la misma dirección. Si tienes 5 posiciones alcistas en activos muy correlacionados, en realidad estás asumiendo mucho más riesgo del que crees.\n\n**Capital de trading vs capital total:**\nNunca uses dinero que necesites para vivir. El capital de trading debe ser dinero que puedas permitirte perder completamente.",
    "example": "Miguel tiene 10.000€ de capital. Quiere comprar acciones de Tesla a 200€. Su stop loss está en 190€ (distancia: 10€).\n\nRiesgo máximo (2%): 10.000 × 0.02 = 200€\nTamaño de posición: 200€ / 10€ = 20 acciones\n\nAsí, si Tesla cae a 190€ y salta el stop, Miguel pierde exactamente 200€ (el 2% de su capital), no más.",
    "quiz": [
      {
        "id": "q1",
        "question": "Tienes 5.000€, arriesgas el 2%, y tu stop loss está a 20€ de tu entrada. ¿Cuántas acciones deberías comprar?",
        "options": ["5 acciones", "10 acciones", "25 acciones", "50 acciones"],
        "correct_index": 0,
        "explanation": "Riesgo: 5.000 × 0.02 = 100€. Tamaño: 100€ / 20€ = 5 acciones. Así si el stop salta, pierdes exactamente 100€ (el 2% de tu capital)."
      }
    ],
    "exercise": {
      "prompt": "¿Cuál es el principal problema de tener 5 posiciones de compra abiertas en activos muy correlacionados (todos suben y bajan juntos)?",
      "type": "multiple_choice",
      "options": ["Pagas más comisiones al broker", "Tu riesgo real es mucho mayor que el 2% por operación porque todas pueden perder a la vez", "Las posiciones se anulan entre sí", "El broker no te deja tener tantas posiciones"],
      "correct_index": 1
    },
    "summary": "El sizing correcto es fundamental: calcula cuántas unidades comprar en base a tu % de riesgo y la distancia al stop. Diversifica y ten cuidado con activos correlacionados. Nunca uses dinero que no puedas permitirte perder."
  }'
);

-- ── MÓDULO 7: PSICOLOGÍA ──────────────────────────────

INSERT INTO lessons (module_id, title, order_index, xp_reward, content) VALUES
(
  (SELECT id FROM modules WHERE slug = 'psicologia'),
  'Los enemigos del trader: miedo y codicia',
  1,
  55,
  '{
    "explanation": "La psicología es lo que diferencia a traders rentables de los que pierden dinero. El mercado no te destruye por falta de conocimiento, sino por errores emocionales.\n\n**MIEDO:** Te paraliza o te hace salir demasiado pronto.\n- Miedo a perder: cierras ganancias antes de tiempo\n- Miedo a perderte algo (FOMO): entras tarde en operaciones\n- Miedo después de una pérdida: dejas de operar o reduces tamaño innecesariamente\n\n**CODICIA:** Te hace ignorar el plan.\n- Mover el take profit cada vez más lejos esperando más ganancias\n- Abrir más posiciones de las planificadas\n- No respetar el stop loss porque ''seguro que vuelve''\n\n**La solución:** Un **plan de trading escrito** al que te comprometes ANTES de entrar al mercado. Las reglas escritas son más difíciles de ignorar que las decisiones improvisadas.",
    "example": "Pedro compra EUR/USD y el precio sube rápidamente. Llega a su take profit pero piensa ''va a subir mucho más, no cierro''. El precio gira y cae. Pedro no cierra porque ''ya va a volver''. Finalmente cierra con pérdidas.\n\nEsto es la combinación perfecta de codicia (no cerrar en TP) y esperanza irracional (no usar stop). Le pasó por no seguir su plan.",
    "quiz": [
      {
        "id": "q1",
        "question": "¿Qué es el FOMO en trading?",
        "options": ["Una estrategia de trading avanzada", "El miedo a perderse un movimiento de precios y entrar tarde o sin análisis", "Una herramienta de gestión del riesgo", "El beneficio de una operación"],
        "correct_index": 1,
        "explanation": "FOMO (Fear Of Missing Out) es el miedo a perderse un movimiento. Lleva a los traders a entrar en operaciones sin análisis, demasiado tarde, o en condiciones que su plan no justificaría."
      }
    ],
    "exercise": {
      "prompt": "Tienes una posición abierta con ganancias. El precio llega a tu Take Profit pero decides moverlo más arriba porque ''seguro que sigue subiendo''. Eso es un ejemplo de...",
      "type": "multiple_choice",
      "options": ["Buena gestión activa de la operación", "Codicia que te aleja de tu plan de trading", "Análisis técnico avanzado", "Estrategia de trailing stop"],
      "correct_index": 1
    },
    "summary": "Miedo y codicia son los peores enemigos del trader. La solución es crear un plan de trading detallado antes de cada sesión y seguirlo disciplinadamente, sin importar lo que haga el mercado en ese momento."
  }'
),
(
  (SELECT id FROM modules WHERE slug = 'psicologia'),
  'Cómo manejar las rachas perdedoras',
  2,
  55,
  '{
    "explanation": "Todas las estrategias rentables tienen rachas perdedoras. Saber gestionarlas emocionalmente marca la diferencia entre un trader profesional y uno amateur.\n\n**Qué hacer durante una racha perdedora:**\n1. **Reduce el tamaño de posición** al 50% hasta recuperar confianza\n2. **Para de operar** 1-3 días y revisa tu diario de trading\n3. **No aumentes el riesgo** para ''recuperar'' rápido (revenge trading)\n4. **Acepta que las pérdidas son parte del negocio** — incluso los mejores traders pierden el 40-50% de sus operaciones\n\n**El diario de trading:** Registra TODAS tus operaciones: entrada, salida, razón de la operación, emoción que sentías. Después de 20-30 operaciones, los patrones de error se hacen evidentes.\n\n**Expectativa matemática:** Lo que importa no es ganar el mayor % de operaciones, sino que tus ganancias medias sean mayores que tus pérdidas medias.",
    "example": "Carlos tiene una estrategia con 45% de win rate y ratio 1:2. Estadísticamente, perderá 55 de cada 100 operaciones. Pero 45 ganancias × 2 = 90 unidades ganadas, y 55 pérdidas × 1 = 55 perdidas. Resultado neto: +35 unidades. ¡Rentable perdiendo más veces de las que gana!",
    "quiz": [
      {
        "id": "q1",
        "question": "¿Qué es el ''revenge trading''?",
        "options": ["Una estrategia para recuperar pérdidas rápidamente aumentando el riesgo", "Operar en el mismo activo que te dio pérdidas para ''vengarte''", "Ambas anteriores (y es un error grave)", "Una técnica avanzada de gestión del riesgo"],
        "correct_index": 2,
        "explanation": "El revenge trading es el intento desesperado de recuperar pérdidas aumentando el riesgo o operando impulsivamente. Suele resultar en pérdidas aún mayores porque las decisiones se toman desde la emoción, no desde el análisis."
      }
    ],
    "exercise": {
      "prompt": "Llevas 4 operaciones perdedoras seguidas. ¿Cuál es la MEJOR acción a tomar?",
      "type": "multiple_choice",
      "options": ["Doblar el tamaño de la siguiente operación para recuperar todo de una vez", "Hacer una pausa, revisar tu diario y reducir el tamaño de posición temporalmente", "Abandonar el trading porque tu estrategia no funciona", "Cambiar de activo para ''tener más suerte''"],
      "correct_index": 1
    },
    "summary": "Las rachas perdedoras son normales. La clave es reducir el tamaño de posición, pausar, revisar tu diario y nunca hacer revenge trading. Un trader que controla sus emociones sobrevive y prospera; uno que no las controla, pierde su capital."
  }'
);

-- ── MÓDULO 8: BACKTESTING ─────────────────────────────

INSERT INTO lessons (module_id, title, order_index, xp_reward, content) VALUES
(
  (SELECT id FROM modules WHERE slug = 'backtesting'),
  'Qué es el backtesting y por qué es vital',
  1,
  60,
  '{
    "explanation": "El **backtesting** consiste en aplicar tu estrategia de trading a datos históricos para ver cómo habría funcionado en el pasado.\n\n**Por qué es vital:**\n- Te permite validar una estrategia ANTES de arriesgar dinero real\n- Revela las debilidades de tu sistema en distintas condiciones de mercado\n- Te da estadísticas reales: win rate, ratio R:R, máximo drawdown\n\n**Métricas clave del backtesting:**\n- **Win rate:** % de operaciones ganadoras\n- **Profit factor:** Ganancias totales / Pérdidas totales (debe ser >1.5 para ser buena estrategia)\n- **Max drawdown:** La caída máxima desde un pico. Si es >30%, la estrategia es muy arriesgada psicológicamente\n- **Expectativa:** Ganancia media por operación\n\n**Limitación importante:** El rendimiento pasado no garantiza el futuro. Las condiciones del mercado cambian.",
    "example": "Sofía desarrolla una estrategia: compra cuando el precio rompe una resistencia con volumen alto, stop loss 1% por debajo de la ruptura, take profit 3% arriba (ratio 1:3).\n\nAplica la estrategia en datos de los últimos 3 años del EUR/USD: 60 operaciones, 38% win rate, profit factor de 1.85. La estrategia habría sido rentable. Decide probarla en demo antes de arriesgar dinero real.",
    "quiz": [
      {
        "id": "q1",
        "question": "¿Qué indica un Profit Factor de 2.0?",
        "options": ["La estrategia pierde el doble de lo que gana", "Por cada euro perdido, la estrategia gana 2 euros", "La estrategia tiene un 200% de win rate", "La estrategia solo ha sido probada 2 veces"],
        "correct_index": 1,
        "explanation": "El Profit Factor es ganancias totales dividido entre pérdidas totales. Un PF de 2.0 significa que por cada euro perdido, la estrategia gana 2 euros. Un buen sistema tiene PF > 1.5."
      }
    ],
    "exercise": {
      "prompt": "Haces backtesting de tu estrategia y obtienes: 40% win rate, ratio R:R 1:3, 100 operaciones. ¿Es rentable?",
      "type": "multiple_choice",
      "options": ["No, porque pierdes más del 50% de las operaciones", "Sí: 40 ganadoras × 3 = 120 unidades ganadas vs 60 perdedoras × 1 = 60 perdidas", "No hay suficientes datos para saberlo", "Depende del activo que uses"],
      "correct_index": 1
    },
    "summary": "El backtesting es el proceso científico para validar tu estrategia con datos históricos. Te da métricas reales antes de arriesgar dinero. Una estrategia con profit factor >1.5 y drawdown razonable merece ser probada en demo."
  }'
);

-- ── MÓDULO 9: CUENTA DEMO ────────────────────────────

INSERT INTO lessons (module_id, title, order_index, xp_reward, content) VALUES
(
  (SELECT id FROM modules WHERE slug = 'cuenta-demo'),
  'Cómo aprovechar al máximo la cuenta demo',
  1,
  60,
  '{
    "explanation": "Una **cuenta demo** te permite operar con dinero virtual en condiciones reales de mercado. Es el puente entre el aprendizaje teórico y el trading real.\n\n**Cómo usarla correctamente:**\n1. **Usa el mismo capital que usarías en real** — si vas a empezar con 2.000€, usa 2.000€ demo, no 100.000€\n2. **Respeta tu plan de trading** como si fuera dinero real\n3. **Registra todo en un diario** — no hacer esto es el error más común\n4. **Objetivos antes de pasar a real:** Mínimo 3 meses rentables consecutivos con tu estrategia\n5. **No la uses para probar situaciones imposibles** — te da hábitos irreales\n\n**El problema de la demo:** No reproduce las emociones del dinero real. Cuando hay dinero real en juego, tomarás decisiones distintas. Por eso se recomienda pasar a real con cantidades muy pequeñas.",
    "example": "Andrés empieza con 5.000€ demo. Durante 2 meses aplica su estrategia y es rentable. En el tercer mes comienza a ''experimentar'' con posiciones grandes porque total ''es demo''. Malos hábitos que no funcionarán en real.\n\nAl contrario, Marina usa la demo estrictamente como si fuera real. Después de 4 meses y +15% de retorno documentado, pasa a real con 500€. Las emociones son distintas pero los hábitos que formó la ayudan.",
    "quiz": [
      {
        "id": "q1",
        "question": "¿Cuál es el mayor problema de las cuentas demo respecto al trading real?",
        "options": ["Los precios son diferentes a los reales", "No replican las emociones que sientes cuando hay dinero real en juego", "Las plataformas demo son más difíciles de usar", "No puedes usar todas las herramientas técnicas"],
        "correct_index": 1,
        "explanation": "En demo operas sin presión emocional. En real, la posibilidad de perder dinero real cambia completamente la toma de decisiones. Por eso es importante pasar a real con cantidades pequeñas y no esperar que sea exactamente igual."
      }
    ],
    "exercise": {
      "prompt": "¿Cuándo deberías considerar pasar de la cuenta demo a una cuenta real?",
      "type": "multiple_choice",
      "options": ["Después de ser rentable en demo durante 1 semana", "Cuando sientas confianza total y hayas sido rentable durante al menos 2-3 meses con tu plan documentado", "Inmediatamente, la demo no sirve para aprender", "Solo cuando tengas 10 años de experiencia"],
      "correct_index": 1
    },
    "summary": "La cuenta demo es tu laboratorio de trading. Úsala como si fuera dinero real, documenta todo, y asegúrate de ser consistentemente rentable antes de pasar a real. El objetivo: formar hábitos correctos, no ganar dinero virtual."
  }'
);

-- ── MÓDULO 10: ESTRATEGIA PERSONAL ───────────────────

INSERT INTO lessons (module_id, title, order_index, xp_reward, content) VALUES
(
  (SELECT id FROM modules WHERE slug = 'estrategia'),
  'Construye tu plan de trading personal',
  1,
  80,
  '{
    "explanation": "Un **plan de trading** es tu constitución personal como trader. Es el documento que defines cuando estás calmado y al que recurres cuando el mercado te presiona.\n\n**Qué debe incluir tu plan:**\n1. **Mercados y activos:** ¿Qué vas a operar? (Forex, acciones, cripto...)\n2. **Timeframes:** ¿En qué marco temporal?\n3. **Reglas de entrada:** ¿Exactamente qué condiciones deben cumplirse para entrar?\n4. **Reglas de salida:** Stop loss y take profit predefinidos\n5. **Gestión del riesgo:** % máximo por operación, correlaciones a evitar\n6. **Horario:** ¿Cuándo operas? ¿Cuándo NO operas? (evitar noticias importantes)\n7. **Criterios de revisión:** ¿Cuándo revisas y ajustas el plan?\n\n**Regla de oro:** Si la operación no cumple tu plan, NO entras. Sin excepciones.",
    "example": "Plan de ejemplo (simplificado):\n- Activo: EUR/USD\n- Timeframe: H4 para tendencia, H1 para entrada\n- Entrada: Ruptura de resistencia con volumen + retroceso al nivel\n- Stop Loss: 1,5% por debajo de la entrada\n- Take Profit: ratio 1:2 mínimo\n- Riesgo: 1% del capital por operación\n- Horario: Solo sesiones Londres y Nueva York. No opero los viernes después de las 18:00 ni antes de datos macro importantes.",
    "quiz": [
      {
        "id": "q1",
        "question": "¿Por qué es importante tener un plan de trading ESCRITO?",
        "options": ["Para enseñárselo a otros y parecer profesional", "Porque las reglas escritas son más difíciles de ignorar cuando las emociones presionan en el mercado", "Porque los brokers lo exigen por regulación", "Para calcular impuestos más fácilmente"],
        "correct_index": 1,
        "explanation": "Un plan escrito actúa como ancla emocional. Cuando el mercado te presiona y las emociones quieren que actúes de forma irracional, el plan escrito te recuerda las reglas que definiste en frío."
      }
    ],
    "exercise": {
      "prompt": "Ves una operación muy buena pero no cumple exactamente tus reglas de entrada. El precio se está moviendo rápido. ¿Qué haces?",
      "type": "multiple_choice",
      "options": ["Entras igualmente porque parece muy buena", "No entras: si no cumple el plan, no hay operación", "Modificas las reglas del plan para que encaje", "Preguntas a otros traders qué harían"],
      "correct_index": 1
    },
    "summary": "Tu plan de trading es tu guía más valiosa. Defínelo con calma, inclúyelo todo y síguelo con disciplina absoluta. Los traders rentables no son los que saben más, son los que ejecutan su plan con más consistencia."
  }'
),
(
  (SELECT id FROM modules WHERE slug = 'estrategia'),
  'El diario de trading: tu herramienta de mejora continua',
  2,
  80,
  '{
    "explanation": "El **diario de trading** es el hábito que más separa a traders profesionales de amateurs. Sin registro, no puedes mejorar.\n\n**Qué registrar en cada operación:**\n- Fecha y hora\n- Activo y timeframe\n- Razón de la entrada (¿qué viste en el gráfico?)\n- Entrada, Stop Loss, Take Profit\n- Resultado (ganancia/pérdida)\n- Emoción que sentías al entrar y al salir\n- Qué hiciste bien y qué podrías mejorar\n- Captura del gráfico en el momento de entrada\n\n**Revisión semanal:** Cada domingo, revisa las últimas 5-10 operaciones. Identifica patrones: ¿Cometes más errores en ciertos horarios? ¿Ciertos patrones te dan más pérdidas? ¿Cuando pierdes tres seguidas, ¿cómo reaccionas?\n\nEl diario convierte la experiencia en aprendizaje estructurado.",
    "example": "Después de revisar 50 operaciones en su diario, María descubre que el 80% de sus pérdidas ocurren entre las 14:00 y las 16:00 UTC (apertura de Wall Street, mercado muy volátil). Decide no operar en ese horario. Sus resultados mejoran significativamente sin cambiar su estrategia.",
    "quiz": [
      {
        "id": "q1",
        "question": "¿Cuál es el principal beneficio de llevar un diario de trading?",
        "options": ["Impresionar a otros traders con tu historial", "Identificar patrones de error y mejora que no serían visibles de otra forma", "Calcular exactamente los impuestos a pagar", "Probar que eres rentable ante el broker"],
        "correct_index": 1,
        "explanation": "El diario te permite ver patrones que de otra forma serían invisibles: qué tipos de operaciones funcionan, en qué condiciones cometes más errores, cómo afectan tus emociones a los resultados."
      }
    ],
    "exercise": {
      "prompt": "Revisando tu diario, descubres que el 70% de tus pérdidas son en operaciones que entraste por FOMO (sin esperar tu señal exacta). ¿Qué conclusión obtienes?",
      "type": "multiple_choice",
      "options": ["Debes operar más rápido para no perder oportunidades", "Debes añadir una regla en tu plan: solo entrar cuando se cumpla la señal exacta, nunca por FOMO", "El FOMO es inevitable y no se puede controlar", "Debes cambiar completamente de estrategia"],
      "correct_index": 1
    },
    "summary": "El diario de trading transforma cada operación —ganadora o perdedora— en información valiosa. Registralo todo, revísalo semanalmente y úsalo para identificar y corregir tus patrones de error. Es tu sistema de mejora continua."
  }'
);
