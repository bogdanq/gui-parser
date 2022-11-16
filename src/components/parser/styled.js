import styled, { css } from "styled-components";
const tabSize = 15;

const colors = {
  tag: "#7d1076",
  attributeValue: "rgb(10, 48, 105)",
  attributeKey: "#91461c",
  text: "#30373e",
  commentColor: "green",
};

const TagWrapper = styled.div`
  margin-left: ${(p) => (p.lvl ?? 0) * tabSize}px;
  color: ${colors.tag};
  font-weight: bold;
  display: block;
  cursor: pointer;
  transition: 0.2s;
  font-size: 12px;
  word-break: break-all;

  &:hover {
    background-color: #ac5c5c37;
  }

  ${(p) =>
    p.isActive &&
    css`
      background-color: #ac5c5c37;
    `}
`;

const AttributesWrapper = styled.span`
  font-weight: normal;
  border: none;
  background: none;
  white-space: normal;
  margin-left: 5px;
`;

export function Tag({
  name,
  isOpened,
  attributes = [],
  lvl,
  onLeave,
  onHover,
  ...props
}) {
  const start = isOpened ? "<" : "</";
  const end = ">";

  return (
    <TagWrapper
      lvl={lvl}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      {...props}
    >
      {start}
      {name}
      {attributes.map((it) => (
        <AttributesWrapper key={it.name}>
          <span style={{ color: colors.attributeKey }}>{it.name}=</span>
          <span style={{ color: colors.attributeValue }}>"{it.value}"</span>
        </AttributesWrapper>
      ))}
      {end}
    </TagWrapper>
  );
}

const TextWrapper = styled.div`
  display: block;
  margin-left: ${(p) => (p.lvl ?? 0) * tabSize}px;
  cursor: pointer;
  color: ${colors.text};
  transition: 0.2s;
  white-space: normal;
  font-size: 11px;
  word-break: break-all;

  &:hover {
    background-color: #ac5c5c37;
  }

  ${(p) =>
    p.isActive &&
    css`
      background-color: #ac5c5c37;
    `}

  ${(p) =>
    p.isComment &&
    css`
      font-size: 12px;
      color: ${colors.commentColor};
    `}
`;

export function Text({ text, lvl, onHover, onLeave }) {
  return (
    <TextWrapper lvl={lvl} onMouseEnter={onHover} onMouseLeave={onLeave}>
      {text}
    </TextWrapper>
  );
}
