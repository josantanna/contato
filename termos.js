var elementosDuvida = document.querySelectorAll('.termos')

elementosDuvida.forEach(function(termos){
    termos.addEventListener('click', function(){
        termos.classList.toggle('ativa')
    })
})

document.getElementById('termos-condicoes').addEventListener('change', function() {
    document.getElementById('btn-enviar').disabled = !this.checked;
});