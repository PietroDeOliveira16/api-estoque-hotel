package com.api.estoque.controller;

import com.api.estoque.model.M_Estoque;
import com.api.estoque.service.S_Estoque;
import com.api.estoque.service.S_Fornecedor;
import com.api.estoque.service.S_Hotel;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.net.ConnectException;
import java.util.List;

@Controller
public class C_Estoque {
    private final S_Estoque s_estoque;
    private final S_Hotel s_hotel;
    private final S_Fornecedor s_fornecedor;

    public C_Estoque(S_Estoque s_estoque, S_Hotel s_hotel, S_Fornecedor s_fornecedor) {
        this.s_estoque = s_estoque;
        this.s_hotel = s_hotel;
        this.s_fornecedor = s_fornecedor;
    }

    @GetMapping("/")
    public String getIndex(Model model){
        model.addAttribute("hoteis", s_hotel.acharHoteisCadastrados());
        model.addAttribute("fornecedores", s_fornecedor.acharFornecedores());
        return "index";
    }

    @PostMapping("/acharProdutosDoFornecedor")
    public String postProdutosDoFornecedor(Model model, @RequestParam("id") Long id){
        model.addAttribute("fornecedorProduto", s_fornecedor.acharProdutosDoFornecedor(id));
        return "pv/selecaoProdutos";
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
