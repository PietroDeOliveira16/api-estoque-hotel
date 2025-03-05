$('#btnData').on('click', function () {
    var data = $('#data').val();
    console.log(data);

    var url = $('#selectHotel').find(":selected").val();
    console.log(url);

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
                    if(response == "null"){
                        Swal.fire({
                              icon: "error",
                              title: "Nenhum dado foi encontrado!",
                              text: "Nenhum estoque foi encontrado no hotel selecionado. A URL da API do hotel pode estar incorreta.",
                              footer: '<a href="#">Se o problema persistir, fale conosco</a>'
                            });
                    } else {
                        var dataToDate = new Date(data + 'T00:00:00'); // T00:00:00 faz o Date converter a string considerando o fuso local
                        $('#dataTexto').text('' + dataToDate.toLocaleDateString('pt-BR'));
                        $('#estoque').empty().append(response);
                    }
                },
                error: function(){

                }
            });
    }
});
