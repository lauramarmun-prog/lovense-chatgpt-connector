# Lovense Connector for ChatGPT

A private, self-hosted MCP connector that lets ChatGPT detect and control the Lovense devices you connect to Lovense Remote. Each Railway deployment belongs to one owner and keeps its credentials isolated.

> Independent community project. Not affiliated with, sponsored by, or endorsed by Lovense.

## Before deploying

Open the Lovense Developer Dashboard, choose **Standard API**, and have these ready:

- **Developer Token**
- The exact **Website Name** from the same Lovense project
- A private **Owner Key** of at least 24 characters that only you know

## Setup

1. Deploy this template and enter the three values above. Railway generates the remaining security keys automatically.
2. Open the public Railway domain and enter your Owner Key.
3. Select **Connect for the first time / Repair connection** and scan the QR code from Lovense Remote.
4. In ChatGPT developer mode, create an app with the `/mcp` URL shown in the panel and select **OAuth** authentication.
5. When ChatGPT opens the authorization page, enter the same Owner Key and approve access.

For daily use, simply turn on the toy and connect it to Lovense Remote. The QR code is only needed for the first connection or to repair the link.

## Included

- Live discovery of one or multiple connected devices
- Per-device capability detection and targeting
- Vibration, rotation, pumping, thrusting, fingering, suction, depth, stroke, and oscillation when supported by the device
- Custom patterns and Lovense presets
- OAuth 2.1 with PKCE for ChatGPT
- Encrypted saved device state
- Immediate **STOP EVERYTHING** control
- Spanish/English interface with automatic browser-language detection

Developer tokens and Owner Keys remain server-side. Each person should deploy her own copy and use her own Lovense Developer credentials.

---

# Conector Lovense para ChatGPT

Un conector MCP privado y autoalojado que permite a ChatGPT detectar y controlar los dispositivos que conectes a Lovense Remote. Cada despliegue de Railway pertenece a una sola dueña y mantiene sus credenciales aisladas.

> Proyecto comunitario independiente. No está afiliado, patrocinado ni aprobado por Lovense.

## Antes de desplegar

Abre el panel Lovense Developer, elige **Standard API** y prepara:

- La **Developer Token**
- El **Website Name** exacto del mismo proyecto Lovense
- Una **Owner Key** privada de al menos 24 caracteres que solo tú conozcas

## Configuración

1. Despliega la plantilla e introduce esos tres valores. Railway genera automáticamente las demás claves de seguridad.
2. Abre el dominio público de Railway e introduce tu Owner Key.
3. Pulsa **Conectar por primera vez / Reparar conexión** y escanea el QR desde Lovense Remote.
4. En el modo desarrollador de ChatGPT, crea una app con la URL `/mcp` mostrada en el panel y selecciona autenticación **OAuth**.
5. Cuando ChatGPT abra la autorización, introduce la misma Owner Key y aprueba el acceso.

Para el uso diario basta con encender el juguete y conectarlo a Lovense Remote. El QR solo se necesita la primera vez o para reparar el enlace.

## Incluye

- Detección en vivo de uno o varios dispositivos conectados
- Capacidades y selección independientes por dispositivo
- Vibración, rotación, bombeo, thrust, fingering, succión, profundidad, stroke y oscilación cuando el dispositivo los admite
- Patrones personalizados y presets de Lovense
- OAuth 2.1 con PKCE para ChatGPT
- Estado guardado con cifrado
- Control inmediato **PARAR TODO**
- Interfaz en castellano e inglés con detección automática del idioma del navegador

Las Developer Tokens y Owner Keys permanecen en el servidor. Cada persona debe desplegar su propia copia y utilizar sus propias credenciales de Lovense Developer.
