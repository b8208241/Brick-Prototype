import React from 'react';
import {CompositeDecorator} from 'draft-js';
//function CompositeDecorator(){}

export const compositeDecorator = {
  tagEditor: new CompositeDecorator([
    {
      strategy: hashtagStrategy,
      component: HashtagSpan,
    }
  ])
}

const regex_HashTag = /\#[\w\u0590-\u05ff]+/g;

function hashtagStrategy(contentBlock, callback, contentState) {
  console.log('hashtagStrategy')
  findWithRegex(regex_HashTag, contentBlock, callback);
}

function findWithRegex(regex, contentBlock, callback) {
  console.log('findWithRegex')
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    console.log('findWithRegex, while')
    console.log(callback)
    start = matchArr.index;
    console.log(start)
    console.log(start + matchArr[0].length)
    callback(start, start + matchArr[0].length);
  }
}

class HashtagSpan extends React.Component {
  constructor(props){
    super(props);
  };

  render() {
    console.log('enter HashtagSpan')
    return(
      <span style={{textDecoration: 'underline'}} data-offset-key={this.props.offsetKey}>{this.props.children}</span>
    )
  }
}
