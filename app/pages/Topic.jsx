import React from 'react';
import {connect} from 'react-redux'
import {TopicWall} from './components/TopicWall.jsx';
import {TopicManipulate} from './components/TopicManipulate.jsx';
import {EditBrickCol} from './components/EditBrickCol.jsx'
import {positionChangeSubmit, brickContentSubmit, newBrickSubmit} from '../actions/Topic.js';

class Topic extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isEditing: false,
      isEditingOld: false,
      editingBrickRow: false,
      editingBrickIndex: false
    };
    this.topicId = this.props.params.topicId;
    this.handle_Click_Edit = () => this.state.isEditing ? this.setState({isEditing: false}) : this.setState({isEditing: true});
    this.handle_Click_Brick = this.handle_Click_Brick.bind(this);
    this.handle_dispatch_newBrickSubmit = this.handle_dispatch_newBrickSubmit.bind(this);
    this.handle_dispatch_positionChangeSubmit = this.handle_dispatch_positionChangeSubmit.bind(this);
    this.handle_dispatch_brickContentSubmit = this.handle_dispatch_brickContentSubmit.bind(this);
  }

  handle_Click_Brick(clickedBrickRow, clickedBrickIndex){
    if(this.state.isEditing){
      this.setState({isEditingOld: true, editingBrickRow: clickedBrickRow, editingBrickIndex: clickedBrickIndex})
    }else{
      return true;
    }
  }

  handle_dispatch_positionChangeSubmit(originIndex, originRow, newIndex, newRow){
    this.props.dispatch(positionChangeSubmit(originIndex, originRow, newIndex, newRow, this.topicId))
  }

  handle_dispatch_newBrickSubmit(newEditTopicData, newEditTextData){
    this.props.dispatch(newBrickSubmit(newEditTopicData, newEditTextData, this.topicId))
  }

  handle_dispatch_brickContentSubmit(brickTopicData, brickTextData, row, index, record){
    this.props.dispatch(brickContentSubmit(brickTopicData, brickTextData, row, index, record, this.topicId))
  }

  render(){
    console.log('enter page Topic')
    let topicData = this.props.topicData;
    return(
      <section style={{width: '100%', height: '100%'}}>
        <div className="topic-text">
          <div className="topic-text-header">{topicData[this.topicId].topic}</div>
          <div style={{width: '65%', position: 'relative', left: '10%', border: '1px solid'}}></div>
          <p style={{float: 'right'}}>一小段主題的說明文字，需要有兩行</p>
        </div>
        <div className="topic-taggroup">
          <ul style={{listStyleType: 'none'}}>
            <li><a href="#">#hashtag "1"</a></li>
          </ul>
        </div>
        {
          this.state.isEditing ?
          <div>
            <EditBrickCol editingBrick={this.state.isEditingOld ? topicData[this.topicId][this.state.editingBrickRow][this.state.editingBrickIndex]: false} handle_dispatch_newBrickSubmit={this.handle_dispatch_newBrickSubmit}/>
            <div style={{width:'60%', position: 'absolute', top: '28%', left:'35%'}}>
              <div style={{width: '10%', height: '71.25vh', float:'right'}}>
                <input
                  type="button"
                  value="finish"
                  onClick={this.handle_Click_Edit}/>
              </div>
              <div style={{width: '90%', height: '71.25vh', float:'right', fontSize:'8px'}}>
                <TopicWall topicData = {topicData} topicId={this.topicId} handle_dispatch_positionChangeSubmit={this.handle_dispatch_positionChangeSubmit} handle_Click_Brick = {this.handle_Click_Brick} handle_Click_CellDefault={this.handle_Click_Edit}/>
              </div>
            </div>
          </div>  :
          <div style={{fontSize: '14px'}}>
            <TopicWall topicData = {topicData} topicId={this.topicId} handle_dispatch_positionChangeSubmit={this.handle_dispatch_positionChangeSubmit} handle_Click_Brick = {this.handle_Click_Brick} handle_Click_CellDefault={this.handle_Click_Edit}/>
            <TopicManipulate handle_Click_Edit={this.handle_Click_Edit}/>
          </div>
        }
      </section>
    )
  }
}

function mapStateToProps (state) {
  return {
    token: state.others.token,
    topicData: state.topicData,
    userData: state.others.userData
  }
}

export default connect(mapStateToProps)(
  Topic
)
