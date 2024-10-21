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
      description:
        "force use cn function on class and className of any JSX element",
    },
    type: "suggestion",
    messages: {
      messageIdForSomeFailure:
        "You need to use cn function on class and className of any JSX element.",
    },
    fixable: "code",
    schema: [], // no options
  },
  name: "no-loop-over-enum",
  defaultOptions: [],
};
