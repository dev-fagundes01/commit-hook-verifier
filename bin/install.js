#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const hookFile = path.join(__dirname, '../hooks/commit-msg');
const args = process.argv.slice(2);

const isGlobal = args.includes('--global');
const visible = args.includes('--visible'); // <-- NOVO: não oculta o .commit-lang
const initLangArg = args.find(arg => arg.startsWith('--init-lang='));
const langToInit = initLangArg ? initLangArg.split('=')[1] : null;

const VERBOS = {
  pt: 'adicionar corrigir atualizar remover implementar refatorar melhorar criar',
  en: 'add fix update remove implement refactor improve create',
};

if (!fs.existsSync(hookFile)) {
  console.error('❌ Hook commit-msg não encontrado.');
  process.exit(1);
}

// ✅ Cria o .commit-lang se solicitado e não existir
if (langToInit) {
  if (!VERBOS[langToInit]) {
    console.error(`❌ Idioma "${langToInit}" não suportado.`);
    console.log('Idiomas disponíveis: ' + Object.keys(VERBOS).join(', '));
    process.exit(1);
  }

  const fileContent = `${langToInit}\n${VERBOS[langToInit]}\n`;
  const targetFile = path.join(process.cwd(), '.commit-lang');

  if (!fs.existsSync(targetFile)) {
    fs.writeFileSync(targetFile, fileContent);
    console.log(`✅ Arquivo .commit-lang criado com idioma "${langToInit}"`);
  } else {
    console.log('ℹ️  Arquivo .commit-lang já existe. Nenhuma alteração feita.');
  }
}

if (isGlobal) {
  const templateDir = path.join(os.homedir(), '.git-templates');
  const hooksDir = path.join(templateDir, 'hooks');
  fs.mkdirSync(hooksDir, { recursive: true });
  fs.copyFileSync(hookFile, path.join(hooksDir, 'commit-msg'));
  execSync(`git config --global init.templateDir ${templateDir}`);
  console.log('✅ Hook instalado globalmente com sucesso.');
  console.log('ℹ️  Use "git init" nos seus repositórios para aplicar.');
} else {
  const projectHookDir = path.join(process.cwd(), '.git/hooks');
  if (!fs.existsSync(projectHookDir)) {
    console.error('❌ Pasta .git/hooks não encontrada. Você executou "git init"?');
    process.exit(1);
  }

  fs.copyFileSync(hookFile, path.join(projectHookDir, 'commit-msg'));

  // Dá permissão de execução
  try {
    fs.chmodSync(path.join(projectHookDir, 'commit-msg'), 0o755);
    console.log(`🔧 Permissão de execução aplicada a ${path.join(projectHookDir, 'commit-msg')}`);
  } catch (err) {
    console.warn('⚠️  Falha ao definir permissão de execução no Windows (pode ser esperado).');
  }

  console.log('✅ Hook instalado no projeto com sucesso.');
}

// ✅ Só adiciona ao exclude se NÃO for --visible
if (!visible) {
  const excludePath = path.join(process.cwd(), '.git/info/exclude');
  try {
    const current = fs.readFileSync(excludePath, 'utf8');
    if (!current.includes('.commit-lang')) {
      fs.appendFileSync(excludePath, '\n# Ignore local commit-lang config\n.commit-lang\n');
      console.log('📁 .commit-lang adicionado ao .git/info/exclude');
    } else {
      console.log('📁 .commit-lang já estava no .git/info/exclude');
    }
  } catch (error) {
    console.warn('⚠️  Não foi possível adicionar .commit-lang ao exclude:', error.message);
  }
} else {
  console.log('👀 --visible usado: .commit-lang será visível e pode ser versionado.');
}
