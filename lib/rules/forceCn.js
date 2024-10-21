module.exports = {
  create(context) {
    return {
      JSXAttribute(node) {
        if (node.name.name === "class" && node.value?.type === "Literal") {
          context.report({
            node,
            messageId: "messageIdForSomeFailure",
            fix(fixer) {
              return fixer.replaceText(node, `class={cn("bundinha")}`);
            },
          });
        }
      },
    };
  },
  meta: {
    docs: {
      description: "Avoid looping over enums.",
    },
    type: "suggestion",
    messages: {
      messageIdForSomeFailure: "Error message for some failure",
    },
    fixable: "code",
    schema: [], // no options
  },
  name: "no-loop-over-enum",
  defaultOptions: [],
};
