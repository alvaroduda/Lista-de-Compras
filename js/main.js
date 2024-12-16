let btnAdicionar = document.getElementById("btnAdicionar");
let btnLimpar = document.getElementById("btnLimpar");

let txtNome = document.getElementById("Nome");
let txtQuantidade = document.getElementById("Quantidade");

let alertValidacoes = document.getElementById("alertValidacoes");
let alertValidacoesTexto = document.getElementById("alertValidacoesTexto");

let data = document.getElementById("data");

let contadorProdutos = document.getElementById("contadorProdutos");
let produtosTotal = document.getElementById("produtosTotal");
let precoTotal = document.getElementById("precoTotal");

let tabelaListaCompras = document.getElementById("tabelaListaCompras");
let corpoTabela = tabelaListaCompras.getElementsByTagName("tbody").item(0);

let isValid = true;
let preco;
let contador = 0;
let custoTotal = 0;
let totalEmProdutos = 0;

let dados = new Array();

function validarQuantidade(){
    if(txtQuantidade.value.length==0){
        return false;
    }
    if (isNaN(txtQuantidade.value)){
        return false;
    }
    if(Number(txtQuantidade.value)<=0 ){
        return false;
    }
    return true;
}

function getPreco(){
    return Math.floor((Math.random()*10000))/100;
}

btnAdicionar.addEventListener("click", function(event){
    event.preventDefault();
    alertValidacoesTexto.innerHTML="";
    alertValidacoes.style.display="none";
    txtNome.style.border="";
    txtQuantidade.style.border="";
    isValid=true;
    if (txtNome.value.length<3){
        alertValidacoesTexto.innerHTML="O <strong>Nome</strong> não é correto<br/>";
        alertValidacoes.style.display="block";
        txtNome.style.border="solid red medium";
        isValid=false;
    }
    if(! validarQuantidade()){
        alertValidacoesTexto.innerHTML+="A <strong>Quantidade</strong> não é correta";
        alertValidacoes.style.display="block";
        txtQuantidade.style.border="solid red medium";
        isValid=false;
    }

    if (isValid) {
        contador++;
        preco = getPreco();
        let row = `<tr>
            <td>${contador}</td>
            <td>${txtNome.value}</td>
            <td>${txtQuantidade.value}</td>
            <td>${preco}</td>
        </tr>`;

        let elemento = `{"id": ${contador},
                         "nome": "${txtNome.value}",
                         "quantidade": "${txtQuantidade.value}",
                         "preco": ${preco}
        }`;
        dados.push(JSON.parse(elemento));
        localStorage.setItem("dados", JSON.stringify(dados));
        corpoTabela.insertAdjacentHTML("beforeend", row);
        contadorProdutos.innerText= contador;
        totalEmProdutos += parseFloat(txtQuantidade.value);
        custoTotal += preco * parseFloat(txtQuantidade.value);
        produtosTotal.innerText=totalEmProdutos;
        precoTotal.innerText=`R$ ${custoTotal.toFixed(2)}`;
        localStorage.setItem("contador", contador);
        localStorage.setItem("totalEmProdutos",totalEmProdutos);
        localStorage.setItem("custoTotal", custoTotal);
        txtNome.value="";
        txtQuantidade.value="";
        txtNome.focus();
    }
});

btnLimpar.addEventListener("click", function(event){
    event.preventDefault();
    txtNome.value = "";
    txtQuantidade.value = "";
    alertValidacoesTexto.innerHTML="";
    alertValidacoes.style.display="none";
    txtNome.style.border="";
    txtQuantidade.style.border="";
    corpoTabela.innerHTML="";
    contador = 0;
    totalEmProdutos = 0; 
    custoTotal = 0;
    localStorage.setItem("contador", contador);
    localStorage.setItem("totalEmProdutos", totalEmProdutos);
    localStorage.setItem("custoTotal", custoTotal);
    dados = new Array();
    localStorage.removeItem("dados");
    contadorProdutos.innerText=contador;
    produtosTotal.innerText=totalEmProdutos;
    precoTotal.innerText=`R$ ${custoTotal.toFixed(2)}`;
});

window.addEventListener("load", function(event){
    event.preventDefault();
    if (this.localStorage.getItem("contador")!=null){
        contador=Number(this.localStorage.getItem("contador"));
    }
    if (this.localStorage.getItem("totalEmProdutos")!=null){
        totalEmProdutos=Number(this.localStorage.getItem("totalEmProdutos"));
    }
    if (this.localStorage.getItem("custoTotal")!=null){
        custoTotal=Number(this.localStorage.getItem("custoTotal"));
    }
    if (this.localStorage.getItem("dados")!=null){
        dados = JSON.parse(this.localStorage.getItem("dados"));
        dados.forEach((r) => {
            let row = `<tr>
            <td>${r.id}</td>
            <td>${r.nome}</td>
            <td>${r.quantidade}</td>
            <td>${r.preco}</td>
        </tr>`;
            corpoTabela.insertAdjacentHTML("beforeend", row);
        });   
    }
    contadorProdutos.innerText=contador;
    produtosTotal.innerText=totalEmProdutos;
    precoTotal.innerText=`R$ ${custoTotal.toFixed(2)}`;

    let agora = new Date();
    data.innerText=agora.getFullYear();
});