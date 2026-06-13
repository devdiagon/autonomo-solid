# Bitácora de Principios SOLID

## 1. SRP — Single Responsibility Principle

### Antes

**Archivo:** `src/01-srp/product-bloc.ts`

`ProductBloc` acumula tres responsabilidades distintas en una sola clase: cargar productos del inventario, persistirlos en base de datos y enviar notificaciones por correo. Esto significa que la clase tiene múltiples razones para cambiar: si la lógica de almacenamiento evoluciona, si cambia el proveedor de correo o si se modifica el modelo de negocio, todas esas modificaciones recaen sobre el mismo archivo. La clase mezcla lógica de negocio, persistencia e infraestructura sin separación alguna.

### Después

---

## 2. OCP — Open/Closed Principle

### Antes

**Archivo:** `src/02-ocp/news-service.ts`

`NewsService` y `PhotosService` tienen una dependencia directa y rígida de `axios` dentro de sus métodos. Ante cualquier cambio de cliente HTTP (migrar a `fetch`, a otro adaptador, o hacer un mock en pruebas) es obligatorio abrir y editar cada clase. El código no está cerrado para modificación: no existe ninguna abstracción que permita extender el comportamiento sin tocar el código ya existente.

### Después

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
