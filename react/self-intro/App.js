import React, { Component } from 'react';
import './App.css';
import {Text, Radio, Select, Table} from './Forms';
import { Side } from "./Side";
import * as Store from "./Store";
import { createStore } from "redux";
import { connect, Provider } from "react-redux";

class App extends Component {
  constructor(props) {
    super(props);
    let myStore = createStore(Store.reducer, Store.defaultStatus);
    let defaultState = myStore.getState();
    this.state = {contents:defaultState};
    this.store = myStore;
  }

  render() {
    var comps = [];
    this.state.contents.forEach((c, index) => {
      comps.push(<ConnectedParameterComp index={index} info={c}/>);
    })
    return (
      <Provider store={this.store}>
        <div>
          <div className="main-header">
            <span className="golden">个人简介</span>
            <div className="header-right">
              <button>下载APP</button>
              &nbsp;&nbsp;
              <a href="#">登陆</a>
            </div>
          </div>
          <div className="main">
            <div className="wrapper">
              <div className="App">
                <header className="App-header">
                  <h1 className="App-title">介绍一下你自己</h1>
                </header>
                <div className="App-container">
                  <div style={{paddingLeft:'20px',paddingTop:'1px'}}><h3>个人登记表单</h3></div>
                  <hr/>
                  <form>
                  {comps} {/*all the parameter containers */}
                  </form>
                  <hr/>
                  <div style={{paddingLeft:'20px',paddingBottom:'10px'}}>
                    <button>提交</button>
                  </div>
                </div>
              </div>
              <Side store={this.store}/>
            </div>
          </div>
        </div>        
      </Provider>
    );
  }
}

const compStateToProps = (state, ownProps) => {
  return {
    // info: state[ownProps.index]
    selected: ownProps.info.selected,
    title: ownProps.info.title,
    description: ownProps.info.description,
    requireUpdate: ownProps.info.requireUpdate,
    type: ownProps.info.type
  }
}

const compDispatchToProps = (dispatch, ownProps) => {
  return {
    onSelect: () => (
      dispatch({type: Store.SELECT, index: ownProps.index})
    )
  }
}

class ParameterComp extends Component {
  render() {
    let { info, type, title, description, selected, onSelect } = this.props;
    let style = selected ? "subcontainer-highlight" : "subcontainer";
    return (
      <div className={style} onClick={onSelect}>
        <p className="subtitle">{title}</p>
        <p className="description">{description}</p>
        <CommonForm type={type} info={info}/>
      </div>
    )
  }
}

const ConnectedParameterComp = connect(compStateToProps, compDispatchToProps)(ParameterComp)

class CommonForm extends Component {
  state = {}
  render() {
      switch (this.props.type) {
        case 'text':
          return <Text info={this.props.info}/>
        case 'radio':
          return <Radio info={this.props.info}/>
        case 'select':
          return <Select info={this.props.info}/>
        case 'table':
          return <Table info={this.props.info}/>
        default:
          return <Text info={this.props.info}/>
      }
      return <Text/>
  }
}


export default App;
