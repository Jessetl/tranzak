# 🏛️ ARCHITECTURE_MASTER

**Proyecto:** Web de Finanzas Personales
**Versión:** 1.1
**Contexto:** Venezuela (Economía Multi-moneda)
**Enfoque:** Control Manual y "Mobile-First"

---

## 1. Visión y Objetivo

- Desarrollar una aplicación web de gestión financiera personal adaptada a la economía venezolana.
- El sistema prioriza el control manual sobre la sincronización bancaria automática, permitiendo gestionar múltiples cuentas y monedas con precisión.
- El objetivo es ofrecer una "foto real" de la disponibilidad financiera, mitigando la incertidumbre de la inflación y los ingresos irregulares.

## 2. Arquitectura de Monedas y Datos (Core)

El sistema debe manejar la dualidad monetaria sin perder la precisión histórica.

- **Moneda Base:** La interfaz y los registros contables operan principalmente en **Bolívares (VES)**.
- **Integración API (Tasa de Cambio):** - Se consumirá una API externa para obtener la tasa oficial del día (ej. BCV).
  - La tasa actual debe mostrarse visiblemente en el Dashboard.
- **Lógica de "Snapshot" (Histórico de Valor):**
  - Al registrar una transacción, se guarda el valor del dólar **en ese instante preciso**.
  - **Estructura de datos:** `Monto (Bs)` + `Tasa usada` + `Equivalente calculado (USD)`.
  - **Propósito:** Garantizar que los reportes históricos reflejen el poder adquisitivo real del momento, no el valor devaluado actual.

## 3. Funcionalidades Principales

### 3.1. Gestión de Cuentas (Multi-Wallet)

- **Creación Manual:** El usuario crea "billeteras" ilimitadas (Ej: "Banesco", "Venezuela", "Efectivo", "Zelle", "Binance").
- **Ajuste Manual:** Los saldos se editan manualmente. No hay conexión API con bancos por seguridad y simplicidad.

### 3.2. Ingresos con Validación (Check-in)

- Sistema para ingresos recurrentes (Semanales, Quincenales, Mensuales).
- **Flujo de Confirmación:** El dinero planificado _no_ se suma automáticamente.
- **Acción Requerida:** El sistema notifica al usuario en la fecha estipulada. El usuario debe "Confirmar" la recepción para que el monto se acredite al saldo disponible.

### 3.3. Motor de Distribución Inteligente (NUEVO)

Permite configurar "Planes de Distribución" para asignar el dinero entrante a categorías (Sobres) de forma automática.

- **Reglas Híbridas:** Un plan puede contener una mezcla de:
  - **Montos Fijos (VES):** Para gastos estáticos (ej. "500 Bs para Alquiler").
  - **Porcentajes (%):** Para gastos variables (ej. "30% para Comida").
- **Lógica de Cálculo (Plan A - Sobre Bruto):**
  - Los porcentajes se calculan siempre sobre el **Monto Total del Ingreso**.
  - _Ejemplo:_ Ingreso de 1.000 Bs. Reglas: 200 Bs Fijos + 50% Variable.
  - _Cálculo:_ 200 Bs + (50% de 1.000 = 500 Bs). Total asignado: 700 Bs.
- **Validación:** Si la suma de las reglas supera el monto del ingreso, el sistema debe alertar al usuario.

### 3.4. Sistema de Presupuesto (Estipendios/Sobres)

- Visualización del dinero disponible por categoría (Ej: "Te quedan 500 Bs en Comida") independientemente de la cuenta bancaria donde esté el dinero real.

### 3.5. Registro de Gastos

- **Input del usuario:** Monto (Bs), Cuenta de Origen (Dinámica), Categoría.
- Cálculo automático del equivalente en USD al momento de guardar.

## 4. Diseño de Interfaz (UX/UI) - Dashboard

Diseño centrado en dispositivos móviles (**Mobile-First**) con navegación basada en gestos.

### 4.1. Header: Carrusel de Tarjetas (Slider)

- **Componente:** Carrusel horizontal interactivo.
- **Interacción:** Deslizar (swipe) lateralmente para navegar entre cuentas.
- **Datos de Tarjeta:** Nombre, Saldo (Bs), Equivalente (USD).

### 4.2. Body: Historial Contextual Reactivo

- **Comportamiento:** La lista de movimientos debajo del carrusel **reacciona** al estado del slider.
- **Filtrado:**
  - _Slide activo:_ "Banesco" -> Lista muestra: Movimientos de Banesco.
  - _Slide activo:_ "Efectivo" -> Lista muestra: Movimientos de Efectivo.
- **Detalle:** Cada fila muestra concepto, monto en Bs y un indicador discreto del valor histórico en USD.
