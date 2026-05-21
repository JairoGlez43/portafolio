# Tareas pendientes del usuario

Esta es la lista de cosas que necesito de ti para terminar el portafolio. Las he agrupado por **prioridad** y cada una incluye instrucciones paso a paso.

> Una vez completadas, avísame y aplicaremos todo lo que dependa de ellas en la **Fase 7.2** antes de pasar al deploy (Fase 8).

---

## Bloque A — Imprescindibles antes del deploy

Sin estas tareas no podemos lanzar el portafolio en Vercel con todas sus funciones.

---

### A1. Crear cuenta de Vercel + conectar con GitHub

**Por qué:** Vercel es donde vamos a alojar el portafolio. Free tier suficiente para portafolios personales.

**Pasos:**

1. Ve a [vercel.com/signup](https://vercel.com/signup).
2. Click **"Continue with GitHub"** y autoriza la app.
3. Cuando pregunte el plan, elige **Hobby (gratis)**.
4. En el username sugerido, déjalo como `jairo-gonzalez` o `jairoglez43` (idealmente coincidiendo con GitHub).

**Cuando termines:**
- [ ] Tengo cuenta en vercel.com
- [ ] Vercel tiene acceso a mi GitHub

---

### A2. Crear repo en GitHub para el portafolio

**Por qué:** Vercel despliega desde GitHub. Cada `git push` a `main` desplegará automáticamente.

**Pasos:**

1. Ve a [github.com/new](https://github.com/new) (logueado como `JairoGlez43`).
2. Nombre del repo: **`portfolio`**
3. Visibilidad: **Public** (recomendado, para que aparezca en tu perfil)
4. **NO** marques "Add README", "Add .gitignore", ni licencia — el proyecto local ya los tiene.
5. Click **Create repository**.
6. Copia la URL HTTPS o SSH (la verás en la página tras crear).

**Cuando termines, dime:**
- [ ] URL del repo (ej: `https://github.com/JairoGlez43/portfolio`)

> Yo me encargo del primer push en la Fase 8.

---

### A3. Crear cuenta de Resend + obtener API key

**Por qué:** El formulario de contacto envía emails reales con Resend. Sin esta key, en producción el form responderá con error 503 ("servicio de email no configurado").

**Pasos:**

1. Ve a [resend.com/signup](https://resend.com/signup) y crea cuenta (puedes loguear con Google o GitHub).
2. Free tier: **3.000 emails/mes, 100 emails/día**, suficiente y gratis para siempre.
3. Una vez dentro, ve a [resend.com/api-keys](https://resend.com/api-keys).
4. Click **Create API Key**.
   - Name: `Portafolio production`
   - Permission: **Sending access**
   - Domain: dejar **All domains** por ahora.
5. Copia la key que empieza por `re_...` — **no se vuelve a mostrar**.

**Sobre el dominio del remitente (importante):**

Por defecto Resend permite enviar **solo** desde `onboarding@resend.dev` hasta que verifiques un dominio propio. Eso funciona para empezar. Si más adelante compras un dominio (ver C1), podrás usar `contacto@jairogonzalez.dev` añadiéndolo en Resend → Domains.

**Cuando termines, dime:**
- [ ] Mi `RESEND_API_KEY` es `re_xxxxxxxxxxxxxxxxxxxxxxxxx` (envíamela en privado o yo la añadiré en Vercel directamente cuando estés en la consola)

> Te diré exactamente dónde pegarla en la Fase 8 (Vercel → Environment Variables).

---

## Bloque B — Recomendados (mejoran el portafolio)

Sin estas tareas el portafolio funciona, pero con ellas se ve mucho mejor.

---

### B1. Screenshots reales de los proyectos

**Por qué:** Ahora cada card y case study muestra un placeholder SVG con gradiente. Reemplazarlos por capturas reales eleva muchísimo la percepción del portafolio.

**Qué necesito (ordenado por prioridad):**

| Proyecto | Archivo a reemplazar | Prioridad |
|---|---|---|
| VOO Platform | [public/projects/voo-platform.svg](portfolio/public/projects/voo-platform.svg) | Alta — tiene case study |
| AI Analyzer | [public/projects/ai-analyzer.svg](portfolio/public/projects/ai-analyzer.svg) | Alta — tiene case study |
| CubanParty | [public/projects/cubanparty.svg](portfolio/public/projects/cubanparty.svg) | Alta — tiene case study |
| Memecoin Dashboard | [public/projects/memecoin.svg](portfolio/public/projects/memecoin.svg) | Media |
| Mojitos Bar | [public/projects/mojitos-bar.svg](portfolio/public/projects/mojitos-bar.svg) | Media |

**Especificaciones:**

- **Formato:** preferentemente `.webp` (mejor compresión) o `.png`. JPEG vale.
- **Aspect ratio:** **16:10** (es lo que usa el grid). Por ejemplo: 1600×1000, 1280×800, 960×600.
- **Calidad:** captura la pantalla completa de la home/dashboard del proyecto, sin chrome del navegador.
- **Peso:** que no pase de **400 KB** cada una. Si pesa más, usa [squoosh.app](https://squoosh.app/) para comprimir (gratis, sin registro).
- **Modo oscuro o claro:** lo que mejor represente el proyecto. Las dos opciones funcionan visualmente.

**Cómo hacer una buena captura:**

1. Abre el proyecto en producción (o en local si es privado).
2. Ventana del navegador a 1440×900.
3. Modo "responsive" o "device" para hacer la captura sin la barra del navegador, o usa la herramienta del SO (`Win + Shift + S` en Windows, `Cmd + Shift + 4` en macOS).
4. Si el proyecto tiene varias pantallas relevantes, escoge la más visualmente impactante (suele ser la home o el dashboard principal).

**Cuándo reemplazarlas:**

Tienes dos opciones:
- **Opción 1 (más fácil):** envíame los archivos por chat con el nombre exacto y yo los pongo en su sitio.
- **Opción 2 (autónoma):** copia los archivos a `/home/rodrigo/projects/jairo/portfolio/public/projects/` reemplazando los SVG. Si el formato es distinto a `.svg` (recomendado), también necesito que actualices el campo `image` en [src/content/projects.ts](portfolio/src/content/projects.ts) — pero esto lo hago yo en la Fase 7.2.

**Cuando termines:**
- [ ] Tengo capturas para los 3 proyectos prioritarios (VOO, AI Analyzer, CubanParty)
- [ ] (Opcional) Tengo capturas para Memecoin y Mojitos Bar
- [ ] Te las he enviado o están en `public/projects/`

---

### B2. URL real de tu LinkedIn

**Por qué:** El footer del portafolio y los CVs tienen un placeholder `linkedin.com/in/`. Con tu URL real, el icono de LinkedIn se vuelve un enlace funcional.

**Pasos:**

1. Si no tienes perfil, ve a [linkedin.com/signup](https://linkedin.com/signup) y créalo.
2. Si ya lo tienes, configura una URL personalizada en [linkedin.com/in/me/edit/contact-info/](https://www.linkedin.com/in/me/edit/contact-info/) → "Edit your custom URL".
   - Recomendación: `linkedin.com/in/jairo-gonzalez-frontend` o similar (corto, profesional).
3. Asegúrate de que el perfil tenga al menos:
   - Foto profesional
   - Headline (puedes copiar el de [cv-linkedin.md](cv/cv-linkedin.md))
   - Experiencia (Freelance Frontend Developer, 2024–Presente)

**Cuando termines, dime:**
- [ ] Mi URL de LinkedIn es: `https://linkedin.com/in/_____`

> En la Fase 7.2 actualizaré el footer y los CVs LaTeX con tu URL real.

---

## Bloque C — Opcionales (nice to have)

Cosas que mejoran experiencia o presencia, pero no son críticas.

---

### C1. Comprar un dominio propio (~€10/año)

**Por qué:** `jairogonzalez.dev` se ve mucho mejor en un email/CV/LinkedIn que `jairogonzalez.vercel.app`.

**Recomendación:** [porkbun.com](https://porkbun.com) (sin registro hasta el carrito, WHOIS privacy gratis, soporte API).

**Pasos:**

1. Ve a [porkbun.com](https://porkbun.com) y busca:
   - `jairogonzalez.dev` (~$10–13/año)
   - `jairogonzalez.me` (~$15/año)
   - `jairogonzalez.com` (~$10/año, si está libre)
2. Asegúrate de que **WHOIS Privacy** esté activado (gratis, oculta tus datos personales).
3. Confirma compra (paga con tarjeta o PayPal).
4. Tendrás acceso al panel DNS para configurar.

**Cuando termines, dime:**
- [ ] Compré el dominio: `_____`

> En la Fase 8 (deploy), después de tenerlo, te explico exactamente qué registros DNS añadir para conectarlo a Vercel.

---

### C2. Configurar foto de perfil + bio en GitHub

**Por qué:** Cuando alguien clica el icono de GitHub desde tu portafolio, ahora mismo va a un perfil sin bio, sin foto, sin repos fijados. Eso le resta a la primera impresión.

**Pasos rápidos en [github.com/JairoGlez43](https://github.com/JairoGlez43):**

1. **Foto de perfil:** Settings → Profile → Profile Picture (la misma que vayas a usar en LinkedIn).
2. **Bio (max 160 chars):**
   ```
   Frontend Developer · React, Next.js, TypeScript · Madrid, ES · Construyo interfaces accesibles y rápidas.
   ```
3. **Pin repos:** En tu perfil → "Customize your pins" → fija los 4–6 mejores: probablemente `Mojitos-Bar`, `dev-events`, y los que vayas haciendo.
4. **Profile README** (opcional pero potente): crear repo `JairoGlez43/JairoGlez43` con un README.md y aparecerá en la cabecera de tu perfil.

**Cuando termines:**
- [ ] Mi GitHub tiene foto, bio, y al menos 3 repos fijados.

---

### C3. Foto profesional para tu perfil

**Por qué:** LinkedIn y eventualmente la sección "Sobre mí" del portafolio (si quieres añadir un avatar) se benefician de una foto buena.

**Recomendaciones:**

- Fondo neutro (pared blanca/gris, no caos detrás).
- Iluminación natural (junto a una ventana, no contraluz).
- Encuadre: hombros y cara, no plano americano.
- Expresión: sonrisa relajada o gesto neutro confiado.
- Resolución mínima: 800×800.

> No es prioritario ahora pero sí para tu presencia online en general.

---

## Resumen rápido — checklist completa

Marca lo que vayas haciendo:

**Bloque A (imprescindibles):**
- [ ] A1. Cuenta Vercel + conexión GitHub
- [ ] A2. Repo `JairoGlez43/portfolio` creado en GitHub
- [ ] A3. Cuenta Resend + `RESEND_API_KEY` obtenida

**Bloque B (recomendados):**
- [ ] B1. Capturas reales de VOO, AI Analyzer, CubanParty
- [ ] B1 extra. Capturas de Memecoin y Mojitos Bar (opcional)
- [ ] B2. URL real de LinkedIn

**Bloque C (opcionales):**
- [ ] C1. Dominio propio comprado
- [ ] C2. GitHub con foto, bio y repos fijados
- [ ] C3. Foto profesional

---

## ¿Y después?

Cuando hayas hecho **al menos el Bloque A + B1 prioritarios**, avísame y entramos a:

- **Fase 7.2** — yo aplico todo lo que aportaste (screenshots, LinkedIn, etc.) al código.
- **Fase 8** — deploy a Vercel con tu dominio (subdominio `*.vercel.app` si todavía no compraste el tuyo).
