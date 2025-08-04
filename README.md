# 🛡️ commit-hook-verifier

[![npm version](https://img.shields.io/npm/v/commit-hook-verifier.svg)](https://www.npmjs.com/package/commit-hook-verifier)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> Verificador de mensagens de commit com base no idioma e verbos permitidos. Compatível com projetos locais ou instalação global.

---

## 📦 Instalação

### 📁 Projeto local (modo recomendado)
npx commit-hook-verifier

Isso irá instalar o hook commit-msg no seu repositório atual e criar um arquivo .commit-lang com idioma e verbos padrão.

### 🌍 Modo global (para usar em todos os projetos)
npx commit-hook-verifier --global

Requer que você rode git init em cada novo projeto para aplicar o template.

### ⚙️ Arquivo .commit-lang
O hook valida os commits baseado em um arquivo .commit-lang na raiz do repositório. Exemplo:
pt
adiciona corrige remove atualiza refatora melhora ajusta implementa

Ou para inglês:
en
add fix remove update refactor improve adjust implement

## ✅ Regras aplicadas
• O commit deve seguir o padrão Conventional Commits. <br/>
• O verbo após os dois-pontos : será validado. <br/>
• Se não for um verbo permitido, o commit será rejeitado com uma mensagem explicativa.

### 📘 Exemplo válido
````bash
git commit -m "feat(auth): adiciona verificação de token no login"
````
✅ O verbo "adiciona" está na lista permitida.

### ❌ Exemplo inválido
````bash
git commit -m "feat(auth): validar login"
````
⛔ "validar" não está entre os verbos da lista.
<hr/>

### Se curtiu o projeto, me dá um alô no <a href="https://portifolio-react-rosy.vercel.app/" rel="nofollow">LinkedIn</a> 😉
