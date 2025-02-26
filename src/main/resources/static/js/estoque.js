$('#btnData').on('click', function () {
    var data = $('#data').val();

    $.ajax({
        url: '/' + data,
        method: 'get',
        success: function(response){
            var dataToDate = new Date(data + 'T00:00:00'); // T00:00:00 faz o Date converter a string considerando o fuso local
            $('#dataTexto').text('' + dataToDate.toLocaleDateString('pt-BR'));
            $('#estoque').empty().append(response);
        },
        error: function(){

        }
    });
});
