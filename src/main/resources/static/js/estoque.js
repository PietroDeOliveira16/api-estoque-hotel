const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

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

$('#selectHotelEdit').on('change', function() {
    $('#urlApiEdit').val($('#selectHotelEdit').find(":selected").attr("data-url"));
    $('#nomeHotelEdit').val($('#selectHotelEdit').find(":selected").text());
});

$('#btnCadastrarHotel').on('click', function() {
    var nome = $('#nomeHotel').val();
    var url = $('#urlApi').val();

    $.ajax({
        url: '/cadastrarHotel',
        method: 'POST',
        data: {
            nome: nome,
            url: url
        },
        success: function(response){
            if(response){
                $('#modalCadastrarHotel').modal('hide');
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Hotel cadastrado com sucesso!",
                  showConfirmButton: false,
                  timer: 3000
                });
                $('#divSelect').load(location.href + " #divSelect");
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Erro ao cadastrar hotel :(",
                    showConfirmButton: false,
                    timer: 3000
                });
            }
        },
        error: function(){}
    });
});

$('#btnEditarHotel').on('click', function() {
    var nome = $('#nomeHotelEdit').val();
    var id = $('#selectHotelEdit').find(":selected").val();
    var url = $('#urlApiEdit').val();

    $.ajax({
        url: '/editarHotel',
        method: 'POST',
        data: {
           newNome: nome,
           newUrl: url,
           id: id
        },
        success: function(response){
            if(response){
                $('#modalEditarHotel').modal('hide');
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Hotel editado com sucesso!",
                    showConfirmButton: false,
                    timer: 3000
                });
                $('#divSelect').load(location.href + " #divSelect");
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Erro ao editar hotel :(",
                    showConfirmButton: false,
                    timer: 3000
                });
            }
        },
        error: function(){}
    });
});

$('#selectFornecedor').on('change', function() {
    var idFornecedor = $('#selectFornecedor').find(':selected').val();

    $.ajax({
        url: '/acharProdutosDoFornecedor',
        method: 'POST',
        data: {
            id: idFornecedor
        },
        success: function(response){
            if(response){
                $('#divSelecaoProdutos').empty().append(response);
            }
        },
        error: function(){}
    });
});

$('#selectProduto').on('change', function() {
    var nomeProduto = $('#selectProduto').find(':selected').text();
    console.log(nomeProduto);
    var preco = $('#selectProduto').find(':selected').attr('data-preco');
    console.log(preco);
    var quantidade = $('#selectProduto').find(':selected').attr('data-quantidade');
    console.log(quantidade);

    $('#preco').text('1');
});