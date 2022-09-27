# Rental Cars API
## Rental Cars é uma Web API para cadastro e aluguel de automóveis

### Tecnologias
- NodeJs 16 LTS
- Typescript
- MariaDB
- JWT
- Typeorm
- Express
- Jest
- Yarn

### Melhores práticas
- Clean Architecture
- TDD

### Principais recursos:
- Testes unitários
- Cadastro completo de Automóveis
- Cadastro de usuários
- Cadastro de especificações de automóveis
- Cadastro de categorias de automóveis

### Guia de instalação:

#### 1. Faça o download do projeto com git:
```
git clone https://github.com/gabrielbugarelli/rental-cars.git
```

#### 2. Faça o download do Yarn com NPM:
```
npm install --global yarn
```

#### 3. Instale as dependências:
```
yarn install
```

#### 4. Rode os testes unitários com
```
yarn dev:test
```

#### 5. Execute a aplicação
```
yarn dev
```

### Guia de uso das features já implementadas:
#### A API será levantada na *porta* 3333, com isso, para consumir bastar apontar para localhost:3333/endpoint.

### Serviços de usuário:
#### Sign Up
- <b>endpoint</b>: /users
- <b>method</b>: POST
- <b>payload</b>:
```
{
	"name": "User",
	"email": "user@dev.com",
	"password": "user123",
	"driver_license": "123456"
}	
```

#### Sign In
- <b>endpoint</b>: /sessions
- <b>method</b>: POST
- <b>payload</b>:
```
{
	"email": "user@dev.com",
	"password": "user123"
}
```

### Serviços de Automóvel:

#### Cadastrar automóvel
- <b>endpoint</b>: /cars
- <b>method</b>: POST
- <b>payload</b>:
```
{
	"name": "Cadillac Lowrider",
  "description": "Cadillac Lowrider Pretão",
  "daily_rate": 150,
  "license_plate": "DEF-80809",
  "fine_amount": 300,
  "brand": "Old Skool",
  "category_id": "ec23fc2a-f556-4b20-9a04-14e1d520bd07"
}
```

#### Listar carros disponíveis
- <b>endpoint</b>: /cars/available
- <b>method</b>: GET
- <b>request</b>:
```
[
	{
	  "id": "9bf0c012-00dd-4f4f-abd9-b10f202deae9",
		"available": true,
		"name": "Maverick",
		"description": "Maverick Red",
		"daily_rate": "150",
		"license_plate": "DEF-80809",
		"fine_amount": 300,
		"brand": "Old Skool",
		"category_id": "ec23fc2a-f556-4b20-9a04-14e1d520bd07",
		"created_at": "2022-09-12T23:04:14.000Z"
	}
]
```

#### Criar especificação de carros
- <b>endpoint</b>: /cars/specifications/{id}
- <b>method</b>: POST
- <b>payload</b>:
```
{
	"specifications_id": ["6cd5c85b-4f3e-438d-8592-de67ead3057a"]
}
```

#### Upload de imagens dos carros
- <b>endpoint</b>: /cars/images/{id}
- <b>method</b>: MULTIPART
- <b>value</b>: images
- <b>request</b>:
```
{
	"created": true
}
```

### Agendamento dos automóveis:
#### Agendar automóvel
- <b>endpoint</b>: /rentals
- <b>method</b>: POST
- <b>payload</b>:
```
{
	"expected_return_date": "2022-09-15T05:03:26.026Z", 
	"car_id": "9bf0c012-00dd-4f4f-abd9-b10f202deae9"
}
```

### Especificações:
#### Criar especificação
- <b>endpoint</b>: /specifications
- <b>method</b>: POST
- <b>payload</b>:
```
{
	"name": "Carros autonomos",
	"description": "Testando os novos carros do Elon Musk"
}
```

### Categorias:
#### Criar uma categoria
- <b>endpoint</b>: /categories
- <b>method</b>: POST
- <b>payload</b>:
```
{
	"name": "Corsa Pretão",
	"description": "Lowriders Family"
}
```

#### Listar todas as categorias
- <b>endpoint</b>: /categories
- <b>method</b>: GET
- <b>request</b>:
```
[
	{
		"id": "8e946bb0-4548-4b9d-9184-02de0b8b6f88",
		"name": "Cadillac Pretão",
		"description": "Lowriders Family",
		"created_at": "2022-09-03T04:34:16.722Z"
	},
	{
		"id": "ee6f9cf9-17a2-4c2f-a2a6-1ecc1195b733",
		"name": "Batmovel",
		"description": "Carro do Batman",
		"created_at": "2022-09-03T04:35:05.311Z"
	},
  	{
		"id": "35f72b75-d712-41fa-ae87-c5ab83d68c51",
		"name": "Conversível da Barbie",
		"description": "Lowriders Family",
		"created_at": "2022-09-03T04:37:40.780Z"
	}
]
```
