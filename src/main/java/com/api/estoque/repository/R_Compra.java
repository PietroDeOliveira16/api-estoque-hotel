package com.api.estoque.repository;

import com.api.estoque.model.M_Compra;
import com.api.estoque.model.M_CompraEnvioApi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface R_Compra extends JpaRepository<M_Compra, Long> {
    @Query(value = "select nome_produto, quantidade, data_compra, cod_barras from api_estoque.compra where id_hotel = :id;", nativeQuery = true)
    List<M_CompraEnvioApi> findAllComprasByIdHotel(@Param("id") Long id);
}
