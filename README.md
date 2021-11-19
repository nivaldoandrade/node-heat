<h1 align="center">NLW Heat - Node.js</h1>


Uma aplicação criado com Node.js para autenticação do usuário utilizando Oauth do github, criação da mensagem e atualização em tempo real com Socket.IO das 3 ultimas mensagens.

## **Configurações Iniciais**

```
  # clonar o repositório
  git clone https://github.com/nivaldoandrade/node-heat

  # Instalar as dependências dentro da pasta clonada
  yarn

	# Run migrations
	yarn prisma migrate dev

  # Iniciar a aplicação
  yarn dev

```

## **Configurações do Git Hub APP**

Necessário a criação de um [OAuth Apps](https://github.com/settings/developers)

Para mais informações sobre o Git Hub APP: [DOCUMENTAÇÃO DO GITHUB APP.](https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps)

## **Configurações .ENV da aplicação**

### **GIT HUB**
```
#Github
GITHUB_ID=
GITHUB_SECRET=
```

- **GITHUB_ID** é o client ID gerado na criação do OAuth Apps.
- **GITHUB_SECRET** é a client secrets gerado na criação do OAuth Apps.

### **JWT**
```
#JWT
JWT_SECRET=
```
Uma chave secreta - [HASH GENERATOR.](https://hash-generator.io/md5-hash-generator.php?hl=en&gclid=CjwKCAiAs92MBhAXEiwAXTi2599mv4meGTB7sfuoULf0DL8CJbm0xh7QPteVo3y8ltHkUGBX4ZhUyhoCP2oQAvD_BwE)

## **Insomnia**

Tutorial de como importar Workspace para teste [Importing and Exporting Data.](https://support.insomnia.rest/article/52-importing-and-exporting-data)
Download do [Workspace](https://github.com/nivaldoandrade/node-heat/blob/main/insomniaData/node-heat.json).

## **Rotas da aplicação**

* **GET /me**: Nessa rota é necessário o **token** e retorna as informações do usuário:

  ```JSON
  {
    "id": "8b86c526-e6e0-437a-bbac-4a7aedbde753",
		"github_id": 66283205,
		"name": "Nivaldo Andrade",
		"login": "nivaldoandrade",
		"email": "nivaldoandradef@gmail.com",
		"avatar_url": "https://avatars.githubusercontent.com/u/66283205?v=4"
  }
  ```

* **GET /last3messages**: A rota retorna as 3 últimas mensagens  de forma decrescente.

  ```JSON
		[
		{
			"id": "27c2eb7a-4701-49d3-b6d2-92dca70f7bc2",
			"message": "Mensagem 1",
			"created_at": "2021-11-04T19:27:17.039Z",
			"user_id": "8b86c526-e6e0-437a-bbac-4a7aedbde753",
			"user": {
				"id": "8b86c526-e6e0-437a-bbac-4a7aedbde753",
				"github_id": 66283205,
				"name": "Nivaldo Andrade",
				"login": "nivaldoandrade",
				"email": "nivaldoandradef@gmail.com",
				"avatar_url": "https://avatars.githubusercontent.com/u/66283205?v=4"
			}
		},
		{
			"id": "7c3d4c3f-0073-4c8f-8ffe-75ffe19f0f41",
			"message": "Mensagem 2",
			"created_at": "2021-11-04T19:00:53.941Z",
			"user_id": "8b86c526-e6e0-437a-bbac-4a7aedbde753",
			"user": {
				"id": "8b86c526-e6e0-437a-bbac-4a7aedbde753",
				"github_id": 66283205,
				"name": "Nivaldo Andrade",
				"login": "nivaldoandrade",
				"email": "nivaldoandradef@gmail.com",
				"avatar_url": "https://avatars.githubusercontent.com/u/66283205?v=4"
			}
		},
		{
			"id": "2ef902a0-4963-4031-b49a-834c51f4940d",
			"message": "Mensagem 3",
			"created_at": "2021-11-04T15:24:09.486Z",
			"user_id": "8b86c526-e6e0-437a-bbac-4a7aedbde753",
			"user": {
				"id": "8b86c526-e6e0-437a-bbac-4a7aedbde753",
				"github_id": 66283205,
				"name": "Nivaldo Andrade",
				"login": "nivaldoandrade",
				"email": "nivaldoandradef@gmail.com",
				"avatar_url": "https://avatars.githubusercontent.com/u/66283205?v=4"
			}
		}
	]
  ```

* **POST /message**: A rota recebe **message** no corpo da requisição. É necessário o **token** para a criação da mensagem.

  ```JSON
	{
		"id": "a22a2ed9-22cf-4d8c-b08f-4f6c10e88162",
		"message": "Messagem 1",
		"created_at": "2021-11-09T12:58:49.771Z",
		"user_id": "8b86c526-e6e0-437a-bbac-4a7aedbde753",
		"user": {
			"id": "8b86c526-e6e0-437a-bbac-4a7aedbde753",
			"github_id": 66283205,
			"name": "Nivaldo Andrade",
			"login": "nivaldoandrade",
			"email": "nivaldoandradef@gmail.com",
			"avatar_url": "https://avatars.githubusercontent.com/u/66283205?v=4"
		}
	}
  ```
* **POST /authenticate**: Nessa rota é necessário [**code**](https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps#2-users-are-redirected-back-to-your-site-by-github) na **query** e retorna as informações do usuário e o **token**:

  ```JSON
		{
		"user": {
			"id": "8b86c526-e6e0-437a-bbac-4a7aedbde753",
			"github_id": 66283205,
			"name": "Nivaldo Andrade",
			"login": "nivaldoandrade",
			"email": "nivaldoandradef@gmail.com",
			"avatar_url": "https://avatars.githubusercontent.com/u/66283205?v=4"
		},
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzY0MDcxMTgsImV4cCI6MTYzNjQ5MzUxOCwic3ViIjoiOGI4NmM1MjYtZTZlMC00MzdhLWJiYWMtNGE3YWVkYmRlNzUzIn0.1iQXP8FCpfEJ6QAhD4fg7iLPC2wvfC5qQ59pTRF0Iro"
	}
  ```

	## **Tecnologias**
- Node.js;
- Typescript;
- Prisma;
- Axios;
- Cors;
- Dotenv;
- Express;
- Jsonwebtoken;
- socket.io.

### **Um pequeno aprendiz nesse grande mundo da programação.** 😃🗺

<p>
	<h6>Developed on Next Level Week Heat from <a href="https://rocketseat.com.br">RocketSeat</a> by <a href="https://www.linkedin.com/in/danieleleaoevangelista/?originalSubdomain=br">Daniele Leão.</a></h6>
</p>
