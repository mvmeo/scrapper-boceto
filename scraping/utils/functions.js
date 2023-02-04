export function indexar(lista) {
    for (let i = 0; i < lista.length; i++) {
      lista[i] = { id: i + 1, ...lista[i] };
    }
  
    return lista;
  }