import React, { Component } from "react";
import { CHANGE_TYPE, CHANGE_VALUE } from "./Store";

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

    handleValueChange(key, value)
    {
      this.props.store.dispatch({type:CHANGE_VALUE, key:key, value:value});
    }
    
    render() {
      let editor;
      switch (this.state.selectedType) {
        case 'text':
          editor = <TextInputEditor content={this.state.content} handleChange={this.handleValueChange.bind(this)}/>
          break;
        case 'radio':
          editor = <RadioEditor content={this.state.content} handleChange={this.handleValueChange.bind(this)}/>
          break;
        case 'select':
          editor = <LocationEditor content={this.state.content} handleChange={this.handleValueChange.bind(this)}/>
          break;
        case 'table':
          editor = <TableEditor content={this.state.content} handleChange={this.handleValueChange.bind(this)}/>
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
    constructor(props) {
      super(props);
      this.state = {}
    }

    wrapChange(index, value, key) {
        const newArr = this.props.content[key].map(dip => dip);
        newArr[index] = value;
        this.props.handleChange(key, newArr);
    }
  
    preRender() {
      return (
        <div>
          <p className="subtitle">标题</p>
          <FieldInput name="title" value={this.props.content.title} handleChange={this.props.handleChange}/>
          <p className="description">描述</p>
          <FieldInput name="description" value={this.props.content.description} handleChange={this.props.handleChange}/>
        </div>
      )
    };
  }
  
  class TextInputEditor extends BasicEditor {
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
    handleChange(name, value) {
        this.wrapChange(name, value, 'diploma');
    }

    render() {
      const pre = this.preRender();
      const diploma = this.props.content.diploma;
      const inputs = diploma.map(
          dip => <FieldInput name={diploma.indexOf(dip)} value={dip} handleChange={this.handleChange.bind(this)}/>
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
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange(name, value) {
        this.wrapChange(name, value, 'location');
    }
    render() {
        let pre = this.preRender();
        const location = this.props.content.location;
        const inputs = location.map(
            loc => <FieldInput name={location.indexOf(loc)} value={loc} handleChange={this.handleChange.bind(this)}/>
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
      constructor(props) {
          super(props);
          this.state = {};
      }
      handleChange(name, value, key) {
          this.wrapChange(name, value, key);
      }
      render() {
        let pre = this.preRender();
        const abilities = this.props.content.abilities;
        const levels = this.props.content.levels;
        const inputs1 = abilities.map(
            abi => <FieldInput name={abilities.indexOf(abi)} 
                               value={abi}
                               handleChange={(name, value) => {this.handleChange(name, value, 'abilities')}}/>
        );
        const inputs2 = levels.map(
            lv => <FieldInput name={levels.indexOf(lv)}
                              value={lv} 
                              handleChange={(name, value) => {this.handleChange(name, value, 'levels')}}/>
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

  class FieldInput extends Component {
      handleChange(e) {
        this.props.handleChange(e.target.name, e.target.value);
      }
      render() {
          return (
            <input type='text' value={this.props.value} name={this.props.name} onChange={this.handleChange.bind(this)}/>
          )
      }
  }
  
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
      let style = this.props.type === this.props.selectedType ? {backgroundColor:'#b9cbe6'} : {};
      return (
        <div className="ui-type" onClick={(e) => this.props.handleClick(this.props.type)} style={style}>{this.props.name}</div>
      )
    }
  }