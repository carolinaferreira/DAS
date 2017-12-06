# Supreme Log

#### O que é?

O Supreme Log é um framework para aplicações em Node.js que utiliza programação orientada a aspectos. Ele permite fazer o logging de uma ou mais classes de forma personalizada, facilitando o <i>tracing</i> e <i>debugging</i>. O projeto foi desenvolvido no Segundo semestre de 2017 como parte da disciplina de Desenvolvimento Avançado de Software ministrada pelo Professor André Luiz Peron Martins Lanna.

#### Instalação:

Para instalar o framework, digite no terminal:
``` bash
npm install supreme-log
```

#### Utilização

Como importar o Supreme Log para o seu projeto:
``` bash
const SupremeLog = require('supreme-log');
```
Existem duas opções de log:

**Before** - registra o log antes que o método seja executado.
``` bash
SupremeLog.before(this);
```

**After** - registra o log depois da execução do método.
``` bash
SupremeLog.after(this);
```
Como parâmetros, deve ser passada obrigatoriamente a classe em que deseja ser realizada o log e **opcionalmente** um *array* contendo o nome dos métodos da classe que desejamos que o logging acompanhe. Por exemplo:
``` bash
SupremeLog.after(this, ['trackenMethod2', 'trackenMethod4']);
```

Por padrão, é definido que o log seja salvo em um arquivo chamado 'supreme.log' na pasta raiz do projeto, para mudar essa opção para que o log possa aparecer no console:
``` bash
SupremeLog.logFile = false
```
Para que não seja apresentada a data e o tempo à cada log:
``` bash
SupremeLog.useTime = false
```
Há ainda no projeto o arquivo **examples/test.js** que demonstra a utilização do Supreme Log, para referências.
