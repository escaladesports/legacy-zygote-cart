# Contributing

Contributions are always welcome, no matter how large or small!

## Setup

> Install yarn on your system: [https://yarnpkg.com/en/docs/install](https://yarnpkg.com/en/docs/install)

### Install dependencies

> Only required on the first run, subsequent runs can use `yarn dev` to both
bootstrap and run the development server.

```sh
$ git clone https://github.com/escaladesports/zygote-cart
$ cd zygote-cart
```

### Run locally

```sh
$ yarn dev
```

The cart's source files are located in `src/export`.

## Available scripts

### `dev`

Starts the development server.

#### Usage

```sh
$ yarn dev
```

### `build`

Builds the Zygote module packages.

#### Usage

```sh
yarn build
```

### `test`

Runs all the Zygote package tests.

#### Usage

```sh
yarn test
```

### `lint`

Lints code and docs according to our style guidelines.

#### Usage

```sh
yarn lint
```

## Pull Requests

We actively welcome your pull requests!

Zygote uses the [Forking Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows#forking-workflow) + [Feature Branches](https://www.atlassian.com/git/tutorials/comparing-workflows#feature-branch-workflow). Additionally, PR's should be [rebased](https://www.atlassian.com/git/tutorials/merging-vs-rebasing) on master when opened, and again before merging.

1. Fork the repo.
2. Create a branch from `master`. If you're addressing a specific issue, prefix your branch name with the issue number.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Run `yarn test` and ensure the test suite passes.
5. Use `yarn lint` to lint your code.
6. PR's must be rebased before merge (feel free to ask for help).

## License

By contributing to Zygote, you agree that your contributions will be licensed
under its [MIT license](LICENSE).