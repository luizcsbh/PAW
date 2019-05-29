// Exemplo de JavaScript inicial para desativar envios de formulário, se houver campos inválidos.
(function desativarEnvio() {
    'use strict';
    window.addEventListener('load', function() {
        // Pega todos os formulários que nós queremos aplicar estilos de validação Bootstrap personalizados.
        var forms = document.getElementsByClassName('needs-validation');
        // Faz um loop neles e evita o envio
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

function mostrarExtrato() {
    showExtratoTela();
    $('input').val("");

}

function salvar() {

    let data = $('#data'),
        codigo = $('#codigo'),
        descricao = $('#descricao'),
        valor = $('#valor');
       

        let linhasJson = getLinhasStorage();

        if(valor.val().includes(",")){
            valor.val(valor.val().replace(",", "."))
        }
        if(linhasJson) {
            for (let i = 0; i < linhasJson.length; i++) {

                if (linhasJson[i].codigo === codigo.val()) {
                    linhasJson[i].data = data.val();
                    linhasJson[i].valor = valor.val();
                    linhasJson[i].descricao = descricao.val();
                    updateStorageCompleto(linhasJson);
                    mostrarExtrato();
                    return
                }
            }
        }

        let linha = {
            data: data.val(),
            codigo: codigo.val(),
            descricao: descricao.val(),
            valor: valor.val()
        };
        inserStorage(linha);
        mostrarExtrato();

   
    codigo.prop('disabled', false);

}


function getElementErro(element) {
    let idElement = element.get(0).id;
    return $(document.getElementById(idElement + "Erro"));

}
function isVazio(element) {
    let error_element = getElementErro(element)
    if(element.val().trim() === ""){
        error_element.get(0).hidden = false;
        return true
    }
    error_element.get(0).hidden = true;
    return false;
}

function isNumero(element) {
    let error_element = getElementErro(element)
    if(element.val().isNaN){
        error_element.get(0).hidden = false;
        return true
    }
    error_element.get(0).hidden = true;
    return false;
}

function isZero(element) {
    let error_element = getElementErro(element)

    error_element.get(0).hidden = element.val() !== '0';

}
function inserStorage(linha) {
    let linhas = localStorage.getItem('linhas');
    let array = [];
    if(localStorage.getItem('linhas')){
        array = JSON.parse(linhas);
    }
    array.push(linha);
    linhas = JSON.stringify(array);
    localStorage.setItem('linhas', linhas)
}

function updateStorageCompleto(linha) {
    let str = JSON.stringify(linha);
    localStorage.setItem('linhas', str)
}

function getLinhasStorage() {
    let linhas = localStorage.getItem('linhas');
    if(linhas)
        return JSON.parse(linhas);

    return [];

}



function showExtratoTela() {
    let linhas = getLinhasStorage(),
        html = "",
        saldo = 0.0;
    linhas.forEach(function (linha){

        saldo += parseFloat(linha.valor);
        let colorValor = "positivo";
        if(parseFloat(linha.valor) < 0) {
            colorValor = "negativo";
        }

        let colorSaldo = "positivo";
        if(saldo < 0){
            colorSaldo = "negativo"
        }

        html += "<tr>" +
            "<td>" + linha.data +"</td>"
            + "<td>" + linha.codigo +"</td>"
            + "<td>" + linha.descricao + "</td>"
            + "<td class="+colorValor+">" + parseFloat(linha.valor).toFixed(2) + "</td>"
            + "<td class="+colorSaldo+">" + saldo.toFixed(2) + "</td>"
            + "<td><i onclick='updateExtrato("+linha.codigo+")' " +
            "class=\"far fa-edit\"></i> " +
            "<i onclick='deleteExtrato("+ linha.codigo+")' class=\"fas fa-trash\"></i></td>"
            + "</tr>"
    })
    $("table>tbody").html(html);
}

function updateExtrato(codigoInt) {
    let data = $('#data'),
        codigo = $('#codigo'),
        descricao = $('#descricao'),
        valor = $('#valor'),
        linhasJson = getLinhasStorage();

    if(linhasJson) {
        for (let i in linhasJson) {

            if (linhasJson[i].codigo === codigoInt.toString()) {
                console.log(linhasJson[i])
                console.log(codigo.val(123))
                codigo.val(linhasJson[i].codigo);
                codigo.prop('disabled', true);
                data.val(linhasJson[i].data);
                valor.val(linhasJson[i].valor);
                descricao.val(linhasJson[i].descricao);
            }
        }
    }
}

function deleteExtrato(codigoInt) {
    let linhasJson = getLinhasStorage();

    for(let i in linhasJson){
        if (linhasJson[i].codigo === codigoInt.toString()) {
            linhasJson.splice(i,1)
        }
    }
    updateStorageCompleto(linhasJson)
    mostrarExtrato();

}
