import React, { Component } from "react"
import { CHANGE_TYPE, CHANGE_VALUE, ADD_VALUE } from "./Store"
import { connect } from "react-redux"

const sideStateToProps = (state) => {
  return {
    selectedItem: state.find(item => item.selected)
  }
}

class Side extends Component {
  render() {
    let selectedItem = this.props.selectedItem;
    return (
      <div className="side">
        <header className="App-header">
          添加字段
        </header>
        <ConnectedSelector selectedItem={selectedItem}/>
        <header className="App-header">
          编辑字段
        </header>
        <ConnectedEditor selectedItem={selectedItem}/>
      </div>
    );
  }
}
export const ConnectedSide = connect(sideStateToProps)(Side)

const editorStateToProps = (state, ownProps) => {
  return {
    type: ownProps.selectedItem ? ownProps.selectedItem.type : undefined,
    requireUpdate: ownProps.selectedItem ? ownProps.selectedItem.requireUpdate : false,
    diploma: ownProps.selectedItem ? ownProps.selectedItem.diploma : null,
    location: ownProps.selectedItem ? ownProps.selectedItem.location : null,
  }
}
class CommonEditor extends Component {
  render() {
    let { type, selectedItem, diploma, location } = this.props;
    // let type = selectedItem ? selectedItem.type : undefined;
    let editor;
    switch (type) {
      case 'text':
        editor = <TextInputEditor content={selectedItem}/>
        break;
      case 'radio':
        editor = <ListEditor label='学历' list={diploma} propName='diploma' content={selectedItem}/>
        break;
      case 'select':
      editor = <ListEditor label='城市' list={location} propName='location' content={selectedItem}/>
        break;
      case 'table':
        editor = <TableEditor content={selectedItem}/>
        break;
      default:
        editor = <div className='vCenter'><p className='non-selected'>没有选中的字段</p></div>
        break;
    }
    return editor;
  }
}
const ConnectedEditor = connect(editorStateToProps)(CommonEditor)
  
class BasicEditor extends Component {
  preRender() {
    return (
      <div>
        <p className="subtitle">标题</p>
        <ConnectedFieldInput name="title" value={this.props.content.title} hideAdd={true}/>
        <p className="description">描述</p>
        <ConnectedFieldInput name="description" value={this.props.content.description} hideAdd={true}/>
      </div>
    )
  };
}
  
class TextInputEditor extends BasicEditor {
  constructor(props) {
    super(props);
  }
  render() {
    let pre = this.preRender();
    return (
      <div className='subcontainer'>
        {pre}
      </div>
    )
  }
}

class ListEditor extends BasicEditor {
  render() {
    const pre = this.preRender();
    // const diploma = this.props.content.diploma;
    const { label, list, propName } = this.props;
    const inputs = list.map(
        (item, index) => <ConnectedFieldInput name={index}
                                              key={propName+index}
                                              value={item} propName={propName}/>
      );
    return (
      <div className='subcontainer'>
        {pre}
        <p>{label}</p>
        {inputs}
      </div>
    )
  }
}

class TableEditor extends BasicEditor {
    render() {
      let pre = this.preRender();
      const abilities = this.props.content.abilities;
      const levels = this.props.content.levels;
      const inputs1 = abilities.map(
          (abi, index) => <ConnectedFieldInput name={abilities.indexOf(abi)} 
                                      index={index} key={index}
                                      value={abi} propName='abilities'/>
      );
      const inputs2 = levels.map(
          (lv, index) => <ConnectedFieldInput name={levels.indexOf(lv)}
                                      value={lv} 
                                      index={index} key={index}
                                      propName='levels'/>
      );
      return (
          <div className='subcontainer'>
              {pre}
              <p>题目</p>
              {inputs1}
              <p>选项</p>
              {inputs2}
          </div>
      )
    }
}

const fieldStateToProps = (state, ownProps) => {
  return {
    value: ownProps.value,
    name: ownProps.name
  }
}
const fieldDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: (e) => {
      dispatch({type: CHANGE_VALUE, key: ownProps.name, value: e.target.value, propName: ownProps.propName})      
    },
    onAdd: () => {
      dispatch({type: ADD_VALUE, propName: ownProps.propName, index: ownProps.name})
    }
  }
}

class FieldInput extends Component {
  componentDidMount () {
    this.refs.inp.value = this.props.value ? this.props.value : "";
  }
  render() {
    let { onChange, onAdd } = this.props;
    let addButton = this.props.hideAdd ? null : <span onClick={onAdd}>+</span>;
    return (
      <div style={{display:'inline-block'}}>
        <input type='text' ref='inp' name={this.props.name} onChange={onChange}/>
        {addButton}
      </div>
    )
  }
}
const ConnectedFieldInput = connect(null, fieldDispatchToProps)(FieldInput)

const selectorStateToProps = (state, ownProps) => {
  return {
    type: ownProps.selectedItem ? ownProps.selectedItem.type : ""
  }
}
class TypeSelector extends Component {
  render() {
    let {type} = this.props;
    return (
      <div>
        <ConnectedTypeItem selectedType={type} type='text' name='单行文本'/>
        <ConnectedTypeItem selectedType={type} type='table' name='矩阵单选'/>
        <ConnectedTypeItem selectedType={type} type='radio' name='单项选择'/>
        <ConnectedTypeItem selectedType={type} type='select' name='下拉框'/>
      </div>
    )
  }
}
const ConnectedSelector = connect(selectorStateToProps)(TypeSelector)

const typeStateToProps = (state, ownProps) => {
  return {
    style: ownProps.type == ownProps.selectedType ? {backgroundColor:'#b9cbe6'} : {}
  }
}
const typeDispatchToProps = (dispatch, ownProps) => {
  return {
    onChangeType: () => (
      dispatch({type: CHANGE_TYPE, formType: ownProps.type})
    )
  }
}
class TypeItem extends Component {
  render() {
    let { style, name, onChangeType } = this.props;
    return (
      <div className="ui-type" onClick={onChangeType} style={style}>{name}</div>
    )
  }
}
const ConnectedTypeItem = connect(typeStateToProps, typeDispatchToProps)(TypeItem)