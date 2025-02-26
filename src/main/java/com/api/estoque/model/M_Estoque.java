package com.api.estoque.model;

import java.math.BigDecimal;
import java.time.LocalDate;

public class M_Estoque {
    private String produto;
    private Long quantidade;
    private int min;
    private int max;
    private BigDecimal custoMedio;
    private LocalDate ultimaCompra;

    public String getProduto() {
        return produto;
    }

    public void setProduto(String produto) {
        this.produto = produto;
    }

    public Long getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Long quantidade) {
        this.quantidade = quantidade;
    }

    public int getMin() {
        return min;
    }

    public void setMin(int min) {
        this.min = min;
    }

    public int getMax() {
        return max;
    }

    public void setMax(int max) {
        this.max = max;
    }

    public BigDecimal getCustoMedio() {
        return custoMedio;
    }

    public void setCustoMedio(BigDecimal custoMedio) {
        this.custoMedio = custoMedio;
    }

    public LocalDate getUltimaCompra() {
        return ultimaCompra;
    }

    public void setUltimaCompra(LocalDate ultimaCompra) {
        this.ultimaCompra = ultimaCompra;
    }
}
