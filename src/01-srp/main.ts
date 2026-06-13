import { ProductBloc, ProductService, NotificationService } from './product-bloc';

const productService = new ProductService();
const notificationService = new NotificationService();
const bloc = new ProductBloc(productService, notificationService);

bloc.saveProduct({ id: 1, name: 'Camiseta de TDG' });
bloc.saveProduct({ id: 2, name: 'El Cónde de Montecristo' });

const found = bloc.loadProduct(1);
console.log('Producto encontrado:', found);

bloc.notifyCustomer('frederick@tipan.com', `Tu producto "${found?.name}" está listo para retirar.`);
