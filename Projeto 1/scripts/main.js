function selecionaImagemGaleria() {
    document.getElementById("imagem-big").src = Event.target.src;

    document.getElementById("img1").style.border = "none";
    document.getElementById("img2").style.border = "none";
    document.getElementById("img3").style.border = "none";
    Event.target.style.border = "5px solid #81BEF7"
}
