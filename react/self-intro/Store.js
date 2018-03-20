import { createStore } from "redux";
import { ActionTypes } from "redux/es/createStore";

export const defaultStatus = [
    {
      type:'text',
      title:'留下你的大名吧',
      description:'请告诉我你的大名',
      parameter:'name',
    },
    {
      type:'radio',
      title:'你的最高学历',
      description:'请告诉我你的最高学历，我们想了解一下',
      parameter:'diploma',
      diploma:[
        '专科',
        '本科',
        '硕士',
        '博士',
      ]
    },
    {
      type:'select',
      title:'你在哪里呢',
      // description:'22',
      parameter:'location',
      location:[
        '北京',
        '成都',
        '上海',
      ]
    },
    {
      type:'table',
      title:'自我评估',
      // description:'11',
      parameter:'selfassessment',
      abilities:[
        '沟通技巧',
        '时间观念',
        '技能熟练',
      ],
      levels:[
        '较差',
        '一般',
        '还不错',
        '这是我的强项',
      ]
    }
  ];

export const SELECT = "select";
export const CHANGE_TYPE = "changeType";
export const CHANGE_VALUE = "changeValue";

export function reducer(state = defaultStatus, action) {
    // make sure required field woun't be undefined
    function initData(type, content)
    {
        if (!content) return;
        switch (type) {
            case 'radio':
                if (content.diploma) break;
                content.diploma = ['dip1', 'dip2', 'dip3', 'dip4'];
                break;
            case 'select':
                if (content.location) break;
                content.location = ['loc1', 'loc2', 'loc3'];
                break;
            case 'table':
                if (content.abilities || content.levels) break;
                content.abilities = ['abi1', 'abi2', 'abi3', 'abi4'];
                content.levels = ['lv1', 'lv2', 'lv3'];
                break;
            default:
                break;
        }
    }

    const { type, index, formType, value, key, propName } = action;
    let newState = undefined;
    let selected = undefined;
    switch (type) {
        case SELECT:
          newState = state.map(item => {
            item.selected = false;
            return item;
          });
          const item = newState[index];
          item.selected = true;
          return newState;
          break;
        case CHANGE_TYPE:
          newState = state.slice(0);
          selected = newState.find(s => s.selected);
          if (selected)
            selected.type = formType;
          initData(formType, selected);
          return newState;
        case CHANGE_VALUE:
          newState = state.slice(0);
          selected = newState.find(s => s.selected);
          if (selected)
          {
            if (propName) selected[propName][key] = value;  /* changing value from an array */
            else selected[key] = value;                     /* changing value from object */
            selected.requireUpdate = !selected.requireUpdate;
          }
          return newState;
        case ActionTypes.INIT:
          return defaultStatus;
        default:
        break;
    }
  }
