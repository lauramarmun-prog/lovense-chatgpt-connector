# Lilazul Lovense Connector

Un conector privado de Lovense para ChatGPT y otros clientes MCP. Está pensado para una sola dueña por despliegue: detecta varios dispositivos, adapta las funciones a cada modelo y solo puede actuar sobre juguetes encendidos y conectados a su Lovense Remote.

> Proyecto comunitario independiente. No está afiliado, patrocinado ni aprobado por Lovense.

## La experiencia para la usuaria

1. Pulsa **Deploy on Railway** en la plantilla publicada.
2. Pega su `LOVENSE_DEVELOPER_TOKEN`; Railway genera las demás claves privadas.
3. Abre el dominio que Railway le entrega e introduce su `OWNER_SECRET`.
4. Pulsa **Crear código QR** y lo escanea desde Lovense Remote.
5. Copia la URL `/mcp` en ChatGPT. ChatGPT abre OAuth y pide la Owner Key una sola vez.
6. Para usarlo cualquier día, enciende el juguete, conéctalo a Lovense Remote y pídeselo a la IA.

**PARAR TODO** y la herramienta `lovense_stop` detienen los dispositivos inmediatamente.

## Funciones

- Descubrimiento en vivo de uno o varios juguetes conectados.
- Selección de un dispositivo, varios o todos los autorizados.
- Vibración, rotación, bombeo, thrust, fingering, succión, profundidad, stroke y oscilación cuando el dispositivo los admite.
- Patrones personalizados y presets oficiales: `pulse`, `wave`, `fireworks` y `earthquake`.
- Batería, conexión, nombre, apodo y capacidades por dispositivo.
- OAuth 2.1 con PKCE para ChatGPT.
- Validación de dispositivo, función e intensidad antes de cada orden.
- Órdenes con duración elegida por la usuaria, incluyendo `0` para continuar hasta que diga que pare.
- Parada de emergencia y orden de parada al cerrar el servidor.
- Estado de dispositivos cifrado con AES-256-GCM.
- Sin analítica, anuncios ni base de datos compartida.

La lista y los rangos proceden de la [Standard API oficial de Lovense](https://developer.lovense.com/docs/standard-solutions/standard-api). El servidor usa primero las funciones que el dispositivo anuncia en vivo y solo recurre a un catálogo conservador cuando esa información no llega por el socket.

## Lo que hace cada juguete

| Familia/modelo | Funciones de control usadas como fallback |
| --- | --- |
| Ferri, Lush, Hush, Domi, Gemini, Flexer, Mission, Dolce, Ambi, Lapis, Exomoon, Hyphy | Vibrate |
| Nora, Ridge | Vibrate + Rotate |
| Max / Max 2 | Vibrate + Pump |
| Tenera / Tenera 2 | Suction |
| Osci | Vibrate + Fingering |
| Gush 2 | Vibrate + Oscillate |
| Velvo | Vibrate + Rotate + Oscillate |
| Vulse | Vibrate + Thrusting |
| Solace, Solace Pro, Gravity y Lovense Sex Machine | Thrusting + Stroke + Depth |
| Spinel | Vibrate + Thrusting + Stroke |
| Edge y Synth | Vibrate |

El calor de modelos como Spinel no se expone porque `Heat` no figura entre las acciones de la Standard API. Mission 2 reacciona a profundidad mediante TouchSense, pero eso no lo convierte en un dispositivo con motor `Thrusting`. Consulta [docs/DEVICE_CAPABILITIES.md](docs/DEVICE_CAPABILITIES.md) para los rangos y el criterio de detección.

## Desarrollo local

Requiere Node.js 20 o posterior y un token del [panel de Lovense Developer](https://www.lovense.com/developer/).

```powershell
Copy-Item .env.example .env
# Rellena .env con cuatro secretos distintos y tu token de Lovense.
npm install
npm run check
npm test
npm run build
npm start
```

El proceso no carga `.env` automáticamente. En desarrollo, importa esas variables en la terminal o usa el gestor de entorno que prefieras. En Railway se inyectan desde **Variables**.

## Variables de Railway

| Variable | Quién la proporciona | Descripción |
| --- | --- | --- |
| `LOVENSE_DEVELOPER_TOKEN` | La usuaria | Token privado de su proyecto Lovense Developer. Nunca va al navegador. |
| `OWNER_SECRET` | Railway: `${{secret(32)}}` | Clave que la dueña usa para abrir el panel y aprobar OAuth. |
| `MCP_PATH_SECRET` | Railway: `${{secret(48)}}` | Acceso alternativo para clientes MCP sin OAuth. No se muestra en el panel. |
| `OAUTH_SIGNING_KEY` | Railway: `${{secret(64)}}` | Firma códigos y tokens OAuth. Rotarla revoca todos los enlaces. |
| `STATE_ENCRYPTION_KEY` | Railway: `${{secret(64)}}` | Cifra el estado guardado. Si cambia, hay que volver a escanear el QR. |
| `LOVENSE_UID` | Railway: `${{secret(16)}}` | Identificador privado y estable de esta instancia. |
| `LOVENSE_PLATFORM_NAME` | Plantilla | Nombre visible en Lovense Remote; por defecto `Lilazul Lovense`. |
| `STATE_FILE` | Plantilla | `/data/lovense-state.enc` cuando la plantilla adjunta un volumen. |

Variable opcional: `MAX_COMMAND_SECONDS` (3600) limita una duración numérica accidentalmente enorme. El valor `0` sigue significando “hasta que la usuaria diga que pare”.

## Preparar la plantilla de Railway

El repositorio ya contiene `railway.json`, compilación reproducible y `/health`. En el editor de plantillas de Railway:

1. Añade este repositorio como un servicio con red pública.
2. Crea las variables anteriores; usa las funciones `secret()` para todas salvo el token de Lovense.
3. Adjunta un volumen en `/data` y define `STATE_FILE=/data/lovense-state.enc`.
4. Mantén `/health` como health check.
5. Publica la plantilla y añade a este README el botón que Railway genere.

Railway recomienda generar secretos en la plantilla, describir cada variable y configurar un health check. Véase [Create a Template](https://docs.railway.com/templates/create) y [Template Best Practices](https://docs.railway.com/templates/best-practices).

## Herramientas MCP

- `lovense_status`: conexión y estado de autorización.
- `lovense_list_devices`: dispositivos, batería y capacidades.
- `lovense_control`: una o varias funciones durante el tiempo solicitado o hasta que la usuaria diga que pare.
- `lovense_play_pattern`: secuencia personalizada de intensidades.
- `lovense_play_preset`: preset oficial.
- `lovense_stop`: parada inmediata de uno o todos los dispositivos.

## Seguridad y privacidad

Lee [SECURITY.md](SECURITY.md) antes de publicar o modificar autenticación. La instancia usa OAuth para ChatGPT, pero conserva una ruta secreta opcional para clientes que todavía no soportan OAuth. Esa URL alternativa debe tratarse como una contraseña.

## Licencia

MIT. Consulta [LICENSE](LICENSE).
