const tbody = document.querySelector('#dados');
const url = 'http://localhost:3000/usuarios';

/* --- CRUD FUNCTIONS --- */
const Create = (nome, senha) => {
    const data = { nome, senha }
    fetch(url, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => { if (data.ok) Read() })
        .catch(error => console.log(error))
}
const Read = () => {
    fetch(url)
        .then(response => response.json())
        .then(data => render(data))
        .catch(error => console.log(error))
}
const Update = (id, nome, senha) => {
    const data = { nome, senha }
    fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => { if (data.ok) Read() })
        .catch(error => console.log(error))
}
const Delete = (id) => {
    fetch(`${url}/${id}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => { if (data.ok) Read() })
        .catch(error => console.log(error))
}

/* --- RENDER FUNCTION --- */
const render = (data) => {
    const html = data.map((item) => {
        return `
      <tr>
        <td>${item.id}</td>
        <td>${item.nome}</td>
        <td>${item.senha}</td>
        <td>
            <button onclick="Load(${item.id}, '${item.nome}', '${item.senha}')">Editar</button>
            <button onclick="Delete(${item.id})">Excluir</button>
        </td>
      </tr>
    `
    }).join('')
    tbody.innerHTML = html;
}
/* --- SAVE FUNCTION --- */
const save = () => {
    const nome = document.querySelector('#nome').value;
    const senha = document.querySelector('#senha').value;
    const id = document.querySelector('#id').value;

    if (id) Update(id, nome, senha);
    else Create(nome, senha);

    document.querySelector('#nome').value = '';
    document.querySelector('#senha').value = '';
    document.querySelector('#id').value = '';
    document.querySelector('#id_disabled').value = '';
}
/* --- LOAD FUNCTION --- */
const Load = (id, nome, senha) => {
    document.querySelector('#nome').value = nome;
    document.querySelector('#senha').value = senha;
    document.querySelector('#id').value = id;
    document.querySelector('#id_disabled').value = id;

}
/* --- EVENT LISTENERS --- */
document.addEventListener('DOMContentLoaded', () => Read());
document.querySelector('#salvar').addEventListener('click', save);