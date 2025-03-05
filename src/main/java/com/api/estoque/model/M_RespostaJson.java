package com.api.estoque.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;
import java.time.LocalDate;

public class M_RespostaJson {
    @JsonProperty("produto")
    private String produto;

    @JsonProperty("quantidade")
    private Long quantidade;

    @JsonProperty("min")
    private int min;

    @JsonProperty("max")
    private int max;

    @JsonProperty("custo_medio")
    private BigDecimal custoMedio;

    @JsonProperty("ultima_compra")
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
