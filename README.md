# Bitácora de Reflexión - Frederick Tipán

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

**Archivo:** `src/03-lsp/vehicle-manager.ts`

Se definió la interfaz `Vehicle` con dos características: el atributo `model` y el método `getDetails()`. Cada marca implementa ese contrato devolviendo su propio mensaje desde `getDetails()`, sin que ningún código externo necesite saber de qué clase concreta se trata.

`VehicleManager.printVehicleDetails` ahora acepta un array de la abstracción de vehículo con `Vehicle[]`. Con esto simplemente se llama a `vehicle.getDetails()` en cada elemento para mostrar el mensaje correspondiente como antes. Cualquier clase que implemente `Vehicle` puede sustituir a cualquier otra sin modificar el manager.

### Reflexión

**Si la reserva adquiere un "Dron", ¿podría tu manager procesarlo sin añadir nuevos *if/else*?**

Gracias a la abstracción común mediante `Vehicle` es posible agregar cuantos más tipos de vehículos se necesite siempre y cuando se siga la misma interfaz. A la final `VehicleManager` hace uso de la implementación elaborada por cada vehículo sin necesidad de que sepa explícitamente de cuál vehículo se trata.

En este caso se podría especificar el método de `getDetails()` en la clase `Dron` siguiendo el formato de los otros vehículos: mencionar su modelo y luego una característica representativa del dron dentro del mensaje.

---

## 4. ISP — Interface Segregation Principle

### Antes

**Archivo:** `src/04-isp/bird-catalog.ts`

La interfaz `Bird` obliga a todas las aves a implementar `eat()`, `fly()` y `swim()`, sin importar sus capacidades reales. `Hummingbird` lanza una excepción en `swim()` porque los colibríes no nadan, y `Ostrich` lanza una excepción en `fly()` porque los avestruces no vuelan. Las clases se ven forzadas a depender de métodos que no pueden ni deben usar, en lugar de componerse únicamente de las interfaces que les corresponden.

### Después

**Archivo:** `src/04-isp/bird-catalog.ts`

La interfaz `Bird` se segregó en tres contratos independientes: `Eater`, `Flyer` y `Swimmer`. Cada ave implementa únicamente las capacidades que le corresponden:

- `Toucan` y `Hummingbird` implementan `Eater` + `Flyer` — comen y vuelan.
- `Ostrich` implementa `Eater` + `Swimmer` — come y nada, pero nunca declara `fly()`.

Ninguna clase depende de métodos que no puede o no debe ejecutar.

### Reflexión

**¿Cómo evita tu diseño que un "Pingüino" tenga un método fly() que lance errores?**

Dado que se tienen varias clases con una capacidad específica, el pingüino solo implementaría las clases que tendría sentido, en este caso: `Eater` + `Swimmer`. Al nunca haberle indicado que puede implementar la capcidad de volar, el método `fly()` no puede mandar errores porque en ningún momento fue necesario especificarlo de manera explícita.

Esto evita confusión por parte del desarrollador, puesto que no tiene que estar agregando comportamientos inconsistentes entre distintas clases solo por tener que mantener un contrato rígido con una interfaz. 

---

## 5. DIP — Dependency Inversion Principle

### Antes

**Archivo:** `src/05-dip/post-service.ts`

`PostService` instancia directamente `new LocalDatabaseService()` dentro de su método `getPosts()`. El módulo de alto nivel queda acoplado a la implementación concreta de bajo nivel: no existe ninguna abstracción (interfaz) entre ambos. Cambiar el proveedor de datos por `JsonDatabaseService` —o por cualquier otro— exige modificar `PostService`, lo que va en contra del principio que indica que los módulos deben depender de abstracciones y no de concreciones.

### Después

**Archivos:** `src/data/local-database.ts`, `src/05-dip/post-service.ts`

Se definió la interfaz `DatabaseProvider` con el método `getFakePosts()`. Tanto `LocalDatabaseService` como `JsonDatabaseService` la implementan, con lo que ambas quedan intercambiables desde el punto de vista de `PostService`.

`PostService` recibe un `DatabaseProvider` por constructor y nunca menciona ninguna implementación concreta. El módulo de alto nivel depende únicamente de la abstracción; los módulos de bajo nivel dependen de ella también. Cambiar de proveedor solo requiere de pasar una instancia distinta al constructor, sin tocar directamente el servicio.

### Reflexión

**¿Qué tan fácil es inyectar un "MockDatabase" para pruebas unitarias ahora?**

Basta con crear una clase `MockDatabase` que implemente `DatabaseProvider` y devuelva datos controlados por la interfaz del modelo de tipo `Post`. Esto ayuda a mantener consistencia en cuanto al tipo de salida que se devolvería sin que el proveedor sea trivial. Así solo se instanciaría `new PostService(new MockDatabase())` en el test, sin ningún cambio en `PostService`.

Antes era imposible sin editar el propio servicio, ya que la dependencia estaba instanciada dentro del método. Con DIP, el servicio queda completamente aislado de sus proveedores, lo que hace que las pruebas sean predecibles, rápidas y sin efectos secundarios.