//Importa a biblioteca axios - que facilita as requisições HTTP
const axios = require('axios')
const urlget = "https://jsonplaceholder.typicode.com/todos/1"
const urlpost = "https://jsonplaceholder.typicode.com/posts"
const urlput = "https://jsonplaceholder.typicode.com/posts/1"

//Fazendo requisição Get
axios.get(urlget)

    .then(response => {
        //Dados recebidos da API
        console.log("Dados recebidos: ")

        console.log(response.data)
    })
    .catch(error => {
      //tratamento de erro
      console.log(`Erro ao acessar a API: ${error}`)
    })


//Dados que queremos enviar -> API (um novo Post)
const novoPost = {
    title: "Aprendendo integração de API",
    body: "Exemplo de como fazer uma requisição POST",
    userId: 1
}
//Fazendo uma requisição POST p/ criar novo recurso na API
axios.post(urlpost, novoPost)
    .then(response => {
        console.log("Recurso criado com sucesso: ")
        console.log(response.data)
    })
    .catch(error => {
        console.error(`Erro ao tentar criar o recurso ${error}`)
    })

 

//Dados que queremos enviar p/ API (atualizando o POST com ID)
const dadosAtualizados = {
        title: "Titulo atualizado com PUT",
        body: "Exemplo de uma requisição PUT",
        userId: 3
    }
//Fazendo requisição PUT p/ atualizar o recurso na API
axios.put(urlput, dadosAtualizados)
    .then(response => {
        //Se a requisição for bem sucedida.
    console.log("Recurso atualizado com sucesso");
    console.log(response.data)
    })
    .catch(error => {
        //Se ocorrer um erro na requisição.
        console.log(`Erro ao tentar atualizar o  recurso: ${error}`)
    })
    

//Requisição DELETE
axios.delete(urlput)
    .then(response => {
        console.log("Recurso deletado com sucesso");
        console.log(`Status da resposta: ${response.status}`)
    })
    .catch(error => {
        console.log(`Erro ao deletar o recurso: ${error}`)
    })
