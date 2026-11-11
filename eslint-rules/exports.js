const TYPE_DECLARATIONS = new Set([
  'TSTypeAliasDeclaration',
  'TSInterfaceDeclaration',
]);

function specifierName(specifier) {
  if (specifier.exported.type === 'Identifier') {
    return specifier.exported.name;
  }

  return String(specifier.exported.value);
}

function declarationNames(declaration) {
  if (declaration.id?.name) {
    return [declaration.id.name];
  }

  if (declaration.type !== 'VariableDeclaration') {
    return ['anonymous'];
  }

  return declaration.declarations.map((declarator) =>
    declarator.id.type === 'Identifier' ? declarator.id.name : 'anonymous'
  );
}

function isTypeOnlyNamed(node) {
  if (node.exportKind === 'type') {
    return true;
  }

  if (TYPE_DECLARATIONS.has(node.declaration?.type)) {
    return true;
  }

  if (node.declaration || node.specifiers.length === 0) {
    return false;
  }

  return node.specifiers.every((specifier) => specifier.exportKind === 'type');
}

function namedValueExports(node) {
  if (isTypeOnlyNamed(node)) {
    return [];
  }

  if (node.declaration) {
    return declarationNames(node.declaration).map((name) => ({
      node,
      name,
    }));
  }

  return node.specifiers
    .filter((specifier) => specifier.exportKind !== 'type')
    .map((specifier) => ({ node: specifier, name: specifierName(specifier) }));
}

function namedTypeExports(node) {
  if (
    node.exportKind === 'type' ||
    TYPE_DECLARATIONS.has(node.declaration?.type)
  ) {
    if (node.declaration) {
      return declarationNames(node.declaration).map((name) => ({
        node,
        name,
      }));
    }

    return node.specifiers.map((specifier) => ({
      node: specifier,
      name: specifierName(specifier),
    }));
  }

  if (node.declaration || node.specifiers.length === 0) {
    return [];
  }

  return node.specifiers
    .filter((specifier) => specifier.exportKind === 'type')
    .map((specifier) => ({ node: specifier, name: specifierName(specifier) }));
}

function collectExports() {
  const typeExports = [];
  const valueExports = [];

  return {
    typeExports,
    valueExports,
    ExportNamedDeclaration(node) {
      typeExports.push(...namedTypeExports(node));
      valueExports.push(...namedValueExports(node));
    },
    ExportDefaultDeclaration(node) {
      valueExports.push({ node, name: 'default' });
    },
    ExportAllDeclaration(node) {
      if (node.exportKind === 'type') {
        typeExports.push({ node, name: '*' });

        return;
      }

      valueExports.push({ node, name: '*' });
    },
  };
}

module.exports = {
  meta: {
    name: 'eslint-plugin-exports',
    version: '1.0.0',
  },
  rules: {
    'max-value-exports': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Limit runtime exports so each module owns one value.',
        },
        schema: [
          {
            type: 'object',
            properties: {
              max: { type: 'integer', minimum: 0 },
            },
            additionalProperties: false,
          },
        ],
        messages: {
          tooMany:
            'This file has {{count}} runtime exports ({{names}}). Keep at most {{max}}; leave single-caller helpers unexported.',
        },
      },
      create(context) {
        const max = context.options[0]?.max ?? 1;
        const collected = collectExports();

        return {
          ExportNamedDeclaration: collected.ExportNamedDeclaration,
          ExportDefaultDeclaration: collected.ExportDefaultDeclaration,
          ExportAllDeclaration: collected.ExportAllDeclaration,
          'Program:exit'() {
            if (collected.valueExports.length <= max) {
              return;
            }

            const names = collected.valueExports
              .map((item) => item.name)
              .join(', ');

            for (const item of collected.valueExports.slice(max)) {
              context.report({
                node: item.node,
                messageId: 'tooMany',
                data: {
                  count: String(collected.valueExports.length),
                  names,
                  max: String(max),
                },
              });
            }
          },
        };
      },
    },
    'no-mixed-exports': {
      meta: {
        type: 'problem',
        docs: {
          description:
            'Keep value modules and type modules separate. A function file must not export types.',
        },
        messages: {
          mixed:
            'This file exports a value and a type ({{types}}). Keep function modules value-only; put types in a type module.',
        },
      },
      create(context) {
        const collected = collectExports();

        return {
          ExportNamedDeclaration: collected.ExportNamedDeclaration,
          ExportDefaultDeclaration: collected.ExportDefaultDeclaration,
          ExportAllDeclaration: collected.ExportAllDeclaration,
          'Program:exit'() {
            if (
              collected.valueExports.length === 0 ||
              collected.typeExports.length === 0
            ) {
              return;
            }

            const types = collected.typeExports
              .map((item) => item.name)
              .join(', ');

            for (const item of collected.typeExports) {
              context.report({
                node: item.node,
                messageId: 'mixed',
                data: { types },
              });
            }
          },
        };
      },
    },
    'no-barrel': {
      meta: {
        type: 'problem',
        docs: {
          description:
            'Ban barrel files. Import the module that owns the export.',
        },
        messages: {
          index:
            'Do not add index.ts barrels. Import the file that owns the export.',
          star: 'Do not re-export with export *. Import the file that owns the export.',
        },
      },
      create(context) {
        const filename = context.filename.replaceAll('\\', '/');

        return {
          Program(node) {
            if (filename.endsWith('/index.ts')) {
              context.report({ node, messageId: 'index' });
            }
          },
          ExportAllDeclaration(node) {
            if (node.exportKind !== 'type') {
              context.report({ node, messageId: 'star' });
            }
          },
        };
      },
    },
  },
};
