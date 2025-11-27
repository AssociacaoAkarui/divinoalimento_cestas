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

  # ============================================
  # CENÁRIOS PARA TESTAR IndexService
  # ============================================

  @index @index-service
  Cenário: IDX-11 - IndexService buscar ciclos ativos com sucesso
    Dado que existem usuários cadastrados no sistema
    E que existe um ponto de entrega cadastrado
    E que existem 2 ciclos cadastrados
    E que o primeiro ciclo está ativo
    E que o segundo ciclo está expirado
    Quando eu solicito os ciclos ativos
    Então eu devo receber 1 ciclos na resposta

  @index @index-service
  Cenário: IDX-12 - IndexService buscar ciclos para consumidor com pedido finalizado
    Dado que existem usuários cadastrados no sistema
    E que existe um ponto de entrega cadastrado
    E que existe um ciclo ativo
    E que estou autenticado como consumidor
    E que já finalizei meu pedido de consumidor
    Quando eu solicito os ciclos ativos para o consumidor
    Então o ciclo deve indicar que o pedido foi finalizado

  @index @index-service
  Cenário: IDX-13 - IndexService buscar ciclos sem usuário
    Dado que existem usuários cadastrados no sistema
    E que existe um ponto de entrega cadastrado
    E que existe um ciclo ativo
    Quando eu solicito os ciclos ativos sem informar usuário
    Então eu devo receber o ciclo sem informação de pedido finalizado

  @index @index-service
  Cenário: IDX-14 - IndexService calcular status de oferta disponível
    Dado que existem usuários cadastrados no sistema
    E que existe um ponto de entrega cadastrado
    E que existe um ciclo ativo
    E que o período de oferta está aberto
    E que estou autenticado como fornecedor
    Quando eu calculo o status da etapa "oferta" para o fornecedor
    Então o status deve ser "ativo"
    E a mensagem deve ser "DISPONÍVEL"

  @index @index-service
  Cenário: IDX-15 - IndexService calcular status de oferta indisponível
    Dado que existem usuários cadastrados no sistema
    E que existe um ponto de entrega cadastrado
    E que existe um ciclo ativo
    E que o período de oferta está fechado
    E que estou autenticado como fornecedor
    Quando eu calculo o status da etapa "oferta" para o fornecedor
    Então o status deve ser "inativo"
    E a mensagem deve ser "INDISPONÍVEL"

  @index @index-service
  Cenário: IDX-16 - IndexService calcular status de composição para admin
    Dado que existem usuários cadastrados no sistema
    E que existe um ponto de entrega cadastrado
    E que existe um ciclo ativo
    E que o período de composição está aberto
    E que estou autenticado como admin
    Quando eu calculo o status da etapa "composicao" para o admin
    Então o status deve ser "ativo"
    E a mensagem deve ser "DISPONÍVEL"

  @index @index-service
  Cenário: IDX-17 - IndexService composição indisponível para fornecedor
    Dado que existem usuários cadastrados no sistema
    E que existe um ponto de entrega cadastrado
    E que existe um ciclo ativo
    E que o período de composição está aberto
    E que estou autenticado como fornecedor
    Quando eu calculo o status da etapa "composicao" para o fornecedor
    Então o status deve ser "inativo"
    E a mensagem deve ser "INDISPONÍVEL"

  @index @index-service
  Cenário: IDX-18 - IndexService calcular status de pedidos para consumidor
    Dado que existem usuários cadastrados no sistema
    E que existe um ponto de entrega cadastrado
    E que existe um ciclo ativo no status "composicao"
    E que estou autenticado como consumidor
    Quando eu calculo o status da etapa "pedidos" para o consumidor
    Então o status deve ser "ativo"
    E a mensagem deve ser "DISPONÍVEL"

  @index @index-service
  Cenário: IDX-19 - IndexService calcular status de entrega para fornecedor
    Dado que existem usuários cadastrados no sistema
    E que existe um ponto de entrega cadastrado
    E que existe um ciclo ativo no status "atribuicao"
    E que estou autenticado como fornecedor
    Quando eu calculo o status da etapa "entrega" para o fornecedor
    Então o status deve ser "ativo"
    E a mensagem deve ser "DISPONÍVEL"

  @index @index-service
  Cenário: IDX-20 - IndexService calcular status de retirada para consumidor
    Dado que existem usuários cadastrados no sistema
    E que existe um ponto de entrega cadastrado
    E que existe um ciclo ativo no status "composicao"
    E que estou autenticado como consumidor
    Quando eu calculo o status da etapa "retirada" para o consumidor
    Então o status deve ser "ativo"
    E a mensagem deve ser "DISPONÍVEL"

  @index @index-service
  Cenário: IDX-21 - IndexService validar acesso sem perfil
    Dado que existem usuários cadastrados no sistema
    E que existe um ponto de entrega cadastrado
    E que existe um ciclo ativo
    Quando eu calculo o status da etapa "oferta" sem informar perfil
    Então o status deve ser "inativo"
    E a mensagem deve ser "INDISPONÍVEL"

  @index @index-service
  Cenário: IDX-22 - IndexService buscar ciclos quando não há ciclos
    Quando eu solicito os ciclos ativos
    Então eu devo receber uma lista vazia
