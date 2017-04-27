import React from 'react';
import {connect} from 'react-redux'
import {ModalBox} from './components_General/ModalBox.jsx';
import {ModalBackground} from './components_General/ModalBackground.jsx';
import {TopicWall} from './components_Topic/TopicWall.jsx';
import {TopicLog} from './components_Topic/TopicLog.jsx';
import {EditBrickCol} from './components_Topic/EditBrickCol.jsx';
import {initialPosition} from '../tools/specialForTopic.js';
import {LogSubmit, positionChangeSubmit, EditedContentSubmit, RecycleBrickSubmit} from '../actions/Topic.js';

class Topic extends React.Component {
  constructor(props){
    super(props);
    const defaultState = {
      isTop: true,
      isEditing: false,
      isEditingOld: false,
      editingPosition: [],
      editingBrickRow: false,
      editingBrickIndex: false,
      searchResult: false
    };
    this.state = defaultState;
    this.topicId = this.props.params.topicId;
    this.open_EditBrickCol = this.open_EditBrickCol.bind(this);
    this.close_TopView = () => this.setState({isTop: false, editingBrickRow: initialPosition(this.props.topicData[this.props.params.topicId]).row, editingBrickIndex: initialPosition(this.props.topicData[this.props.params.topicId]).index});
    this.close_EditBrickCol = () => this.setState({isEditing: false, isEditingOld: false, editingPosition: []});
    this.search_SubTopic = (searchResult) => this.state.searchResult ? this.setState({searchResult: false}) : this.setState({searchResult: searchResult});
    this.back_Top = () => this.setState(defaultState);
    this.handle_Drop_CellFocus = (newIndex, newRow) => this.setState({editingBrickRow: newRow, editingBrickIndex: newIndex});
    this.handle_dispatch_EditedContentSubmit = (subEditorData, contentEditorData, hashTagObj, hyphenObj, questionMarkobj) => this.props.dispatch(EditedContentSubmit(subEditorData, contentEditorData, hashTagObj, hyphenObj, questionMarkobj, this.state.editingPosition[0], this.state.editingPosition[1], this.topicId, this.props.userData.userName));
    this.handle_dispatch_positionChangeSubmit = (originIndex, originRow, newIndex, newRow) => this.props.dispatch(positionChangeSubmit(originIndex, originRow, newIndex, newRow, this.topicId, this.props.userData.userName));
    this.handle_dispatch_RecycleBrickSubmit = (clickedBrickRow, clickedBrickIndex) => this.props.dispatch(RecycleBrickSubmit(clickedBrickRow, clickedBrickIndex, this.topicId, this.props.userData.userName));
    this.handle_dispatch_LogSubmit = (logDraftData) => this.props.dispatch(LogSubmit(logDraftData, this.topicId, this.props.userData.userName));
  }

  open_EditBrickCol(clickedBrickRow, clickedBrickIndex, source) {
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
    let topicThis = this.props.topicData[this.topicId];

    return(
        <section className="topic">
            {
              this.state.isTop &&
              <TopicLog
                logData = {topicThis.log}
              ></TopicLog>
            }
            <TopicWall
              topicThis = {topicThis}
              topicId={this.topicId}
              topicStatus={this.state.isTop? "isTop" : this.state.isEditing ? "isEditing" : false}
              editingPosition={this.state.editingPosition}
              editingBrickRow={this.state.editingBrickRow}
              editingBrickIndex={this.state.editingBrickIndex}
              searchResult={this.state.searchResult}
              open_EditBrickCol = {this.open_EditBrickCol}
              search_SubTopic={this.search_SubTopic}
              back_Top = {this.back_Top}
              close_TopView = {this.close_TopView}
              handle_Drop_CellFocus = {this.handle_Drop_CellFocus}
              handle_dispatch_LogSubmit = {this.handle_dispatch_LogSubmit}
              handle_dispatch_positionChangeSubmit={this.handle_dispatch_positionChangeSubmit}
              handle_dispatch_RecycleBrickSubmit={this.handle_dispatch_RecycleBrickSubmit}
              />
            {
              this.state.isEditing &&
              <ModalBox>
                <ModalBackground className={"topic-editbrick-modalbackground"} onClose={this.close_EditBrickCol}>
                  <EditBrickCol
                    editingOld={this.state.isEditingOld ? topicThis[this.state.editingPosition[0]][this.state.editingPosition[1]]: false}
                    editingPosition = {String(this.state.editingPosition[0])+String(this.state.editingPosition[1])}
                    handle_dispatch_EditedContentSubmit={this.handle_dispatch_EditedContentSubmit}
                    close_EditBrickCol={this.close_EditBrickCol}/>
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
