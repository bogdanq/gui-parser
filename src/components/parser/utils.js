export function nodeParser(elements) {
  const queue = [...elements];
  const result = [];
  const map = new WeakMap();
  let id = 0;

  while (queue.length > 0) {
    const node = queue.shift();
    const nodes = node.childNodes;

    const parentNode = node.parentElement ? map.get(node.parentElement) : null;

    const attrs = node.attributes
      ? [...node.attributes].map((it) => ({
          name: it.name,
          value: it.value,
        }))
      : [];

    const nodeInfo = {
      name: node.localName || node.nodeName,
      children: [],
      value: node.textContent?.replace(/  +|\n/gi, " ")?.trim() ?? "",
      node,
      attrs,
      id,
    };

    const isEmpty =
      (nodeInfo.name === "#text" || nodeInfo.name === "#comment") &&
      nodeInfo.value === "";

    if (parentNode && !isEmpty) {
      parentNode.children.push(nodeInfo);
    }

    if (!parentNode) {
      result.push(nodeInfo);
    }

    map.set(node, nodeInfo);
    queue.unshift(...[...nodes]);

    id += 1;
  }

  return result[0];
}

function getRect(target) {
  if (target.nodeName === "#text" || target.nodeName === "#comment") {
    const range = target.ownerDocument.createRange();
    range.selectNode(target);

    const rect = range.getBoundingClientRect();

    return rect;
  }

  const rect = target.getBoundingClientRect();

  return rect;
}

export function getElementBounging(target) {
  const rect = getRect(target);

  return {
    width: rect.width,
    height: rect.height,
    top: rect.top + target.scrollTop,
    left: rect.left + target.scrollLeft,
  };
}
