package com.api.estoque.rest;

import com.api.estoque.model.M_Compra;
import com.api.estoque.model.M_CompraEnvioApi;
import com.api.estoque.service.S_Envio;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class EnvioRestController {
    private final S_Envio s_envio;

    public EnvioRestController(S_Envio s_envio) {
        this.s_envio = s_envio;
    }

    @GetMapping("/minhasComprasRecebidas/{idHotel}")
    public List<M_CompraEnvioApi> restEnviarCompras(@PathVariable("idHotel") Long idHotel){
        return s_envio.recuperarComprasId(idHotel);
    }
}
