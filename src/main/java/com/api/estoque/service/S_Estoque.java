package com.api.estoque.service;

import com.api.estoque.model.M_Estoque;
import com.api.estoque.model.M_Hotel;
import com.api.estoque.model.M_RespostaJson;
import com.api.estoque.repository.R_Hotel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class S_Estoque {
    @Autowired
    private R_Hotel r_hotel;

    public List<M_Estoque> acharEstoqueApi(String data, String url){
        RestTemplate rt = new RestTemplate();
        List<M_Estoque> estoque = new ArrayList<>();
        ResponseEntity<List<M_RespostaJson>> response = rt.exchange(
                url + data,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<M_RespostaJson>>() {}
        );
        for (M_RespostaJson produtoJson : response.getBody()){
            M_Estoque m_estoque = new M_Estoque();
            m_estoque.setProduto(produtoJson.getProduto());
            m_estoque.setQuantidade(produtoJson.getQuantidade());
            m_estoque.setMin(produtoJson.getMin());
            m_estoque.setMax(produtoJson.getMax());
            m_estoque.setCustoMedio(produtoJson.getCustoMedio());
            m_estoque.setUltimaCompra(produtoJson.getUltimaCompra());
            estoque.add(m_estoque);
        }

        return estoque;
    }

    public M_Hotel cadastrarHotel(String nome, String url){
        M_Hotel m_hotel = new M_Hotel();
        boolean podeCadastrar = !nome.isBlank() && !url.isBlank();

        if(podeCadastrar){
            m_hotel.setNome(nome);
            m_hotel.setUrl(url);
            return r_hotel.save(m_hotel);
        } else {
            return null;
        }
    }

    public List<M_Hotel> acharHoteisCadastrados(){
        return r_hotel.findAll();
    }
}
