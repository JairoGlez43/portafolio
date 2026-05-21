# Deploy a Vercel — pasos finales

El código ya está en GitHub en [JairoGlez43/portafolio](https://github.com/JairoGlez43/portafolio). Solo falta que conectes el repo a tu cuenta de Vercel.

> Tiempo estimado: **5 minutos**.

---

## 1) Importar el proyecto

1. Ve a [vercel.com/new](https://vercel.com/new).
2. Si te pide login, usa **"Continue with GitHub"** y autoriza la app de Vercel para tu cuenta `JairoGlez43`.
3. En la lista de repos verás `JairoGlez43/portafolio`. Click **Import** a su derecha.
4. En la pantalla "Configure Project":
   - **Project Name**: `portafolio` (déjalo así).
   - **Framework Preset**: Vercel debería detectar **Next.js** automáticamente. Si no, selecciónalo manualmente.
   - **Root Directory**: déjalo en `.` (la raíz).
   - **Build & Output Settings**: déjalo todo por defecto.

---

## 2) Configurar Environment Variables

Antes de hacer click en Deploy, expande la sección **Environment Variables** y añade estas tres entradas. Para cada una, pegas el **Name** y el **Value** y das **Add**.

| Name | Value |
|---|---|
| `RESEND_API_KEY` | `re_2keVUddb_KHpqZmFfZkfZqpktaGG6a61B` |
| `NEXT_PUBLIC_SITE_URL` | `https://portafolio-jairoglez43.vercel.app` *(o el dominio que escojas en el paso 4)* |
| `CONTACT_FROM_EMAIL` | `Portafolio <onboarding@resend.dev>` *(opcional pero recomendado)* |

> Marca las tres para **Production**, **Preview** y **Development** (suele estar por defecto).
> Si más tarde compras un dominio propio, actualizas `NEXT_PUBLIC_SITE_URL` y `CONTACT_FROM_EMAIL`.

---

## 3) Deploy

1. Click el botón grande **Deploy**.
2. Vercel tarda **~1-2 minutos** en compilar y desplegar.
3. Verás logs en vivo. Al terminar te muestra una URL `https://portafolio-<algo>.vercel.app`.

---

## 4) Ajustar el subdominio (opcional pero recomendado)

Vercel asigna URLs largas tipo `portafolio-jairoglez43-projects.vercel.app`. Puedes elegir un alias más corto:

1. En el dashboard del proyecto → **Settings → Domains**.
2. Verás las URLs auto-asignadas. Para añadir un alias:
3. Escribe `jairogonzalez.vercel.app` y click **Add**.
   - Si está libre, queda como tu dominio principal.
   - Si está cogido, prueba `jairogonzalez-dev.vercel.app` o `jairo-gz.vercel.app`.
4. Vuelve a **Settings → Environment Variables**, actualiza `NEXT_PUBLIC_SITE_URL` con el dominio definitivo y **redeploya** (Settings → Deployments → último deploy → menú "..." → Redeploy).

---

## 5) Verificar que todo funciona

Abre tu dominio definitivo y comprueba:

- [ ] Hero anima al cargar (label → nombre → rol → CTAs)
- [ ] Click "Ver proyectos" hace scroll y muestra los 5 cards
- [ ] Click en card de **VOO Platform** → carga la página de case study
- [ ] La pestaña anterior/siguiente en el case study navega correctamente
- [ ] Footer tiene 3 iconos: GitHub, Email, LinkedIn — los tres clican a sitio correcto
- [ ] Toggle de tema claro/oscuro funciona (arriba a la derecha)
- [ ] En modo móvil (DevTools → mobile view) la nav y el form se ven bien
- [ ] Form de contacto: rellena nombre/email/mensaje válidos, envía → te llega un email real a `jairoglez1999@gmail.com`
- [ ] Form de contacto: valida que ves errores inline si dejas campos vacíos
- [ ] Página inexistente (ej. `/no-existe`) muestra el 404 custom
- [ ] Descarga de CV (botón en hero) descarga el PDF

---

## 6) Compartir el portafolio

Ya tienes una URL viva. Algunos sitios donde añadirla:

- LinkedIn → tu perfil → **Sitio web** → la URL.
- GitHub → tu perfil → **Edit profile** → Website.
- Firma de email.
- Tu CV (los archivos `cv-*.tex` — si quieres, te lo incorporo después con un `\faIcon{globe}~...`).

---

## Si algo falla durante el deploy

**El build falla con error de TypeScript:**
- Improbable porque ya verifiqué el build localmente. Mándame el log de Vercel y lo miro.

**El form de contacto devuelve "Servicio no configurado":**
- Significa que `RESEND_API_KEY` no llegó a las env vars de Vercel. Vuelve al paso 2 y revisa.

**OG image no se ve en Twitter/LinkedIn:**
- Forzar refresco de cache: [linkedin.com/post-inspector](https://www.linkedin.com/post-inspector/) y [cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator).

**Dominio personalizado más adelante:**
- Si compras `jairogonzalez.dev` en Porkbun: Settings → Domains → Add → escribe el dominio. Vercel te dará los registros DNS exactos para configurar en Porkbun.

---

Cuando lo tengas vivo, mándame la URL final y comprobamos que todo funciona.
