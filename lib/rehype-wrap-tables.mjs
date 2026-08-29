/**
 * Sveper varje <table> i en scrollbar behållare.
 *
 * Innehållet skriver tabellerna som rå HTML i MDX, vilket blir
 * mdxJsxFlowElement-noder i stället för vanliga element. Därför måste
 * plugin:et hantera båda sorterna — annars scrollar de breda
 * böjningstabellerna ut över sidan i stället för inuti sin egen ruta.
 */
export default function rehypeWrapTables() {
  return tree => walk(tree);
}

function isTable(node) {
  return (
    (node.type === 'element' && node.tagName === 'table') ||
    (node.type === 'mdxJsxFlowElement' && node.name === 'table') ||
    (node.type === 'mdxJsxTextElement' && node.name === 'table')
  );
}

function wrapper(node) {
  return {
    type: 'element',
    tagName: 'div',
    properties: {className: ['tableScroll']},
    children: [node],
  };
}

function walk(node) {
  if (!node || !Array.isArray(node.children)) return;

  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];

    // Redan svept? Låt den vara.
    const already =
      node.type === 'element' &&
      node.tagName === 'div' &&
      (node.properties?.className || []).includes('tableScroll');

    if (isTable(child) && !already) {
      node.children[i] = wrapper(child);
      walk(child);
      continue;
    }
    walk(child);
  }
}
