# Cadastro de carro

**RF** => Requisitos funcionais
[X] Deve ser possível cadastrar um novo carro.

**RNF** => Requisitos não funcionais


**RN** => Regra de negócio
[X] Não deve ser possível cadastrar um carro com uma placa já existente.
[X] Não deve ser possível alterar a placa de um carro já cadastrado.
[X] O carro deve ser cadastrado, por padrão, com disponibilidade.
[X] O usuário responsável pelo cadastro deve ser um usuário administrador.


# Listagem de carros

**RF**
[X] Deve ser possível listar todos os carros disponíveis.
[X] Deve ser possível listar todos os carros pelo nome da categoria.
[X] Deve ser possível listar todos os carros pelo nome da marca.
[X] Deve ser possível listar todos os carros pelo nome da carro.

**RN**
[X] O usuário não precisa estar logado no sistema.


# Cadastro de Especificação no carro

**RF**
[X] Deve ser posível cadastrar uma especificação para um carro.
[ ] Deve ser possível listar todas as especificações.
[ ] Deve ser possível listar todos os carros.

**RN**
[ ] Não deve ser possível cadastrar uma especificação para um carro não existente.
[ ] Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
[ ] O usuário responsável pelo cadastro deve ser um usuário administrador.


# Cadastro de imagens do carro

**RF**
[ ] Deve ser possível cadastrar a imagem do carro.

**RNF**
[ ] Ultilizar o multer para uupload dos arquivos.

**RN**
[ ] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
[ ] O usuário responsável pelo cadastro deve ser um usuário adimistrador.

# Alugel de carros

**RF**
[ ] Deve ser possível cadastrar um  alugel 

**RN**
[ ] O alugel deve ter duração mínima de 24 horas.
[ ] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
[ ] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
