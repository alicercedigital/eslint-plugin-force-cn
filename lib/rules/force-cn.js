// @ts-check
"use strict";

/**
 * @param {string} value
 */
const getClasses = (value) => {
  if (!value) {
    return [];
  }

  return value.split(/\s+/);
};

/**
 * @type {import('eslint').Rule.RuleMetaData}
 */
const meta = {
  type: "suggestion",

  docs: {
    description:
      "suggest using cn() or other defined function in JSX className/class or other defined attribute",
    category: "Stylistic Issues",
    recommended: true,
  },

  fixable: "code",
  hasSuggestions: true,

  messages: {
    useFunction:
      "The className has more than {{ maxSpaceSeparatedClasses }} classes. Use {{ functionName }}() instead.",
    suggestToUse: 'Convert to {{ functionName }}("...", "...", ...) properly',
  },

  schema: [
    {
      type: "object",
      functionName: false,
      properties: {
        maxSpaceSeparatedClasses: {
          type: "number",
        },
        functionName: {
          type: "string",
        },
      },
    },
  ],
};

module.exports = {
  meta,
  create(context) {
    const [params = {}] = context.options;
    const { maxSpaceSeparatedClasses = 0, functionName = "cn" } = params;

    return {
      /**
       * @param {import('estree-jsx').JSXAttribute} node
       */
      JSXAttribute(node) {
        if (node.name.name !== "className" && node.name.name !== "class") {
          return;
        }

        switch (node.value?.type) {
          // className="bg-blue-300 block"
          case "Literal": {
            if (typeof node.value.value !== "string") {
              return;
            }

            return suggestToUseFunctionIfViolated(node, node.value.value);
          }

          // className={...}
          case "JSXExpressionContainer": {
            // className={`bg-blue-300 block`}
            if (node.value.expression.type === "TemplateLiteral") {
              const { quasis } = node.value.expression;
              // ignore if template has multiple elements
              // like `bg-blue-300 block ${1} hoge`
              if (quasis.length !== 1) {
                return;
              }

              return suggestToUseFunctionIfViolated(node, quasis[0].value.raw);
            }
          }
        }
      },
    };

    /**
     * @param {import('estree-jsx').JSXAttribute} node
     * @param {string} classString
     */
    function suggestToUseFunctionIfViolated(node, classString) {
      const classes = getClasses(classString);

      if (classes.length <= maxSpaceSeparatedClasses) {
        return;
      }

      /**
       * @param {import('eslint').Rule.RuleFixer} fixer
       * @returns {import('eslint').Rule.Fix}
       */
      function fix(fixer) {
        return fixer.replaceText(
          node,
          `${node.name.name}={${functionName}(${classes
            .map((className) => JSON.stringify(className))
            .join(", ")})}`
        );
      }

      context.report({
        node,
        messageId: "useFunction",
        data: {
          maxSpaceSeparatedClasses,
          functionName,
        },
        suggest: [{ messageId: "suggestToUse", data: { functionName }, fix }],
        fix,
      });
    }
  },
};
