package com.api.estoque.repository;

import com.api.estoque.model.M_Fornecedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface R_Fornecedor extends JpaRepository<M_Fornecedor, Long> {
}
