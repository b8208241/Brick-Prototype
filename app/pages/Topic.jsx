import React from 'react';
import {connect} from 'react-redux'
import {ModalBox} from './components_General/ModalBox.jsx';
import {ModalBackground} from './components_General/ModalBackground.jsx';
import {TopicWall} from './components_Topic/TopicWall.jsx';
import {EditCol} from './components_Topic/EditCol.jsx';
import {initialPosition} from '../sagas/specialForTopic.js';
import {positionChangeSubmit, EditedContentSubmit, RecycleBrickSubmit} from '../actions/Topic.js';

class Topic extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isEditing: false,
      isEditingOld: false,
      editingPosition: [],
      editingBrickRow: initialPosition(this.props.topicData[this.props.params.topicId]).row,
      editingBrickIndex: initialPosition(this.props.topicData[this.props.params.topicId]).index,
      searchResult: false
    };
    this.topicId = this.props.params.topicId;
    this.open_EditCol = this.open_EditCol.bind(this);
    this.close_EditCol = () => this.setState({isEditing: false, isEditingOld: false, editingPosition: []});
    this.search_SubTopic = (searchResult) => this.state.searchResult ? this.setState({searchResult: false}) : this.setState({searchResult: searchResult});
    this.handle_Drop_CellFocus = (newIndex, newRow) => this.setState({editingBrickRow: newRow, editingBrickIndex: newIndex});
    this.handle_dispatch_EditedContentSubmit = (subEditorData, contentEditorData, hashTagObj, hyphenObj, questionMarkobj) => this.props.dispatch(EditedContentSubmit(subEditorData, contentEditorData, hashTagObj, hyphenObj, questionMarkobj, this.state.editingPosition[0], this.state.editingPosition[1], this.topicId, this.props.userData.userName));
    this.handle_dispatch_positionChangeSubmit = (originIndex, originRow, newIndex, newRow) => this.props.dispatch(positionChangeSubmit(originIndex, originRow, newIndex, newRow, this.topicId));
    this.handle_dispatch_RecycleBrickSubmit = (clickedBrickRow, clickedBrickIndex) => this.props.dispatch(RecycleBrickSubmit(clickedBrickRow, clickedBrickIndex, this.topicId, this.props.userData.userName));
  }

  open_EditCol(clickedBrickRow, clickedBrickIndex, source) {
    let editingOld = source === "newBrick" ? false : true ;
    if(editingOld){
      this.setState({isEditing: true, isEditingOld: editingOld, editingPosition: [clickedBrickRow, clickedBrickIndex], searchResult: false})
      return;
    }
    this.setState({isEditing: true, isEditingOld: editingOld, editingPosition: [clickedBrickRow, clickedBrickIndex], editingBrickRow: clickedBrickRow, editingBrickIndex: clickedBrickIndex, searchResult: false})
  }

  componentWillReceiveProps(nextProps){
    console.log('Topic will Receive Props')
    if(this.state.isEditing){
      if(!this.state.isEditingOld){
        let suggestPosition = initialPosition(nextProps.topicData[this.topicId], this.state.editingPosition[0], this.state.editingPosition[1]);
        this.setState({isEditing: false, isEditingOld: false, editingPosition: [], editingBrickRow: suggestPosition.row, editingBrickIndex: suggestPosition.index});
      }else{
        this.setState({isEditing: false, isEditingOld: false, editingPosition: []});
      }
    }
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
              editingPosition={this.state.editingPosition}
              editingBrickRow={this.state.editingBrickRow}
              editingBrickIndex={this.state.editingBrickIndex}
              searchResult={this.state.searchResult}
              open_EditCol = {this.open_EditCol}
              search_SubTopic={this.search_SubTopic}
              handle_Drop_CellFocus = {this.handle_Drop_CellFocus}
              handle_dispatch_positionChangeSubmit={this.handle_dispatch_positionChangeSubmit}
              handle_dispatch_RecycleBrickSubmit={this.handle_dispatch_RecycleBrickSubmit}
              />
          </div>
          {
            this.state.isEditing &&
            <ModalBox>
              <ModalBackground onClose={this.close_EditCol}>
                <EditCol
                  editingOld={this.state.isEditingOld ? topicData[this.topicId][this.state.editingPosition[0]][this.state.editingPosition[1]]: false}
                  editingPosition = {String(this.state.editingPosition[0])+String(this.state.editingPosition[1])}
                  handle_dispatch_EditedContentSubmit={this.handle_dispatch_EditedContentSubmit}
                  close_EditCol={this.close_EditCol}/>
              </ModalBackground>
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
