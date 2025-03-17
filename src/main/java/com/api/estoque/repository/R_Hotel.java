package com.api.estoque.repository;

import com.api.estoque.model.M_Hotel;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface R_Hotel extends JpaRepository<M_Hotel, Long> {
    @Transactional
    @Modifying
    @Query(value = "update api_estoque.hotel " +
            "set nome = :newNome, url = :newUrl " +
            "where id = :id;", nativeQuery = true)
    void editarHotel(@Param("newNome") String nome, @Param("newUrl") String url, @Param("id") Long id);
}
