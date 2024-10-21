# eslint-plugin

force use cn function on class and className of any JSX element

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `@alicercedigital/eslint-plugin`:

```sh
npm install @alicercedigital/eslint-plugin --save-dev
```

## Usage

In your [configuration file](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file), import the plugin `@alicercedigital/eslint-plugin` and add `force-cn` to the `plugins` key:

```js
export default [
    {
        plugins: {
          // @alicercedigital/eslint-plugin
         "@alicercedigital",
        }
    }
];
```


Then configure the rules you want to use under the `rules` key.

```js
export default [
    {
        plugins: {
          // @alicercedigital/eslint-plugin
         "@alicercedigital",
        },
        rules: {
            "@alicercedigital/force-cn": "error"
        }
    }
];
```



## Configurations

<!-- begin auto-generated configs list -->
TODO: Run eslint-doc-generator to generate the configs list (or delete this section if no configs are offered).
<!-- end auto-generated configs list -->



## Rules

<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                             | Description               | 🔧 |
| :------------------------------- | :------------------------ | :- |
| [forceCn](docs/rules/forceCn.md) | Avoid looping over enums. | 🔧 |

<!-- end auto-generated rules list -->


