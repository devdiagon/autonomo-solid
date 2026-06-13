interface Product {
    id: number;
    name: string;
}

export class ProductService {

    private products: Product[] = [];

    loadProduct(id: number) {
        console.log(`Cargando producto con ID: ${id} desde el inventario del parque...`);
        return this.products.find(p => p.id === id);
    }

    saveProduct(product: Product) {
        console.log(`Guardando el producto ${product.name} en la base de datos de la reserva...`);
        this.products.push(product);
    }
}

export class NotificationService {

    notifyCustomer(email: string, message: string) {
        console.log(`[Mailer] Enviando correo a ${email}: ${message}`);
    }
}

export class ProductBloc {

    constructor(
        private productService: ProductService,
        private notificationService: NotificationService,
    ) {}

    loadProduct(id: number) {
        return this.productService.loadProduct(id);
    }

    saveProduct(product: Product) {
        this.productService.saveProduct(product);
    }

    notifyCustomer(email: string, message: string) {
        this.notificationService.notifyCustomer(email, message);
    }
}
