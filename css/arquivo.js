funtion inicializa(){
    document
        .querySelectorAll('thumb')
        .forEach (funtion (imagem){
            imagem.addEventListerner('click', function(e){
                console.log(e.target.getAttribute(''src));
                imagem.style.border
            }, false);
        });
}