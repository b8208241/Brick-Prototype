import React from 'react';
import {TagList} from './TagList.jsx';
import {QuestionList} from './QuestionList.jsx';
import {HyphenList} from './HyphenList.jsx';

export class BlockSubTopic extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tagList: false,
      questionList: false,
      hyphenList: false
    }
  }

  render(){
    return(
      <div className="topic-wall-row-block-subtopic" style={this.props.topicStatus==='isTop'?{zIndex: '6'}:{zIndex: '0'}}>
        <div className="topic-wall-row-block-subtopic-controlbar" style={this.props.topicStatus==='isTop'?{display: 'none'}:{display: ''}}>
          <span onClick={(event) => this.setState({tagList: true, questionList: false, hyphenList: false})}>#</span>
          <span onClick={(event) => this.setState({tagList: false, questionList: false, hyphenList: true})}>{"-"}</span>
          <span onClick={(event) => this.setState({tagList: false, questionList: true, hyphenList: false})}>{"?"}</span>
        </div>
        <div className="topic-wall-row-block-subtopic-listsdisplay">
          <div style={this.props.topicStatus==='isTop'?{display: 'none'}:{display: ''}}>
            {
              this.state.tagList&&
              <TagList
                topicThis={this.props.topicThis}
                handle_Click_Tag={this.props.search_SubTopic}/>
            }
            {
              this.state.questionList&&
              <QuestionList
                questions={this.props.topicThis.questions}
                handle_Click_Question={this.props.search_SubTopic}/>
            }
            {
              this.state.hyphenList&&
              <HyphenList
                hyphens={this.props.topicThis.hyphens}
                handle_Click_Hyphen={this.props.search_SubTopic}/>
            }
          </div>
          <span>一首搖滾上月球~</span>
        </div>
      </div>
    )
  }
}
