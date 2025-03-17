package com.api.estoque.repository;

import com.api.estoque.model.M_FornecedorProduto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface R_FornecedorProduto extends JpaRepository<M_FornecedorProduto, Long> {
    @Query(value = "select * from api_estoque.fornecedor_produto where id = :id;", nativeQuery = true)
    List<M_FornecedorProduto> findProdutosOfFornecedor(@Param("id") Long id);
}
