package com.api.estoque.controller;

import com.api.estoque.model.M_Estoque;
import com.api.estoque.service.S_Estoque;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.net.ConnectException;
import java.util.List;

@Controller
public class C_Estoque {
    private final S_Estoque s_estoque;

    public C_Estoque(S_Estoque s_estoque) {
        this.s_estoque = s_estoque;
    }

    @GetMapping("/")
    public String getIndex(Model model){
        model.addAttribute("hoteis", s_estoque.acharHoteisCadastrados());
        return "index";
    }

    @GetMapping("/{dataIso}")
    public String getEstoque(@PathVariable("dataIso") String data,
                             @RequestParam("url") String url,
                             Model model){
        try {
            List<M_Estoque> estoque = s_estoque.acharEstoqueApi(data, url);
            model.addAttribute("estoque", estoque);
            return "pv/itemsEstoque";
        }catch (ConnectException connectException){
            return "null";
        }
    }
}
