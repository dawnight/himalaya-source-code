// 拆分数组里的第一个匹配到的字符
export const splitHead = (str, seq) => {
  const idx = str.indexOf(seq);
  if (idx === -1) {
    return [str];
  }
  return [str.substr(0, idx), str.substring(idx + 1)];
};

// 如果一个字符串首尾都有单引号 ' 或双引号 "，那么就去掉引号
export const unquote = str => {
  let start = str.charAt(0);
  let end = str.length - 1;
  let isQuoteStart = start === "'" || start === '"';
  if (isQuoteStart && str.charAt(end)) {
    return str.slice(1, end);
  }
  return str;
};

export const formatAttributes = attributes => {
  return attributes.map(attribute => {
    const parts = splitHead(attribute.trim(), '=');
    const key = parts[0];
    const value = typeof parts[1] === 'string' ? unquote(parts[1]) : null;
    return {
      key, value
    };
  });
};

export const format = (nodes, options = {}) => {
  return nodes.map(node => {
    const type = node.type;
    const outputNode = type === 'element'? {
      type,
      tagName: node.tagName.toLowerCase(),
      attributes: formatAttributes(node.attributes),
      children: format(node.children, options)
    }: {
      type,
      content: node.content
    };
    if (options.includePositions) {
      outputNode.position = options.position;
    }
    return outputNode;
  });
};
