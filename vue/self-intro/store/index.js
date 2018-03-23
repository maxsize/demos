import Vuex from 'vuex'
import Vue from "vue";

export const MUT_SELECT = 'select'
export const MUT_CHANGE_VALUE = 'changeValue'
export const MUT_ADD_VALUE = 'addValue'
export const MUT_CHANGE_TYPE = 'changeType'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        parameters: [
            {
                type: 'text',
                title: '留下你的大名吧',
                description: '请告诉我你的大名',
            },
            {
                type: 'radio',
                title: '你的最高学历',
                description: '请告诉我你的最高学历，我们想了解一下',
                diploma: [
                    '专科',
                    '本科',
                    '硕士',
                    '博士',
                ]
            },
            {
                type: 'select',
                title: '你在哪里呢',
                // description:'22',
                location: [
                    '北京',
                    '成都',
                    '上海',
                ]
            },
            {
                type: 'table',
                title: '自我评估',
                // description:'11',
                abilities: [
                    '沟通技巧',
                    '时间观念',
                    '技能熟练',
                ],
                levels: [
                    '较差',
                    '一般',
                    '还不错',
                    '这是我的强项',
                ]
            }
        ],
        selectedIndex: -1
    },
    mutations: {
        [MUT_SELECT] (state, index) {
            state.selectedIndex = index
        },
        [MUT_CHANGE_VALUE] (state, payload) {
            const { data, key, newValue } = payload
            Vue.set(data, key, newValue)
        },
        [MUT_CHANGE_TYPE] (state, newType) {
            const selectedItem = state.parameters[state.selectedIndex]
            switch (newType) {
                case 'radio':
                    if (selectedItem.diploma) break;
                    Vue.set(selectedItem, 'diploma', ['dip1', 'dip2', 'dip3', 'dip4']);
                    break;
                case 'select':
                    if (selectedItem.location) break;
                    Vue.set(selectedItem, 'location', ['loc1', 'loc2', 'loc3']);
                    break;
                case 'table':
                    if (selectedItem.abilities || selectedItem.levels) break;
                    Vue.set(selectedItem, 'abilities', ['abi1', 'abi2', 'abi3', 'abi4']);
                    Vue.set(selectedItem, 'levels', ['lv1', 'lv2', 'lv3']);
                    break;
                default:
                    break;
            }
            Vue.set(selectedItem, 'type', newType)
        },
        [MUT_ADD_VALUE] (state, payload) {
            const { data, index } = payload
            data.splice(index+1, 0, '')
        }
    }
})