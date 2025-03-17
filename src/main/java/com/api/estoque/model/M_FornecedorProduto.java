package com.api.estoque.model;

import jakarta.persistence.*;

@Entity
@Table(name = "fornecedor_produto", schema = "api_estoque")
public class M_FornecedorProduto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_fornecedor", nullable = false)
    private M_Fornecedor fornecedor;

    @ManyToOne
    @JoinColumn(name = "id_produto", nullable = false)
    private M_Produto produto;

    private Long quantidadeEstoque;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public M_Fornecedor getFornecedor() {
        return fornecedor;
    }

    public void setFornecedor(M_Fornecedor fornecedor) {
        this.fornecedor = fornecedor;
    }

    public M_Produto getProduto() {
        return produto;
    }

    public void setProduto(M_Produto produto) {
        this.produto = produto;
    }

    public Long getQuantidadeEstoque() {
        return quantidadeEstoque;
    }

    public void setQuantidadeEstoque(Long quantidadeEstoque) {
        this.quantidadeEstoque = quantidadeEstoque;
    }
}
