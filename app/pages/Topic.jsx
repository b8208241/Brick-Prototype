import React from 'react';
import {connect} from 'react-redux'
import {TopicWall} from './components/TopicWall.jsx';
import {TopicManipulate} from './components/TopicManipulate.jsx';
import {EditBrickCol} from './components/EditBrickCol.jsx'
import {positionChangeSubmit, EditedBrickSubmit, RecycleBrickSubmit} from '../actions/Topic.js';

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
    this.keyCount = 0;
    this.handle_Click_Edit = () => this.setState({isEditing: true, editingBrickRow: false, editingBrickIndex: false});
    this.handle_Click_EditClose = () => this.setState({isEditing: false, isEditingOld: false, editingBrickRow: false, editingBrickIndex: false})
    this.handle_Click_Brick = this.handle_Click_Brick.bind(this);
    this.handle_Click_BrickEdit = this.handle_Click_BrickEdit.bind(this);
    this.handle_dispatch_EditedBrickSubmit = (tagEditorData, contentEditorData) => this.props.dispatch(EditedBrickSubmit(tagEditorData, contentEditorData, this.state.editingBrickRow, this.state.editingBrickIndex, this.topicId, this.props.userData.userName));
    this.handle_dispatch_positionChangeSubmit = (originIndex, originRow, newIndex, newRow) => this.props.dispatch(positionChangeSubmit(originIndex, originRow, newIndex, newRow, this.topicId));
    this.handle_dispatch_RecycleBrickSubmit = (clickedBrickRow, clickedBrickIndex) => this.props.dispatch(RecycleBrickSubmit(clickedBrickRow, clickedBrickIndex, this.topicId, this.props.userData.userName));
  }

  handle_Click_Brick(clickedBrickRow, clickedBrickIndex){
    if(this.state.isEditing){
      this.setState({isEditingOld: true, editingBrickRow: clickedBrickRow, editingBrickIndex: clickedBrickIndex})
    }else{
      return true;
    }
  }

  handle_Click_BrickEdit(clickedBrickRow, clickedBrickIndex){
    if(this.state.isEditing){
      this.setState({isEditingOld: false, editingBrickRow: clickedBrickRow, editingBrickIndex: clickedBrickIndex})
    }else{
      this.setState({isEditing: true, editingBrickRow: clickedBrickRow, editingBrickIndex: clickedBrickIndex})
    }
  }

  render(){
    console.log('enter page Topic')
    let topicData = this.props.topicData;
    let keyCount = this.keyCount;
    let tagList = topicData[this.topicId].hashTag.map(
      function(obj){
        keyCount = keyCount+1;
        return <li key={obj+"_"+keyCount}>{obj}</li>
      }
    )
    return(
      <section style={{width: '100%', height: '100%'}}>
        <div className="topic-text">
          <div className="topic-text-header">{topicData[this.topicId].topic}</div>
          <div style={{width: '65%', position: 'relative', left: '10%', border: '1px solid'}}></div>
          <p style={{float: 'right'}}>一小段主題的說明文字，需要有兩行</p>
        </div>
        <div className="topic-taggroup">
          <ul>
            {tagList}
          </ul>
        </div>
        {
          this.state.isEditing ?
          <div>
            <EditBrickCol
              isEditingOld={this.state.isEditingOld}
              editingBrick={this.state.isEditingOld ? topicData[this.topicId][this.state.editingBrickRow][this.state.editingBrickIndex]: false}
              handle_dispatch_EditedBrickSubmit={this.handle_dispatch_EditedBrickSubmit}/>
            <div className="topic-ref">
              <div className="topic-ref-side">
                <input
                  value="X"
                  className="topic-ref-side-input-close"
                  onClick={this.handle_Click_EditClose}
                  readOnly/>
              </div>
              <div className="topic-ref-scroll">
                <TopicWall
                  topicData = {topicData}
                  topicId={this.topicId}
                  editingBrickRow={this.state.editingBrickRow}
                  editingBrickIndex={this.state.editingBrickIndex}
                  handle_dispatch_positionChangeSubmit={this.handle_dispatch_positionChangeSubmit}
                  handle_Click_Brick = {this.handle_Click_Brick}
                  handle_Click_BrickEdit={this.handle_Click_BrickEdit}/>
              </div>
            </div>
          </div>  :
          <div style={{fontSize: '14px'}}>
            <TopicWall
              topicData = {topicData}
              topicId={this.topicId}
              handle_dispatch_positionChangeSubmit={this.handle_dispatch_positionChangeSubmit}
              handle_dispatch_RecycleBrickSubmit={this.handle_dispatch_RecycleBrickSubmit}
              handle_Click_Brick = {this.handle_Click_Brick}
              handle_Click_BrickEdit={this.handle_Click_BrickEdit}
              />
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
