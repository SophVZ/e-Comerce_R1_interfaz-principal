
$(document).ready(function(){
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