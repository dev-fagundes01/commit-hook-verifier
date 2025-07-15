#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const os = require('os')
const { execSync } = require('child_process')

const hookFile = path.join(__dirname, '../hooks/commit-msg')
const args = process.argv.slice(2)
const isGlobal = args.includes('--global')

if (!fs.existsSync(hookFile)) {
  console.error('❌ Hook commit-msg não encontrado.')
  process.exit(1)
}

function makeExecutable(filePath) {
  try {
    fs.chmodSync(filePath, 0o755)
    console.log(`🔧 Permissão de execução aplicada a ${filePath}`)
  } catch (err) {
    console.warn(`⚠️  Não foi possível aplicar permissão ao hook: ${err.message}`)
  }
}

if (isGlobal) {
  const templateDir = path.join(os.homedir(), '.git-templates')
  const hooksDir = path.join(templateDir, 'hooks')
  fs.mkdirSync(hooksDir, { recursive: true })

  const targetPath = path.join(hooksDir, 'commit-msg')
  fs.copyFileSync(hookFile, targetPath)
  makeExecutable(targetPath)

  execSync(`git config --global init.templateDir ${templateDir}`)
  console.log('✅ Hook instalado globalmente com sucesso.')
  console.log('ℹ️  Use "git init" nos seus repositórios para aplicar.')
} else {
  const projectHookDir = path.join(process.cwd(), '.git/hooks')

  if (!fs.existsSync(projectHookDir)) {
    console.error('❌ Pasta .git/hooks não encontrada. Você executou "git init"?')
    process.exit(1)
  }

  const targetPath = path.join(projectHookDir, 'commit-msg')
  fs.copyFileSync(hookFile, targetPath)
  makeExecutable(targetPath)

  console.log('✅ Hook instalado no projeto com sucesso.')
}