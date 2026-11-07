const UTILITY_TYPE_NAMES = new Set([
  'Awaited',
  'ReturnType',
  'Exclude',
  'Extract',
  'InstanceType',
  'Parameters',
  'ConstructorParameters',
]);

const NAMED_TYPE_HOSTS = new Set([
  'TSTypeAliasDeclaration',
  'TSInterfaceDeclaration',
]);

function typeName(node) {
  if (node.typeName?.type === 'Identifier') {
    return node.typeName.name;
  }

  return null;
}

function isInsideNamedType(ancestors) {
  return ancestors.some((node) => NAMED_TYPE_HOSTS.has(node.type));
}

function reportUnnamed(context, node, messageId, data) {
  if (isInsideNamedType(context.sourceCode.getAncestors(node))) {
    return;
  }

  context.report({ node, messageId, data });
}

module.exports = {
  meta: {
    name: 'eslint-plugin-types',
    version: '1.0.0',
  },
  rules: {
    'no-inline-utility-types': {
      meta: {
        type: 'problem',
        docs: {
          description:
            'Name ReturnType / Awaited / Exclude / Extract aliases; do not inline them in signatures.',
        },
        messages: {
          inline:
            'Name this type ({{name}}). Inline utility types hide intent; declare an alias.',
        },
      },
      create(context) {
        return {
          TSTypeReference(node) {
            const name = typeName(node);

            if (!name || !UTILITY_TYPE_NAMES.has(name)) {
              return;
            }

            reportUnnamed(context, node, 'inline', { name });
          },
        };
      },
    },
    'no-inline-object-types': {
      meta: {
        type: 'problem',
        docs: {
          description:
            'Name object type aliases; do not inline `{ ... }` in signatures.',
        },
        messages: {
          inline:
            'Name this object type. Inline `{ ... }` hides intent; declare an alias.',
        },
      },
      create(context) {
        return {
          TSTypeLiteral(node) {
            reportUnnamed(context, node, 'inline');
          },
        };
      },
    },
  },
};
