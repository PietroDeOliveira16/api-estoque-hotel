package com.api.estoque.service;

import com.api.estoque.model.M_Hotel;
import com.api.estoque.repository.R_Hotel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class S_Hotel {
    @Autowired
    private R_Hotel r_hotel;

    public M_Hotel cadastrarHotel(String nome, String url) {
        M_Hotel m_hotel = new M_Hotel();
        boolean podeCadastrar = !nome.isBlank() && !url.isBlank();

        if (podeCadastrar) {
            m_hotel.setNome(nome);
            m_hotel.setUrl(url);
            return r_hotel.save(m_hotel);
        } else {
            return null;
        }
    }

    public boolean editarHotel(String nome, String url, Long id) {
        boolean podeEditar = !nome.isBlank() && !url.isBlank() && id > 0;

        if (podeEditar) {
            try{
                r_hotel.editarHotel(nome, url, id);
                return true;
            }catch (Exception e){
                return false;
            }
        } else {
            return false;
        }
    }

    public List<M_Hotel> getHoteisCadastrados() {
        return r_hotel.findAll(Sort.by(Sort.Order.by("id")));
    }

    public M_Hotel getHotel(Long id){
        return r_hotel.getReferenceById(id);
    }
}
