package com.api.estoque.controller;

import com.api.estoque.model.M_Hotel;
import com.api.estoque.service.S_Hotel;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class C_Hotel {
    private final S_Hotel s_hotel;

    public C_Hotel(S_Hotel s_hotel) {
        this.s_hotel = s_hotel;
    }

    @PostMapping("/cadastrarHotel")
    @ResponseBody
    public boolean postCadastrarHotel(@RequestParam("nome") String nome,
                                      @RequestParam("url") String url){
        return s_hotel.cadastrarHotel(nome, url) != null;
    }

    @PostMapping("/editarHotel")
    @ResponseBody
    public boolean postEditarHotel(@RequestParam("newNome") String nome,
                                   @RequestParam("newUrl") String url,
                                   @RequestParam("id") Long id){
        return s_hotel.editarHotel(nome, url, id);
    }

    @PostMapping("/addFilial")
    public String postAddFilial(@RequestParam("id") Long id, Model model){
        model.addAttribute("hotel", s_hotel.getHotel(id));
        return "pv/filiais";
    }
}
