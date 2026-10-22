const contador = document.querySelector('#contador');
function atualizarContador() {
    const agora = new Date();
    const fimDoDia = new Date();
    fimDoDia.setHours(23, 59, 59, 999);
    const restante = Math.max(0, fimDoDia - agora);
    const horas = String(Math.floor(restante / 3_600_000)).padStart(2, '0');
    const minutos = String(Math.floor((restante % 3_600_000) / 60_000)).padStart(2, '0');
    const segundos = String(Math.floor((restante % 60_000) / 1_000)).padStart(2, '0');
    contador.textContent = `${horas}:${minutos}:${segundos}`;
}
atualizarContador();
setInterval(atualizarContador, 1000);
