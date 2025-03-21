const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

var formatadorMoeda = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
});

const swalWithBootstrapButtons = Swal.mixin({
                  customClass: {
                    confirmButton: "btn btn-success mx-1",
                    cancelButton: "btn btn-danger mx-1"
                  },
                  buttonsStyling: false
});

var nomeProduto = '';
var precoFormatado = formatadorMoeda.format(0.00);
var precoTotalFormatado = formatadorMoeda.format(0.00);
var estoqueFornecedor = 0;
var quantidadeComprar = 0;
var preco = 0.0;
var precoTotal = 0.0;
var produtoId = 0;
var produtoCodBarras = 0;

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
    var selectedOption = $('#selectFornecedor').find(':selected');

    var idFornecedor = selectedOption.val();

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

$(document).on('change', '#selectProduto', function() {
    var selectedOption = $(this).find(':selected');

    nomeProduto = selectedOption.text();
    $('#produto').text(nomeProduto);

    preco = parseFloat(selectedOption.attr('data-preco'));

    precoFormatado = formatadorMoeda.format(preco);

    estoqueFornecedor = selectedOption.attr('data-quantidade');

    console.log(nomeProduto, preco, estoqueFornecedor);

    $('#preco').text(precoFormatado);
    $('#estoqueFornecedor').text(estoqueFornecedor + ' Unidades');
});

$(document).on('input', '#quantidade', function() {
    var valor = parseFloat($(this).val()) || 0; // Converte para número ou assume 0
    valor = valor < 0 ? 0 : valor; // Garante que não seja menor que 0
    $(this).val(valor); // Atualiza o valor do input

    precoTotal = (preco * parseFloat($(this).val()));

    precoTotalFormatado = formatadorMoeda.format(precoTotal);

    $('#precoTotal').text(precoTotalFormatado);
});

$('#btnAvancarCompra').on('click',  function() {
    var fornecedorId = +$('#selectFornecedor').find(':selected').val();
    produtoId = +$('#selectProduto').find(':selected').val();
    produtoCodBarras = $('#selectProduto').find(':selected').attr('data-cod');
    console.log('Cod barras: ' + produtoCodBarras);
    quantidadeComprar = +$('#quantidade').val();

    if(fornecedorId <= 0 || produtoId <= 0){
        Swal.fire({
            icon: "error",
            title: "Selecione um fornecedor ou produto válido.",
            showCloseButton: true,
            showConfirmButton: false
        });
    } else {
        if(quantidadeComprar < 1 || quantidadeComprar == null){
                quantidadeComprar = 1;
        }

        $('#qtdTotal').text(quantidadeComprar);
        $('#quantidade').val(quantidadeComprar);
        $('#modalComprarProdutos').modal('hide');
        $('#modalFinalizarCompra').modal('show');
    }
});

$(document).on('click', '#btnAddFilial', function() {
    var filialEscolhida = $('#selectHoteis').find(':selected').val();
    if(filialEscolhida == 0){
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Escolha uma ou mais filiais para distribuir a compra",
            showConfirmButton: false,
            timer: 3500
        });
    } else {
        $.ajax({
                url: '/addFilial',
                method: 'POST',
                data:{
                    id: filialEscolhida
                },
                success: function(response){
                    $('#divFiliais').append(response);
                },
                error: function(){}
            });
    }
});

$(document).on('click', '.btnRemoverFilial', function(){
    $(this).closest('.row').remove(); // Remove a linha (filial) inteira
});

$(document).ready(function() {
    $(document).on('input', '.inputQuantidadeAlocada', function() {
        var valor = +$(this).val();

        if(quantidadeComprar - valor < 0){
            $(this).val(quantidadeComprar);
        }
    });

    $(document).on('change', '.inputQuantidadeAlocada', function() {
        var qtdAlocada = +$(this).val();

        if(quantidadeComprar - qtdAlocada < 0){
            $(this).val(quantidadeComprar);
        }
    });

    $(document).on('click', '#btnFinalizarCompra', function() {
        var div = $('#divFiliais');
        if(div.length){
            if(div.html().trim() !== '') {
                var inputVal = 0;
                var total = 0;
                $('.filial').each(function(){
                    inputVal = +$(this).find('.inputQuantidadeAlocada').val();
                    total += inputVal;
                });
                if(quantidadeComprar - total < 0){
                    Swal.fire({
                                icon: "error",
                                title: "Certifique-se de que a quantidade alocada para cada filial está dentro da quantidade da compra!",
                                showCloseButton: true,
                                showConfirmButton: false
                            });
                } else if (total == 0) {
                    swalWithBootstrapButtons.fire({
                                      title: "Cuidado!",
                                      text: "Nenhum valor foi atribuido às filiais escolhidas, a compra sera destinada ao estoque, tem certeza?",
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonText: "Sim, finalizar compra.",
                                      cancelButtonText: "Não, voltar para a compra.",
                                      reverseButtons: true
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        $('#modalFinalizarCompra').modal('hide');
                                        Swal.fire({
                                            icon: "success",
                                            title: "Compra realizada com sucesso!",
                                            showConfirmButton: false,
                                            timer: 3000
                                        });
                                      } else if (
                                        /* Read more about handling dismissals below */
                                        result.dismiss === Swal.DismissReason.cancel
                                      ) {

                                      }
                                    });
                } else {
                    var idsFiliais = [];
                    var idFilial = 0;
                    var quantidadesFiliais = [];
                    var quantidadeFilial = 0;
                    $('.filial').each(function(){
                        idFilial = +$(this).find('.nomeFilial').attr('data-id');
                        idsFiliais.push(idFilial);
                        quantidadeFilial = +$(this).find('.inputQuantidadeAlocada').val();
                        quantidadesFiliais.push(quantidadeFilial);
                    });
                    $.ajax({
                        url: '/salvarCompras',
                        method: 'POST',
                        data: {
                            ids: idsFiliais,
                            quantidadeComprada: quantidadesFiliais,
                            produto: nomeProduto,
                            codBarras: produtoCodBarras
                        },
                        success: function(response){
                            if(response){
                                $('#modalFinalizarCompra').modal('hide');
                                Swal.fire({
                                    icon: "success",
                                    title: "Compra realizada com sucesso!",
                                    showConfirmButton: false,
                                    timer: 3000
                                });
                            } else {
                                Swal.fire({
                                                                    icon: "error",
                                                                    title: "Erro ao realizar a compra!",
                                                                    showConfirmButton: false,
                                                                    timer: 3000
                                                                });
                            }
                        },
                        error: function() {

                        }
                    });
                }
            } else {
                swalWithBootstrapButtons.fire({
                  title: "Cuidado!",
                  text: "Nenhuma filial foi selecionada, toda a compra sera destinada ao estoque, tem certeza?",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Sim, finalizar compra.",
                  cancelButtonText: "Não, voltar para a compra.",
                  reverseButtons: true
                }).then((result) => {
                  if (result.isConfirmed) {
                    $('#modalFinalizarCompra').modal('hide');
                    Swal.fire({
                        icon: "success",
                        title: "Compra realizada com sucesso!",
                        showConfirmButton: false,
                        timer: 3000
                    });
                  } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                  ) {}
                });
            }
        }
    });
});

