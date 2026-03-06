# Manual de Identidad Visual - Mis Finanzas IA

**Versión:** 1.0 (2026)
**Concepto Central:** Fricción Cero, Inteligencia Artificial Premium, Minimalismo Financiero.

---

## 1. Identidad de Marca (Brand Core)

**Nombre Registrable:** Mis Finanzas IA
**Tagline Propuesto:** "Tu capital, potenciado por inteligencia."
**Voz y Tono:** Profesional pero accesible, futurista, asertivo y claro. No usa jerga técnica innecesaria; se enfoca en resolver problemas del usuario en un solo toque o comando de voz.

---

## 2. Paleta de Colores (Color System)

La paleta se inspira en el concepto de "Glassmorphism" combinado con acentos de neón futuristas (Cyber-Finance). 

### Colores Primarios (Fondos y Superficies)
De oscuro a claro, diseñados para reducir la fatiga visual de una app financiera y dar un look "Premium Night Mode".

- **Deep Space Blue (Fondo Principal)**
  - HEX: `#0F172A` (Slate 900)
  - RGB: `15, 23, 42`
  - Uso: Fondo principal de la aplicación.
- **Glass Paper (Superficies/Tarjetas)**
  - HEX: `#1E293B` (Slate 800)
  - RGB: `30, 41, 59`
  - Uso: Tarjetas, componentes modales y fondos de Glassmorphism.

### Colores de Acento (Interacciones e IA)
- **Sapphire AI (Azul Inteligente)**
  - HEX: `#3B82F6` (Blue 500)
  - RGB: `59, 130, 246`
  - Uso: Botones principales, estados activos, botón central del micrófono y brillo del generador de IA.
- **Neon Emerald (Ingresos y Crecimiento)**
  - HEX: `#10B981` (Emerald 500)
  - RGB: `16, 185, 129`
  - Uso: Textos de balances positivos, botones de confirmación, flechas de ingresos.
- **Rose Alert (Gastos y Alertas)**
  - HEX: `#F43F5E` (Rose 500)
  - RGB: `244, 63, 94`
  - Uso: Textos de balances negativos, animaciones de escucha del micrófono, alertas.

---

## 3. Topografía (Typography)

Para reflejar claridad financiera y un aspecto tecnológico, se utiliza una combinación de tipografías "Sans-Serif" geométricas y tipografías "Mono" para los números.

- **Fuente Primaria (Títulos y Cuerpo):** `Inter` o `San Francisco (SF Pro)` (Nativas)
  - Peso: Regular (400) para cuerpo, Bold/Black (700/900) para títulos.
  - Razón: Alta legibilidad en pantallas pequeñas, aspecto sofisticado y limpio.
- **Fuente Secundaria (Números y Balances):** `JetBrains Mono` o `SF Mono`
  - Razón: Dar un aspecto tabular perfecto a los números financieros para que `$100.00` y `$999.99` se alineen idealmente.

---

## 4. Principios UI / UX (User Interface & Experience)

### Glassmorphism Avanzado
Ningún componente flota en un color sólido. Todas las tarjetas (`TransactionItem`, `DashboardView`, `ActionCenter`) utilizan fondos semitransparentes `rgba(30, 41, 59, 0.5)` con un desenfoque de fondo (`backdrop-blur-md` a `24px`). Se utilizan bordes muy sutiles en blanco (`rgba(255,255,255,0.05)`) para simular la luz golpeando vidrio.

### Fricción Cero (Zero-Friction Rule)
- Todo el flujo principal de registro de datos ocurre en **una sola pantalla**.
- Los formularios complejos se evitan totalmente; se prioriza la entrada de **Voz a Datos** impulsada por IA.
- Las vistas complejas (como Resumen Mensual) están ocultas tras un simple toggle (`ViewToggle`), priorizando la lista rápida por defecto.

### Microinteracciones
Se debe usar `Framer Motion` (o equivalente CSS puro) para dar vida a la app:
- **Respiración (Pulse Glow):** El botón de micrófono brilla suavemente cuando la app está inactiva y emite ondas de radar rojas/azules cuando escucha.
- **Listas Escalonadas (Staggered Lists):** Las transacciones no aparecen de golpe; "caen" suavemente en su lugar con escalas del 95% al 100%.

---

## 5. El Logo

El isotipo es una mezcla conceptual entre la mente de un bot impulsado por IA y los mercados financieros. 
- Contiene nodos conectados, simulando una red neuronal.
- Una flecha angular de crecimiento o símbolo monetario en el centro.
- Encapsulado en un ícono de "Glass" pulido típico de iOS, optimizado para destacar contra fondos oscuros y claros del sistema operativo del dispositivo.
