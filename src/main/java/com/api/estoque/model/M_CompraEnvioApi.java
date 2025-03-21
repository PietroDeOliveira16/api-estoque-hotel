package com.api.estoque.model;

import java.time.LocalDateTime;

public interface M_CompraEnvioApi {
    String getNome_produto();
    int getQuantidade();
    LocalDateTime getData_compra();
    String getCod_barras();
}
