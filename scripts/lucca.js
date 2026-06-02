// 🔥 CONSTANTES (ESSENCIAL)
var LUCCA_DIREITA = 1;
var LUCCA_ESQUERDA = 2;
var LUCCA_CIMA = 3;
var LUCCA_BAIXO = 4;

function Lucca(context, teclado, imgLateral, imgVertical) {

    this.context = context;
    this.teclado = teclado;

    this.x = 0;
    this.y = 0;

    this.velocidade = 5;

    // 🔥 LATERAL (3 linhas, 9 colunas fixas)
    this.sheetLateral =
        new sprintLucca1(context, imgLateral, 3, 9);

    // 🔥 LIMITES REAIS
    this.sheetLateral.limiteColunas = [2, 9, 9];

    // 🔥 VERTICAL
    this.sheetVertical =
        new sprintLucca1(context, imgVertical, 2, 9);

    this.sheetLateral.intervalo = 80;
    this.sheetVertical.intervalo = 80;

    this.sheetAtual = this.sheetVertical;

    this.direcao = LUCCA_BAIXO;
}

Lucca.prototype = {

    atualizar: function() {

        // 👉 DIREITA
        if (this.teclado.pressionada(SETA_DIREITA)) {

            this.sheetAtual = this.sheetLateral;
            this.sheetAtual.linha = 1;
            this.sheetAtual.proximoQuadro();

            this.x += this.velocidade;
            this.direcao = LUCCA_DIREITA;
        }

        // 👉 ESQUERDA
        else if (this.teclado.pressionada(SETA_ESQUERDA)) {

            this.sheetAtual = this.sheetLateral;
            this.sheetAtual.linha = 2;
            this.sheetAtual.proximoQuadro();

            this.x -= this.velocidade;
            this.direcao = LUCCA_ESQUERDA;
        }

        // 👉 CIMA
        else if (this.teclado.pressionada(SETA_CIMA)) {

            this.sheetAtual = this.sheetVertical;
            this.sheetAtual.linha = 1;
            this.sheetAtual.proximoQuadro();

            this.y -= this.velocidade;
            this.direcao = LUCCA_CIMA;
        }

        // 👉 BAIXO
        else if (this.teclado.pressionada(SETA_BAIXO)) {

            this.sheetAtual = this.sheetVertical;
            this.sheetAtual.linha = 0;
            this.sheetAtual.proximoQuadro();

            this.y += this.velocidade;
            this.direcao = LUCCA_BAIXO;
        }

        // 👉 PARADO
        else {

            switch(this.direcao) {

                case LUCCA_DIREITA:
                    this.sheetAtual = this.sheetLateral;
                    this.sheetAtual.linha = 0;
                    this.sheetAtual.coluna = 1;
                    break;

                case LUCCA_ESQUERDA:
                    this.sheetAtual = this.sheetLateral;
                    this.sheetAtual.linha = 0;
                    this.sheetAtual.coluna = 0;
                    break;

                case LUCCA_CIMA:
                    this.sheetAtual = this.sheetVertical;
                    this.sheetAtual.linha = 1;
                    this.sheetAtual.coluna = 0;
                    break;

                case LUCCA_BAIXO:
                    this.sheetAtual = this.sheetVertical;
                    this.sheetAtual.linha = 0;
                    this.sheetAtual.coluna = 0;
                    break;
            }
        }
    },

    desenhar: function() {
        this.sheetAtual.desenhar(this.x, this.y);
    }
};