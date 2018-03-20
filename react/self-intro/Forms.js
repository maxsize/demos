import React, {Component} from 'react';
import './App.css';

export class Text extends Component {
    state = {}
    render() { 
        return ( <div><input type="text"/></div> )
    }
}

export class Radio extends Component {
    state = {}
    render() {
        const diploma = this.props.info.diploma;
        const inputs = [];
        for (let i = 0; i < diploma.length; i++) {
            const dip = diploma[i];
            inputs.push(<input type="radio" name="diploma" id={'dip'+i} value={dip}></input>);
            inputs.push(<label for={'dip'+i}>{dip}</label>);
        }
        return (
            <div style={{marginTop:'10px'}}>
                {inputs}
            </div>
        )
    }
}

export class Select extends Component {
    state = {}
    render() { 
        const location = this.props.info.location;
        const locs = [];
        for (let i = 0; i < location.length; i++) {
            const loc = location[i];
            locs.push(<option value={i}>{loc}</option>)
        }
        return (
            <select>
                {locs}
            </select>
        )
    }
}

export class Table extends Component {
    state = {}
    render() { 
        const abilities = this.props.info.abilities;
        const levels = this.props.info.levels;
        const trs = [];
        abilities.forEach(abi => {
            const radios = levels.map((lv, index) => <td><input type="radio" name="self-ass1" id={`ass${index}`} value={index}/></td>)
            trs.push(
                <tr className="row-content">
                    <td>{abi}</td>
                    {radios}
                </tr>
            )
        });
        const tds = levels.map(lv => <td>{lv}</td>)
        return (
            <table className="table">
                <tbody>
                    <tr className="row-title">
                    <td></td>
                    {tds}
                    </tr>
                    {trs}
                </tbody>
            </table>
        )
    }
}