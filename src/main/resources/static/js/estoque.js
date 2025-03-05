$('#btnData').on('click', function () {
    var data = $('#data').val();

    var url = $('#selectHotel').find(":selected").val();

    if(data.trim().length === 0){
        $('#dataTexto').text('Data Inválida');
        $('#estoque').empty();
    } else if(url.trim().length === 0){
        $('#dataTexto').text('Url vazia');
        $('#estoque').empty();
    } else {
        $.ajax({
                url: '/' + data,
                method: 'get',
                data:{
                    url: url
                },
                success: function(response){
                    var dataToDate = new Date(data + 'T00:00:00'); // T00:00:00 faz o Date converter a string considerando o fuso local
                    $('#dataTexto').text('' + dataToDate.toLocaleDateString('pt-BR'));
                    $('#estoque').empty().append(response);
                },
                error: function(){

                }
            });
    }
});
