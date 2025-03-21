package com.api.estoque.controller;

import com.api.estoque.service.S_Envio;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class C_Compra {
    private final S_Envio s_envio;

    public C_Compra(S_Envio s_envio) {
        this.s_envio = s_envio;
    }

    @PostMapping("/salvarCompras")
    @ResponseBody
    public boolean postEnviarCompraApi(@RequestParam("ids") Long[] ids, @RequestParam("quantidadeComprada") int[] quantidades,
                                       @RequestParam("produto") String nomeProduto, @RequestParam("codBarras") String codBarras){
        return s_envio.enviarCompras(ids, quantidades, nomeProduto, codBarras) != null;
    }
}
