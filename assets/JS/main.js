
$(document).ready(function(){
//PRINCIPAL
    // filtro sacado de google ia
    $('.nav-filtro-btn').on('click', function(event){
        event.preventDefault();
        //categoria del enlace
        var filtro = $(this).data('filter')
        //oculta tarjetas
        $('.producto-item').addClass('d-none');
        //muestra tarjetas filtradas
        if (filtro === 'todos') {
            $('.producto-item').removeClass('d-none')
        } else {
            // selecciona elementos con la data.categoria
            $('.producto-item[data-categoria*="' + filtro + '"]').removeClass('d-none')
        }
        //resalta enlace activo
        $('.nav-filtro-btn').removeClass('active');
        $(this).addClass('active')
    });

//GENERAL
    //cargar navbar y footer con IA en las paginas de productos
    /*async function cargarCompone() {
        try {
            const resNav = await fetch("../../interfaz_principal/includes/navbar_productos.html");
            const navHtml = await resNav.text();
            $("#nav-placeholder").html(navHtml);
            
            const resFooter = await fetch("../../interfaz_principal/includes/footer_productos.html");
            const footerHtml = await resFooter.text();
            $("#footer-placeholder").html(footerHtml);
        } catch (error) {
            console.error("Error cargando compoentes:", error);
        }
    }

    cargarCompone();*/

    //ancla al inicio
    $(document).on('click','#scrollToTop',function(event){
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 200);
    });

    //boton volver
    $(document).on('click','#backButton',function(event) {
        event.preventDefault();
        window.history.back();
    });

//CARRITO
    // agregar al carrito
    var cart = JSON.parse(localStorage.getItem('shoppingCart')) || {};
    
    function updateCartCounter() {
        var totalItems = 0;
        for (var id in cart) {
            totalItems += cart[id].quantity;
        }
        $('#cart-counter').text(totalItems)
    }

    function saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

        //visualizar carrito
    function displayCart() {
        var container = $('#cart-details-container');
        var totalAmount = 0;

        //si esta vacio
        if (Object.keys(cart).length === 0) {
            container.html('<p class="alert ">El carrito está vacío</p>');
            $('#cart-summary').hide();
            return;
        }

        //si hay productos que mostrar
        var tableHtml = '<table class="table table-striped"><thead><tr><th>Item</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th></tr></thead><tbody>';
    
        for (var productId in cart) {
            var product = cart[productId];
            var subtotal = product.price * product.quantity;
            totalAmount += subtotal;
            tableHtml += '<tr><td>' + product.name + '</td><td>$' + product.price + '</td><td>' + product.quantity + '</td><td>$' + subtotal + '</td></tr>';
        }

        tableHtml += '</tbody></table>';
        container.html(tableHtml);
        $('#cart-summary').show();
        $('#cart-total').text('Total: $' + totalAmount);
    }

//agregar carrito btn
    $('.add-to-cart-btn').on('click', function(e) {
        e.preventDefault();
        
        var productId = $(this).data('product-id');
        var productPrice = $(this).data('product-price');
        var productName = $(this).data('product-name');

        if (cart[productId]) {
            cart[productId].quantity++;
        } else {
            cart[productId] = {
                name: productName,
                price: productPrice,
                quantity: 1
            };
        }
        saveCart();
        updateCartCounter();
        alert( '"' + productName + '" añadido al carrito.');
    });

    updateCartCounter();

    //vaciar carrito
    $('#clear-cart-btn').on('click', function(){
        localStorage.removeItem('shoppingCart');
        cart = {};
        displayCart();
        updateCartCounter();
    });
    //solo muestra carrito si se esta en pagina carrito
    if ($('#cart-details-container').length) {
        displayCart();
    }

    //finalizar compra
    $('#finalize-purchase-btn').on('click', function() {
        $('#cart-details-container').html(
            '<div class="alert alert-info" role="alert">' +
            '<strong>¡Buuu, no funcionó!</strong>' +
            '</div>'
        );
        $('#cart-summary').hide();

        //duracion alert
        localStorage.removeItem('shoppingCart');
        cart = {};
        updateCartCounter();
        setTimeout(function() {
            displayCart();
        }, 2000);

        $('html, body').animate({
            scrollTop: $('#cart-details-container').offset().top - 20
        }, 800)
    });

});



