import React from 'react';
import {render} from 'react-dom';
import lexer from './himalaya/lexer';
import parser from './himalaya/parser';
import {format} from './himalaya/format';
import {
  voidTags,
  closingTags,
  childlessTags,
  closingTagAncestorBreakers
} from './tags';

import './index.css';

const parseDefaults = {
  voidTags,
  closingTags,
  childlessTags,
  closingTagAncestorBreakers,
  includePositions: false
};

let TOKENS = [];

function parse(str, options = parseDefaults) {
  const tokens = lexer(str, options);
  const nodes = parser(tokens, options);
  TOKENS = JSON.parse(JSON.stringify(tokens));
  return format(nodes, options);
}

let str =
  `<div class="header">
  <p class="title">MOVIE</p>
  <ul>
    <li>
      <a class="link">HOME</a>
    </li>
    <li>
      <a class="link">NEWS</a>
    </li>
  </ul>
</div>`;

let r = parse(str);

console.log('r');
console.log(r);
console.log(TOKENS);

const App = (
    <ul>
      {
        TOKENS.map((token, index) => {
          if (token.close) {
            token.closeCn = 'true';
          } else if (token.close === false) {
            token.closeCn = 'false';
          } else if (token.close === undefined) {
            token.closeCn = false;
          }

          return (<li key={index}>
            type: {token.type}
            <ul>

              {token.closeCn ? <li>close: {token.closeCn}</li> : null}
              {token.content ? <li>content: {token.content}</li> : null}
              {
                token.position ?
                  <li>
                    position:
                    <ul>
                      {
                        token.position.start ?
                          <li>
                            <b>start: </b>
                            <span className="pr-5">index: {token.position.start.index}, </span>
                            <span className="pr-5">line: {token.position.start.line}, </span>
                            <span className="pr-5">column: {token.position.start.column}</span>
                          </li>
                          : null
                      }
                      {
                        token.position.end ?
                          <li>
                            <b>end: </b>
                            <span className="pr-5">index: {token.position.end.index}, </span>
                            <span className="pr-5">line: {token.position.end.line}, </span>
                            <span className="pr-5">column: {token.position.end.column}</span>
                          </li>
                          : null
                      }
                    </ul>
                  </li>
                  : null
              }
            </ul>
          </li>);
        })
      }
    </ul>
  )
;

render(App, window.root);
