

function salvarToken (token){
    // Aqui salvo o usuario na Store
    localStorage.setItem('token', token);
}

function obterToken (token){
    // Aqui obtenho o token da store
    return localStorage.getItem("token");
}

function salvarUsuario (usuario){
    // Aqui pego o usuario em obj e converto ele para JSON e salvo na store
    return localStorage.setItem('usuario', JSON.stringify(usuario));
}

function obterUsuario (usuario){
    // Pego o usuario como JSON na store e converto para obj e devolvo no return
    let usuarioStore = localStorage.getItem("usuario");
    return JSON.parse(usuarioStore);
}

function sairDoSistema(){
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.open('login.html', "_self")
}
