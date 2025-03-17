package com.api.estoque.service;

import com.api.estoque.model.M_Fornecedor;
import com.api.estoque.model.M_FornecedorProduto;
import com.api.estoque.repository.R_Fornecedor;
import com.api.estoque.repository.R_FornecedorProduto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class S_Fornecedor {
    @Autowired
    private R_Fornecedor r_fornecedor;
    @Autowired
    private R_FornecedorProduto r_fornecedorProduto;

    public List<M_Fornecedor> acharFornecedores(){
        return r_fornecedor.findAll(Sort.by(Sort.Order.by("id")));
    }

    public List<M_FornecedorProduto> acharProdutosDoFornecedor(Long id){
        return r_fornecedorProduto.findProdutosOfFornecedor(id);
    }
}
