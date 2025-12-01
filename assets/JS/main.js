
$(document).ready(function(){

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

    $('.add-to-cart-btn').on('click', function(e) {
        e.preventDefault();
        var productId = $(this).data('product-id');
        var productPrice = $(this).data('product-price');
        var productName = $(this).siblings('h3.h5').text();

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
        alert(productName + "Añadido al carrito");
    });

    updateCartCounter();

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

    //ancla al inicio
    $('#scrollToTop').on('click',function(event){
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });

    //boton volver
    $('#backButton').on('click', function(event) {
        event.preventDefault();
        window.history.back();
    });
});