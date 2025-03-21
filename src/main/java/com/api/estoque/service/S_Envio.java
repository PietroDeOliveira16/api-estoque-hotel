package com.api.estoque.service;

import com.api.estoque.model.M_Compra;
import com.api.estoque.model.M_CompraEnvioApi;
import com.api.estoque.repository.R_Compra;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class S_Envio {
    @Autowired
    private R_Compra r_compra;

    public List<M_Compra> enviarCompras(Long[] ids, int[] quantidades, String produto, String codBarras){
        List<M_Compra> compras = new ArrayList<>();
        for(int x = 0; x < ids.length; x++){
            M_Compra m_compra = new M_Compra();
            m_compra.setId_hotel(ids[x]);
            m_compra.setQuantidade(quantidades[x]);
            m_compra.setNomeProduto(produto);
            m_compra.setDataCompra(LocalDateTime.now());
            m_compra.setCodBarras(codBarras);
            compras.add(m_compra);
        }

        return r_compra.saveAll(compras);
    }

    public List<M_CompraEnvioApi> recuperarComprasId(Long id){
        return r_compra.findAllComprasByIdHotel(id);
    }
}
