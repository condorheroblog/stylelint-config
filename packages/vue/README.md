# @condorhero/stylelint-config-vue

<p align="center">
    My stylelint config Vue presets
</p>


<p align="center">
    <a href="https://www.npmjs.com/package/@condorhero/stylelint-config-vue" target="__blank">
        <img src="https://img.shields.io/npm/v/@condorhero/stylelint-config-vue?color=a1b858&label=" alt="NPM version">
    </a>
    <a href="https://www.npmjs.com/package/@condorhero/stylelint-config-vue" target="__blank">
        <img alt="NPM Downloads" src="https://img.shields.io/npm/dm/@condorhero/stylelint-config-vue?color=50a36f&label=">
    </a>
    <br />
</p>

- The(stylelint-config-standard) standard shareable config for Stylelint.
- stylelint-config-recess-order is Recess-based property sort order for Stylelint.
- Lint also for CSS, HTML, markdown, css-modules, bem, SCSS.
- Auto fix for formatting.
- Vue out-of-box.
- Sorted CSS properties.

## Usage

### Install

```bash
pnpm add -D eslint @condorhero/stylelint-config-vue
```

### Config `.stylelintrc`

```json
{
  "extends": "@condorhero/stylelint-config-vue"
}
```

> You can use a [`.stylelintignore`](https://stylelint.io/user-guide/ignore-code#files-entirely) file to ignore specific files, Alternatively, you can add an [ignoreFiles property](https://stylelint.io/user-guide/configure#ignorefiles) within your configuration object.**It is recommended to use the CLI command to specify the format file suffix**, For example: `stylelint src/**/*.{css,html,md}`).

### Add script for package.json

For example:

```json
{
  "scripts": {
    "stylelint": "stylelint **/*.{css,html,md,vue}",
    "stylelint:fix": "stylelint **/*.{css,html,md,vue} --fix"
  }
}
```

### Config VS Code auto fix

Create `.vscode/settings.json`

```json
{
  "css.validate": false,
  "less.validate": false,
  "scss.validate": false,

  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.stylelint": true
  },
  "files.autoSaveDelay": 500,
}
```
> link: https://github.com/stylelint/vscode-stylelint/issues/35

## Check Also

1. [@condorhero/stylelint-config](../../README.md)

## Contribution Guide

Hey there! We are really excited that you are interested in contributing. This is a general contribution guide. Before submitting your contribution, please make sure to take a moment and read through the following guide:

### PackageManager

- latest [pnpm](https://pnpm.io/)

### Update Dependencies

Keeping dependencies up-to-date is one of the important aspects to keep projects alive and getting latest bug fixes on time. We recommend to update dependencies in weekly or bi-weekly intervals.

We use [taze](https://github.com/antfu/taze) to update the dependencies manually most of the time. As deps updating bots like Dependabot or Renovate could be a bit annoying when you have a lot projects.

With [taze](https://github.com/antfu/taze), you can run [taze](https://github.com/antfu/taze) major -Ir to check and select the versions to update interactive. -I stands for --interactive, -r stands for --recursive for monorepo.

**I usually use:**

```zsh
taze -r major && taze -w
```

After bumpping, we install them, runing build and test to verify nothing breaks before pushing to main.

### monorepo

![stylelint-config](https://user-images.githubusercontent.com/47056890/173309864-cb19da18-2531-4407-9f07-f17e00616f90.png)

<details>
<summary>for npm（My backup）</summary>

<br />

```zsh
# add a monorepo，package.json adds a new field workspaces, which you can also add manually
npm init -w ./packages/typescript

# Run "test" script on all packages
npm run test --workspaces
# Tip - this also works:
npm run test  -ws

# To run a command for a specific package, add the --workspace (singular) flag:
# Runs "test" only on package-a
npm run test --workspace package-a

# Tip - this also works:
npm run test -w package-a
```


<br />
</details>


<details>
<summary>for pnpm:</summary>

<br />

```zsh
# add a file pnpm-workspace.yaml
# for example:
packages:
  - 'packages/*'


# Run "test" script on all packages
pnpm run test -r
# Tip - this also works:
pnpm run test --recursive

# To run a command for a specific package, add the --workspace and --filter flag:
# Runs "test" only on package-a
npm run test --recursive --filter="package-a"

# Tip - this also works:
npm run test -r -F="package-a"
```


> Note: pnpm -w is --workspace-root
Run as if pnpm was started in the root of the [workspace](https://pnpm.io/workspaces) instead of the current working directory.

<br />
</details>


### Commit Convention
We use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages, which allows the changelog to be auto-generated based on the commits. Please read the guide through if you aren't familiar with it already.

### EditorConfig

EditorConfig helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.

VS Code need download Plugin - [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig).

## License

[MIT](https://github.com/condorheroblog/stylelint-config/blob/main/LICENSE)
