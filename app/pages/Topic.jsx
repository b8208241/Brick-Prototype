import React from 'react';
import {connect} from 'react-redux'
import {ModalBox} from './components_General/ModalBox.jsx';
import {TopicWall} from './components_Topic/TopicWall.jsx';
import {EditCol} from './components_Topic/EditCol.jsx';
import {positionChangeSubmit, EditedContentSubmit, RecycleBrickSubmit} from '../actions/Topic.js';

class Topic extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isEditing: false,
      isEditingOld: false,
      editingBrickRow: false,
      editingBrickIndex: false,
      searchResult: false
    };
    this.topicId = this.props.params.topicId;
    this.open_EditCol = this.open_EditCol.bind(this);
    this.close_EditCol = () => this.setState({isEditing: false, isEditingOld: false, editingBrickRow: false, editingBrickIndex: false});
    this.search_SubTopic = (searchResult) => this.setState({searchResult: searchResult});
    this.handle_dispatch_EditedContentSubmit = (subEditorData, contentEditorData, hashTagObj, hyphenObj, questionMarkobj) => this.props.dispatch(EditedContentSubmit(subEditorData, contentEditorData, hashTagObj, hyphenObj, questionMarkobj, this.state.editingBrickRow, this.state.editingBrickIndex, this.topicId, this.props.userData.userName));
    this.handle_dispatch_positionChangeSubmit = (originIndex, originRow, newIndex, newRow) => this.props.dispatch(positionChangeSubmit(originIndex, originRow, newIndex, newRow, this.topicId));
    this.handle_dispatch_RecycleBrickSubmit = (clickedBrickRow, clickedBrickIndex) => this.props.dispatch(RecycleBrickSubmit(clickedBrickRow, clickedBrickIndex, this.topicId, this.props.userData.userName));
  }

  open_EditCol(clickedBrickRow, clickedBrickIndex, source) {
    let editingOld = source === "newBrick" ? false : true ;
    this.setState({isEditing: true, isEditingOld: editingOld, editingBrickRow: clickedBrickRow, editingBrickIndex: clickedBrickIndex, searchResult: false})
  }

  render(){
    console.log('enter page Topic')
    let topicData = this.props.topicData;

    return(
      <section style={{width: '100%', height: '100%'}}>
          <div style={{fontSize: '14px'}}>
            <TopicWall
              topicData = {topicData}
              topicId={this.topicId}
              editingStatus={this.state.isEditing}
              searchResult={this.state.searchResult}
              open_EditCol = {this.open_EditCol}
              search_SubTopic={this.search_SubTopic}
              handle_dispatch_positionChangeSubmit={this.handle_dispatch_positionChangeSubmit}
              handle_dispatch_RecycleBrickSubmit={this.handle_dispatch_RecycleBrickSubmit}
              />
          </div>
          {
            this.state.isEditing &&
            <ModalBox>
              <EditCol
                editingOld={this.state.isEditingOld ? topicData[this.topicId][this.state.editingBrickRow][this.state.editingBrickIndex]: false}
                editingPosition = {String(this.state.editingBrickRow)+ String(this.state.editingBrickIndex)}
                handle_dispatch_EditedContentSubmit={this.handle_dispatch_EditedContentSubmit}
                close_EditCol={this.close_EditCol}/>
            </ModalBox>
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
