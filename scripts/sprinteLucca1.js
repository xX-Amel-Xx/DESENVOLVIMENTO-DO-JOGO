function sprintLucca1(context, imagem, linhas, colunas) {

    this.context = context;
    this.imagem = imagem;

    this.numLinhas = linhas;
    this.numColunas = colunas;

    this.intervalo = 0;

    this.linha = 0;
    this.coluna = 0;

    // 🔥 limite de colunas por linha
    this.limiteColunas = [];
}

sprintLucca1.prototype = {

    proximoQuadro: function() {

        var agora = new Date().getTime();

        if (!this.ultimoTempo)
            this.ultimoTempo = agora;

        if (agora - this.ultimoTempo < this.intervalo)
            return;

        // 🔥 usa limite da linha ou padrão
        var limite = this.limiteColunas[this.linha] || this.numColunas;

        if (this.coluna < limite - 1)
            this.coluna++;
        else
            this.coluna = 0;

        this.ultimoTempo = agora;
    },

    desenhar: function(x, y) {

        var largura = this.imagem.width / this.numColunas;
        var altura = this.imagem.height / this.numLinhas;

        var escala = 0.6;

        this.context.drawImage(
            this.imagem,

            largura * this.coluna,
            altura * this.linha,

            largura,
            altura,

            x,
            y,

            largura * escala,
            altura * escala
        );
    }
};