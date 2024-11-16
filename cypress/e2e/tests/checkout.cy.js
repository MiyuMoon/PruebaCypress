//Prueba
import LoginPage from '../pages/01_loginPage';
import InventarioPage from '../pages/02_InventarioPage';
import CartPage from '../pages/03_CartPage';
import CheckoutPage from '../pages/04_yourinformationPage';
import OverviewPage from '../pages/05_OverviewPage';
import CheckoutFinishPage from '../pages/06_checkoutFinishPage';

describe('Prueba de Login usando POM', () => {
    beforeEach(function () {
        // Carga el fixture de datos de usuario
        cy.fixture('usuarios').as('usuariosData');
    });

    it('Realizar el checkout', function () {
        // Visita la página de login
        LoginPage.visit();

        // Usa datos del fixture para hacer login
        const usuario = this.usuariosData.usuario1;
        LoginPage.login(usuario.username, usuario.password)

        //LoginPage.enterUsername(usuario.username);
        //LoginPage.enterPassword(usuario.password);
        //LoginPage.clickLogin();

        // Verificación de la URL después del login
        cy.url().should('eq', 'https://www.saucedemo.com/v1/inventory.html');

        // Logout
        //InventarioPage.openMenu(); 
        //InventarioPage.clickLogout(); 

        //InventarioPage.logout();

        // Verificación de que el logout fue exitoso (regreso a la página de login)
        //cy.url().should('eq', 'https://www.saucedemo.com/v1/index.html');

        //Agregar items al carrito
        InventarioPage.addToCart1();
        InventarioPage.addToCart2();

        //Entrando al carrito
        InventarioPage.clickCart();

        // Verificación de la URL ddel carrito
        cy.url().should('eq', 'https://www.saucedemo.com/v1/cart.html');
        cy.screenshot();
        // Click en checkout
        CartPage.clickCheckout();

        //Verificando la URL del Checkout Paso 1
        cy.url().should('eq', 'https://www.saucedemo.com/v1/checkout-step-one.html');

        //Flujo Checkout
        CheckoutPage.ckinfo();
        cy.screenshot();
        CheckoutPage.ckcontinue();

        //Verificando la URL del Checkout Paso 2
        cy.url().should('eq', 'https://www.saucedemo.com/v1/checkout-step-two.html');
        cy.screenshot();
        //Finalizando flujo checkout
        OverviewPage.FinishCK2();

        //Verificando la URL del Checkout completo
        cy.url().should('eq', 'https://www.saucedemo.com/v1/checkout-complete.html');
        CheckoutFinishPage.verifycheckout();
        cy.screenshot();

        InventarioPage.logout();

    });
});

//Agregar un elemento al carrito de compras usando Page Object Model