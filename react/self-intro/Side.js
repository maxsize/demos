import PropTypes from 'prop-types';
import React, { Component } from "react";
import { CHANGE_TYPE, CHANGE_VALUE } from "./Store";
import { connect } from "react-redux";

export class Side extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    this.props.store.subscribe(() => {
      const state = this.props.store.getState();
      const selectedItem = state.find(item => item.selected);
      if (selectedItem) this.toggle(selectedItem);
    })
  }

  toggle(content) {
    this.setState({
      selectedType:content.type,
      content:content,
    })
  }
  
  render() {
    let editor;
    switch (this.state.selectedType) {
      case 'text':
        editor = <TextInputEditor content={this.state.content}/>
        break;
      case 'radio':
        editor = <RadioEditor content={this.state.content}/>
        break;
      case 'select':
        editor = <LocationEditor content={this.state.content}/>
        break;
      case 'table':
        editor = <TableEditor content={this.state.content}/>
        break;
      default:
        editor = <div className='vCenter'><p className='non-selected'>没有选中的字段</p></div>
        break;
    }
    return (
      <div className="side">
        <header className="App-header">
          添加字段
        </header>
        <TypeSelector store={this.props.store}/>
        <header className="App-header">
          编辑字段
        </header>
        {editor}
      </div>
    );
  }
}
  
class BasicEditor extends Component {
  preRender() {
    return (
      <div>
        <p className="subtitle">标题</p>
        <ConnectedFieldInput name="title" value={this.props.content.title}/>
        <p className="description">描述</p>
        <ConnectedFieldInput name="description" value={this.props.content.description}/>
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

class RadioEditor extends BasicEditor {
  render() {
    const pre = this.preRender();
    const diploma = this.props.content.diploma;
    const inputs = diploma.map(
        dip => <ConnectedFieldInput name={diploma.indexOf(dip)} value={dip} propName='diploma'/>
      );
    return (
      <div className='subcontainer'>
        {pre}
        <p>学历</p>
        {inputs}
      </div>
    )
  }
}

class LocationEditor extends BasicEditor {
  render() {
      let pre = this.preRender();
      const location = this.props.content.location;
      const inputs = location.map(
          loc => <ConnectedFieldInput name={location.indexOf(loc)} value={loc} propName='location'/>
      );
      return (
          <div className='subcontainer'>
              {pre}
              <p>城市</p>
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
          abi => <ConnectedFieldInput name={abilities.indexOf(abi)} 
                                      value={abi} propName='abilities'/>
      );
      const inputs2 = levels.map(
          lv => <ConnectedFieldInput name={levels.indexOf(lv)}
                                      value={lv} 
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

const fieldDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: (e) => {
      dispatch({type: CHANGE_VALUE, key: ownProps.name, value: e.target.value, propName: ownProps.propName})      
    }
  }
}

class FieldInput extends Component {
  // handleChange(e) {
  //   this.props.handleChange(e.target.name, e.target.value);
  // }
  render() {
    let onChange = this.props.onChange;
    return (
      // <input type='text' value={this.props.value} name={this.props.name} onChange={this.handleChange.bind(this)}/>
      <input type='text' value={this.props.value} name={this.props.name} onChange={onChange}/>
    )
  }
}

const ConnectedFieldInput = connect(null, fieldDispatchToProps)(FieldInput)
  
class TypeSelector extends Component {
  state = {selectedType:''}
  componentWillMount() {
    this.props.store.subscribe(() => {
      const state = this.props.store.getState();
      const selectedItem = state.find(item => item.selected);
      this.setState({selectedType:selectedItem.type});
    })
  }

  handleClick(type) {
    this.setState({selectedType:type});
    this.props.store.dispatch({type:CHANGE_TYPE, formType:type});
  }
  render() {
    return (
      <div>
        <TypeItem selectedType={this.state.selectedType} handleClick={this.handleClick.bind(this)} type='text' name='单行文本'/>
        <TypeItem selectedType={this.state.selectedType} handleClick={this.handleClick.bind(this)} type='table' name='矩阵单选'/>
        <TypeItem selectedType={this.state.selectedType} handleClick={this.handleClick.bind(this)} type='radio' name='单项选择'/>
        <TypeItem selectedType={this.state.selectedType} handleClick={this.handleClick.bind(this)} type='select' name='下拉框'/>
      </div>
    )
  }
}

class TypeItem extends Component {
  state = {}
  render() {
    let style = this.props.type == this.props.selectedType ? {backgroundColor:'#b9cbe6'} : {};
    return (
      <div className="ui-type" onClick={(e) => this.props.handleClick(this.props.type)} style={style}>{this.props.name}</div>
    )
  }
}