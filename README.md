# TradeLingo AI

Plataforma educativa de trading con profesor virtual por IA, lecciones gamificadas y recordatorios diarios.

## Stack

- **Frontend/Backend**: Next.js 15 (App Router)
- **Base de datos**: Supabase (PostgreSQL + Auth)
- **IA**: Anthropic Claude (streaming)
- **Notificaciones**: Telegram Bot
- **Estilos**: Tailwind CSS
- **Despliegue**: Vercel

---

## Despliegue en Vercel

### 1. Sube el código a GitHub

Si aún no lo has hecho:

```bash
git remote add origin https://github.com/TU_USUARIO/tradelingo-ai.git
git push -u origin main
```

### 2. Importa el proyecto en Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Clic en **Add New → Project**
3. Importa tu repositorio de GitHub
4. Vercel detectará Next.js automáticamente

### 3. Configura las variables de entorno en Vercel

En **Project Settings → Environment Variables** añade:

| Variable | Valor |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Tu URL de Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Tu Publishable Key |
| `SUPABASE_SERVICE_ROLE_KEY` | Tu Secret Key |
| `ANTHROPIC_API_KEY` | Tu clave de Anthropic |
| `TELEGRAM_BOT_TOKEN` | Token de tu bot (opcional) |
| `CRON_SECRET` | Un token secreto aleatorio |
| `NEXT_PUBLIC_APP_URL` | Tu URL de Vercel (ej: https://tradelingo.vercel.app) |

### 4. Despliega

Clic en **Deploy**. Vercel construirá y desplegará la app en ~2 minutos.

### 5. Actualiza la URL en Supabase

En Supabase → **Authentication → URL Configuration**:
- **Site URL**: `https://tu-app.vercel.app`
- **Redirect URLs**: `https://tu-app.vercel.app/**`

---

## Desarrollo local

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env.local
# Rellena .env.local con tus claves

# Ejecutar en desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

---

## Variables de entorno requeridas

Copia `.env.example` a `.env.local` y rellena:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
SUPABASE_SERVICE_ROLE_KEY=sb_secret_...
ANTHROPIC_API_KEY=sk-ant-...
TELEGRAM_BOT_TOKEN=         # Opcional
CRON_SECRET=token-secreto-aleatorio
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Base de datos

Ejecuta los archivos SQL en Supabase → SQL Editor en este orden:

1. `supabase/migrations/001_initial_schema.sql`
2. `supabase/migrations/002_seed_content.sql`

---

## Aviso legal

TradeLingo AI es una plataforma **exclusivamente educativa**.
No somos asesores financieros ni intermediarios regulados.
El trading conlleva riesgo de pérdida de capital.
