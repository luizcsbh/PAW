// Exemplo de JavaScript inicial para desativar envios de formulário, se houver campos inválidos.
(function desativarEnvio() {
    'use strict';
    window.addEventListener('load', function () {
        // Pega todos os formulários que nós queremos aplicar estilos de validação Bootstrap personalizados.
        var forms = document.getElementsByClassName('needs-validation');
        // Faz um loop neles e evita o envio
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

function mostrarTabela() {
    showTabelaTela();
    $('input').val("");

}

function salvar() {

    let codigo = $('#codigo'),
        nomefilme = $('#nomefilme'),
        ano = $('#ano'),
        personagem = $('#personagem');
    codigo.prop('disabled', false);

    let linhasJson = getLinhasStorage();
    if (linhasJson) {
        for (let i = 0; i < linhasJson.length; i++) {

            if (linhasJson[i].codigo === codigo.val()) {
                linhasJson[i].nomefilme = nomefilme.val();
                linhasJson[i].ano = ano.val();
                linhasJson[i].personagem = personagem.val();
                updateStorageCompleto(linhasJson);
                mostrarTabela();
                return
            }
        }
    }

    let linha = {
        codigo: codigo.val(),
        nomefilme: nomefilme.val(),
        ano: ano.val(),
        personagem: personagem.val()
    };
    inserStorage(linha);
    mostrarTabela();


    codigo.prop('disabled', false);

}


function getElementErro(element) {
    let idElement = element.get(0).id;
    return $(document.getElementById(idElement + "Erro"));

}


function inserStorage(linha) {
    let linhas = localStorage.getItem('linhas');
    let array = [];
    if (localStorage.getItem('linhas')) {
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
    if (linhas)
        return JSON.parse(linhas);

    return [];

}


function showExtratoTela() {
    let linhas = getLinhasStorage(),
        html = "",
        linhas.forEach(function (linha) {
            html += "<tr>" +
                "<td>" + linha.codigo + "</td>" +
                "<td>" + linha.nomefilme + "</td>" +
                "<td>" + linha.ano + "</td>" +
                "<td>" + linha.personagem + "</td>" +
                "<td><i onclick='updateTabela(" + linha.codigo + ")' " +
                "class=\"fa fa-pencil\"></i> " +
                "<i onclick='deleteLinha(" + linha.codigo + ")' class=\"fa fa-trash\"></i></td>" +
                "</tr>"
        })
    $("table>tbody").html(html);
}

function updateTabelacodigoInt) {
    let codigo = $('#codigo'),
        nomefilme = $('#nomefilme'),
        ano = $('#ano'),
        personagem = $('#personagem'),
        linhasJson = getLinhasStorage();

    if (linhasJson) {
        for (let i in linhasJson) {

            if (linhasJson[i].codigo === codigoInt.toString()) {
                console.log(linhasJson[i])
                console.log(codigo.val(123))
                codigo.val(linhasJson[i].codigo);
                codigo.prop('disabled', true);
                nomefilme.val(linhasJson[i].nomefilme);
                ano.val(linhasJson[i].ano);
                personagem.val(linhasJson[i].personagem);
            }
        }
    }

    document.querySelector('#submit').click();
}

function deleteLinha(codigoInt) {
    let linhasJson = getLinhasStorage();

    for (let i in linhasJson) {
        if (linhasJson[i].codigo === codigoInt.toString()) {
            linhasJson.splice(i, 1)
        }
    }
    updateStorageCompleto(linhasJson)
    mostrarTabela();

}


function recarregarTela() {
    document.location.reload();
}
