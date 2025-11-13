# language: pt
Funcionalidade: Interface de Ofertas de Produtos
  Como fornecedor
  Eu quero interagir com a interface de ofertas
  Para gerenciar meus produtos de forma intuitiva e responsiva

  Contexto:
    Dado que o servidor está rodando
    E que existe um ciclo no período de ofertas
    E que estou autenticado como fornecedor

  @oferta-ui @OFE-UI-01
  Cenário: Visualizar progress steps do ciclo
    Dado que estou na página de ofertas
    Então devo ver o indicador visual de progresso
    E o step "Seleção Produtos" deve estar ativo

  @oferta-ui @OFE-UI-02
  Cenário: Buscar produto em tempo real
    Dado que estou na página de ofertas
    E existem produtos "Cenoura", "Beterraba" e "Abóbora" cadastrados
    Quando eu digito "Cenoura" no campo de busca
    Então apenas produtos com "Cenoura" devem aparecer
    E produtos sem "Cenoura" devem estar ocultos

  @oferta-ui @OFE-UI-03
  Cenário: Adicionar quantidade com botão +
    Dado que estou na página de ofertas
    E existe um produto "Cenoura" com quantidade 0
    Quando eu clico no botão "+" do produto "Cenoura"
    Então a quantidade deve aumentar para 1
    E o card do produto deve ter destaque visual

  @oferta-ui @OFE-UI-04
  Cenário: Diminuir quantidade com botão -
    Dado que estou na página de ofertas
    E existe um produto "Cenoura" com quantidade 5
    Quando eu clico no botão "-" do produto "Cenoura"
    Então a quantidade deve diminuir para 4

  @oferta-ui @OFE-UI-05
  Cenário: Atualizar quantidade via AJAX sem reload
    Dado que estou na página de ofertas
    E existe um produto "Cenoura" cadastrado
    Quando eu adiciono quantidade 5 ao produto "Cenoura"
    Então devo ver uma notificação de sucesso
    E o painel de produtos ofertados deve atualizar automaticamente
    E a página não deve ter recarregado

  @oferta-ui @OFE-UI-06
  Cenário: Contador de produtos em tempo real
    Dado que estou na página de ofertas
    E existem produtos "Cenoura", "Beterraba" e "Abóbora" cadastrados
    Quando eu adiciono quantidade 1 ao produto "Cenoura"
    E eu adiciono quantidade 2 ao produto "Beterraba"
    E eu adiciono quantidade 3 ao produto "Abóbora"
    Então o contador no rodapé deve mostrar "3" produtos

  @oferta-ui @OFE-UI-07
  Cenário: Validar responsividade mobile
    Dado que estou na página de ofertas em dispositivo mobile
    Então o grid de produtos deve estar em layout mobile
    E o progress steps deve ser navegável

  @oferta-ui @OFE-UI-08
  Cenário: Painel de produtos ofertados atualiza dinamicamente
    Dado que estou na página de ofertas
    E existe um produto "Cenoura" cadastrado
    Quando eu adiciono quantidade 10 ao produto "Cenoura"
    Então o painel de produtos ofertados deve mostrar "Cenoura" com quantidade 10
    E o total de produtos ofertados deve ser 1

  @oferta-ui @OFE-UI-09
  Cenário: Limpar busca mostra todos os produtos
    Dado que estou na página de ofertas
    E existem produtos "Cenoura", "Beterraba" e "Abóbora" cadastrados
    E eu digitei "Cenoura" no campo de busca
    Quando eu limpo o campo de busca
    Então todos os produtos devem estar visíveis

  @oferta-ui @OFE-UI-10
  Cenário: Validar feedback visual ao adicionar produto
    Dado que estou na página de ofertas
    E existe um produto "Cenoura" com quantidade 0
    Quando eu adiciono quantidade 5 ao produto "Cenoura"
    Então o card do produto "Cenoura" deve ter a classe "has-quantity"
    E deve aparecer notificação de sucesso
