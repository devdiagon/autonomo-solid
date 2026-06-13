# Bitácora de Principios SOLID

## 1. SRP — Single Responsibility Principle

### Antes

**Archivo:** `src/01-srp/product-bloc.ts`

`ProductBloc` acumula tres responsabilidades distintas en una sola clase: cargar productos del inventario, persistirlos en base de datos y enviar notificaciones por correo. Esto significa que la clase tiene múltiples razones para cambiar: si la lógica de almacenamiento evoluciona, si cambia el proveedor de correo o si se modifica el modelo de negocio, todas esas modificaciones recaen sobre el mismo archivo. La clase mezcla lógica de negocio, persistencia e infraestructura sin separación alguna.

### Después

**Archivo:** `src/01-srp/product-bloc.ts`

Se extrajeron dos servicios especializados del `ProductBloc` original:

- `ProductService` — única responsable de cargar y guardar productos.
- `NotificationService` — única responsable del envío de notificaciones por correo.

`ProductBloc` conserva su interfaz pública pero ahora delega cada operación al servicio correspondiente, recibiéndolos por inyección de dependencias en el constructor. Cada clase tiene una sola razón para cambiar.

### Reflexión

**¿Qué pasaría si mañana decidimos notificar por WhatsApp en lugar de Email? ¿Cuántas clases tendrías que modificar ahora vs. antes?**

Agregar un nuevo servicio conlleva a que se tiene que agregarlo dentro de la clase que gestiona las notificaciones. **Anteriormente**, esto estaba dado por la clase `ProductBloc`, en la cual también se involucraba lógica de negocio (en este caso productos) que no tenía nada que ver con el sistema de notificaciones. De esta manera se corría el riesgo de afectar al servicio de productos al intentar cambiar solo las notificaciones.

En cambio **ahora**, al tener separados los servicios, solo se tiene que modificar `NotificationService`, por lo que el resto de servicios relacionados con producto NO se verían afectados.

Con esto, se concluye que, si bien en ambos casos se modifica una sola clase, al tener el principio de SRP se corre menos riesgo de afectar indirectamente a otros servicios que no necesariamente debería verse afectados, pues cada clase tiene una única responsabilidad.

---

## 2. OCP — Open/Closed Principle

### Antes

**Archivo:** `src/02-ocp/news-service.ts`

`NewsService` y `PhotosService` tienen una dependencia directa y rígida de `axios` dentro de sus métodos. Ante cualquier cambio de cliente HTTP (migrar a `fetch`, a otro adaptador, o hacer un mock en pruebas) es obligatorio abrir y editar cada clase. El código no está cerrado para modificación: no existe ninguna abstracción que permita extender el comportamiento sin tocar el código ya existente.

### Después

**Archivos:** `src/02-ocp/http-adapter.ts`, `src/02-ocp/news-service.ts`

Se introdujo la interfaz `HttpAdapter` con un único método `get<T>()`. A partir de ella se crearó la implementación de axios existente:

- `AxiosAdapter` — envuelve `axios.get()`

`NewsService` y `PhotosService` reciben un `HttpAdapter` por constructor y nunca mencionan `axios` explícitamente. De esta manera se respeta el principo de Open/Closed.

### Reflexión

**Si se detecta una vulnerabilidad en axios y debes migrar a fetch en minutos, ¿qué tan rápido lo harías con este diseño?**

Al tener desacoplado el método concreto para hacer una consulta http, solo basta con crear un nuevo adapter, como `FetchAdapter` que implemente la misma interfaz de `HttpAdapter`. Luego simplemente se intercambia en el servicio cuyo constructor recibe un objeto del tipo `HttpAdapter`.

De esta manera el cambio es sumamente cómodo de realizar, a parte de que es menos propenso de tener errores secundarios tras realizar el cambio. Lo único que define que tanto se demora en efectuar el cambio viene dado por el grado de complejidad de implementar la interfaz con el nuevo adaptador desarrollado.

---

## 3. LSP — Liskov Substitution Principle

### Antes

**Archivo:** `src/03-lsp/vehicle-manager.ts`

Las clases `Tesla`, `Audi`, `Toyota`, `Honda` y `Ford` no comparten ninguna interfaz o clase base común. Por eso, `VehicleManager.printVehicleDetails` necesita una cadena de comprobaciones `instanceof` para tratar a cada tipo de forma diferente. Es imposible sustituir un vehículo por otro sin que el código del cliente lo detecte y tome una rama distinta, lo que viola directamente el principio de sustitución.

### Después

---

## 4. ISP — Interface Segregation Principle

### Antes

**Archivo:** `src/04-isp/bird-catalog.ts`

La interfaz `Bird` obliga a todas las aves a implementar `eat()`, `fly()` y `swim()`, sin importar sus capacidades reales. `Hummingbird` lanza una excepción en `swim()` porque los colibríes no nadan, y `Ostrich` lanza una excepción en `fly()` porque los avestruces no vuelan. Las clases se ven forzadas a depender de métodos que no pueden ni deben usar, en lugar de componerse únicamente de las interfaces que les corresponden.

### Después

---

## 5. DIP — Dependency Inversion Principle

### Antes

**Archivo:** `src/05-dip/post-service.ts`

`PostService` instancia directamente `new LocalDatabaseService()` dentro de su método `getPosts()`. El módulo de alto nivel queda acoplado a la implementación concreta de bajo nivel: no existe ninguna abstracción (interfaz) entre ambos. Cambiar el proveedor de datos por `JsonDatabaseService` —o por cualquier otro— exige modificar `PostService`, lo que va en contra del principio que indica que los módulos deben depender de abstracciones y no de concreciones.

### Después
