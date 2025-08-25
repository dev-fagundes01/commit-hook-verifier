# 🛡️ commit-hook-verifier

[![npm version](https://img.shields.io/npm/v/commit-hook-verifier.svg)](https://www.npmjs.com/package/commit-hook-verifier)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> Verificador de mensagens de commit com base no idioma e verbos permitidos. Compatível com projetos locais ou instalação global.

---

## 📦 Instalação

### 📁 Projeto local (modo recomendado)
```
npx commit-hook-verifier
```

Isso irá instalar o hook `commit-msg` no seu repositório atual e criar um arquivo `.commit-lang` com idioma e verbos padrão.

### 🌍 Modo global (para usar em todos os projetos)
```
npx commit-hook-verifier --global
```

Requer que você rode `git init` em cada novo projeto para aplicar o template.

## 🏁 Inicialização com idioma automático
Você pode gerar automaticamente o arquivo `.commit-lang` com o idioma desejado usando a flag `--init-lang:`

```
npx commit-hook-verifier --init-lang=pt
```

### ⚙️ Arquivo `.commit-lang`
O hook valida os commits baseado em um arquivo `.commit-lang` na raiz do repositório. Exemplo:
```
pt
adiciona corrige remove atualiza refatora melhora ajusta implementa
```

Ou para inglês:
```
en
add fix remove update refactor improve adjust implement
```
>A primeira linha define o idioma (`pt` ou `en`) <br/>
>As demais linhas definem os verbos permitidos no início da mensagem de commit

### 👀 Tornar `.commit-lang` visível (para versionar)
Por padrão, o arquivo `.commit-lang` é ignorado via `.git/info/exclude.`

Para deixá-lo visível e versionar (ideal para equipes):
```
npx commit-hook-verifier --init-lang=en --visible
```
Depois, faça commit desse arquivo para que outros devs tenham o padrão.

### 🔄 Caso o arquivo já exista
Se `.commit-lang` já está no repositório, basta instalar o hook:
```
npx commit-hook-verifier

```
Nenhum arquivo será sobrescrito.

## ✅ Regras aplicadas
• O commit deve seguir o padrão Conventional Commits. <br/>
• O verbo após os dois-pontos `:` será validado. <br/>
• Se não for um verbo permitido, o commit será rejeitado com uma mensagem explicativa.

### 📘 Exemplo válido
````
git commit -m "feat(auth): adiciona verificação de token no login"
````
✅ O verbo "adiciona" está na lista permitida.

### ❌ Exemplo inválido
````
git commit -m "feat(auth): validar login"
````
⛔ "validar" não está entre os verbos da lista.
<hr/>

## 💡 Dicas para equipes
• Use `--init-lang` + `--visible` na configuração inicial do projeto:
```
npx commit-hook-verifier --init-lang=en --visible
git add .commit-lang
git commit -m "chore: add commit verification config"
```
• Para novos integrantes, basta:
```
npx commit-hook-verifier
```

## 🙋‍♂️ Dúvidas ou sugestões?
Se curtiu o projeto, me dá um alô no <a href="https://www.linkedin.com/in/diego-fagundes-da-silva/" rel="nofollow">LinkedIn</a> 😉
