const Ciclo = require("../model/Ciclo");
const Usuario = require("../model/Usuario");
const PedidoConsumidores = require("../model/PedidoConsumidores");
const { IndexService } = require("../services/services");
const ServiceError = require("../utils/ServiceError");

module.exports = {
  async showIndex(req, res) {
    // USUARIO V20210720
    usuarioAtivo = [];
    user = req.oidc.user;
    let controleUsuario = "";

    let haUsuarios = true;

    let ambiente = "";
    if (process.env.NODE_ENV === "development") {
      ambiente = "desenvolvimento";
    }

    const usuarios = await Usuario.get();

    if (usuarios.length === 0) {
      haUsuarios = false;
    }

    if (user) {
      // Já é usuário cadastrado na base do sistema

      usuarioCadastrado = await Usuario.retornaUsuarioCadastrado(user.email);

      if (usuarioCadastrado != 0) {
        usuarioAtivo.push({
          email: user.email,
          picture: user.picture,
          name: user.name,
          email_verified: user.email_verified,
          id: usuarioCadastrado.id,
          perfil: usuarioCadastrado.perfil,
        });

        console.log("USUÁRIO CADASTRADO:", usuarioAtivo[0]);

        controleUsuario = "usuarioCadastrado";
      } else {
        usuarioAtivo.push({
          email: user.email,
          picture: user.picture,
          name: user.name,
          email_verified: user.email_verified,
        });
      }
    } else {
      usuarioAtivo.push({
        email_verified: "false",
      });
    }

    // USUARIO FIM

    // Usar IndexService para buscar ciclos ativos
    const indexService = new IndexService();
    const usuarioId = usuarioAtivo[0]?.id || null;
    const ciclosAtivos = await indexService.buscarCiclosAtivos(usuarioId);

    //const cicloId = req.params.id

    // to-do alterar para usuário corrente quando módulo de usuários estiver ativo
    //let usuarioId = 4 //desenvolvimento
    //let usuarioId = 2 //producao

    //if (req.query.usr) {
    //usuarioId = req.query.usr
    //}

    //let usuarios = []
    //try {
    // to-do: trazer apensas usuários que podem ser geridos por usuário corrente
    //usuarios = await Usuario.get()
    //} catch (error) {
    //console.log('OfertaController error - falha Usuario.get')
    //}

    //const dadosCiclo = await Ciclo.getCicloId(cicloId)
    //ciclo = dadosCiclo.ciclo[0]

    //const cicloComposicoes = dadosCiclo.cicloComposicoes

    if (user) {
      if (controleUsuario == "usuarioCadastrado") {
        return res.render("index", {
          ciclos: ciclosAtivos,
          usuarioAtivo: usuarioAtivo[0],
        });
      } else {
        return res.render("usuarionovo", {
          usuarioAtivo: usuarioAtivo[0],
          haUsuarios: haUsuarios,
          ambiente: ambiente,
        });
      }
    } else {
      return res.render("index", {
        ciclos: ciclosAtivos,
        usuarioAtivo: usuarioAtivo[0],
      });
    }
  },

  /**
   * GET /api/index/ciclos-ativos
   * Retorna ciclos ativos em formato JSON
   */
  async buscarCiclosAtivos(req, res) {
    try {
      const { usuarioId } = req.query;
      const indexService = new IndexService();
      const ciclos = await indexService.buscarCiclosAtivos(usuarioId || null);

      return res.json({ success: true, ciclos });
    } catch (error) {
      console.error("Erro ao buscar ciclos ativos:", error);
      return res.status(500).json({ success: false, error: error.message });
    }
  },

  /**
   * POST /api/index/calcular-status-etapa
   * Calcula status de disponibilidade de uma etapa
   */
  async calcularStatusEtapa(req, res) {
    try {
      const { ciclo, perfil, etapa } = req.body;

      if (!ciclo || !perfil || !etapa) {
        return res.status(400).json({
          success: false,
          error: "Parâmetros obrigatórios: ciclo, perfil, etapa",
        });
      }

      const indexService = new IndexService();
      const status = indexService.calcularStatusEtapa(ciclo, perfil, etapa);

      return res.json({ success: true, status });
    } catch (error) {
      console.error("Erro ao calcular status da etapa:", error);
      return res.status(500).json({ success: false, error: error.message });
    }
  },
};
