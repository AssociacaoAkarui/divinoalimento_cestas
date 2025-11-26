# language: pt

Funcionalidade: Página Inicial (Index)
  Como um usuário do sistema
  Eu quero visualizar a página inicial
  Para ter acesso às funcionalidades disponíveis de acordo com meu perfil

  Contexto:
    Dado que existem usuários cadastrados no sistema
    E que existe um ponto de entrega cadastrado

  @index
  Cenário: IDX-01 - Visualizar página inicial sem autenticação
    Dado que não estou autenticado
    Quando acesso a página inicial
    Então devo ver a página de index
    E não devo ver funcionalidades restritas

  @index
  Cenário: IDX-02 - Visualizar ciclos ativos como fornecedor
    Dado que existe um ciclo ativo com período de oferta válido
    E que estou autenticado como fornecedor
    Quando acesso a página inicial
    Então devo ver o ciclo ativo listado
    E devo ver a funcionalidade "Oferta de Produtos" disponível
    E devo ver a funcionalidade "Lista para Entrega" indisponível

  @index
  Cenário: IDX-03 - Visualizar ciclos ativos como consumidor
    Dado que existe um ciclo ativo no status "composicao"
    E que estou autenticado como consumidor
    Quando acesso a página inicial
    Então devo ver o ciclo ativo listado
    E devo ver a funcionalidade "Pedidos Extras" disponível
    E devo ver a funcionalidade "Relatório de Entrega" disponível

  @index
  Cenário: IDX-04 - Visualizar funcionalidades administrativas
    Dado que existem usuários cadastrados no sistema
    E que existe um ponto de entrega cadastrado
    E que existe um ciclo ativo
    E que estou autenticado como admin
    Quando acesso a página inicial
    Então devo ver o ciclo ativo listado
    E devo ver a funcionalidade "Composição das Cestas" disponível
    E devo ver a seção "Funcionalidades Gerais"
    E devo ver 4 cards administrativos
    | card                       |
    | Ciclos                     |
    | Relatório Fornecedores     |
    | Relatório Consumidores     |
    | Cadastros                  |

  @index
  Cenário: IDX-05 - Filtrar apenas ciclos ativos
    Dado que existem usuários cadastrados no sistema
    E que existe um ponto de entrega cadastrado
    E que existem 2 ciclos cadastrados
    E que o primeiro ciclo está ativo
    E que o segundo ciclo está expirado
    E que estou autenticado como fornecedor
    Quando acesso a página inicial
    Então devo ver apenas 1 ciclo listado
    E o ciclo listado deve ser o ciclo ativo

  @index
  Cenário: IDX-06 - Visualizar funcionalidade pessoal
    Dado que estou autenticado como consumidor
    Quando acesso a página inicial
    Então devo ver a seção "Funcionalidades Individuais"
    E devo ver o card "Dados Pessoais" disponível

  @index
  Cenário: IDX-07 - Redirecionar usuário não cadastrado
    Dado que estou autenticado no OAuth
    Mas não tenho cadastro no sistema
    Quando acesso a página inicial
    Então devo ser redirecionado para a página de cadastro de novo usuário

  @index
  Cenário: IDX-08 - Estado vazio sem ciclos ativos
    Dado que não existem ciclos ativos
    E que estou autenticado como fornecedor
    Quando acesso a página inicial
    Então devo ver uma mensagem de estado vazio
    E a mensagem deve indicar que não há ciclos ativos no momento

  @index
  Cenário: IDX-09 - Verificar status de oferta por período
    Dado que existem usuários cadastrados no sistema
    E que existe um ponto de entrega cadastrado
    E que existe um ciclo ativo
    E que o período de oferta já passou
    E que estou autenticado como fornecedor
    Quando acesso a página inicial
    Então devo ver a funcionalidade "Oferta de Produtos" indisponível
    E devo ver um badge "INDISPONÍVEL"

  @index
  Cenário: IDX-10 - Verificar pedido consumidor finalizado
    Dado que existe um ciclo ativo no status "composicao"
    E que estou autenticado como consumidor
    E que já finalizei meu pedido de consumidor
    Quando acesso a página inicial
    Então devo ver a funcionalidade "Pedidos Extras" apontando para confirmação
    E o link deve apontar para "/pedidoConsumidoresconfirmacao"
