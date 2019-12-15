import React, { Component, Fragment } from "react";
import { inject, observer }           from "mobx-react";
import { MDCTextField }               from '@material/textfield';
import { MDCRipple }                  from '@material/ripple';
import { MDCDialog }                  from '@material/dialog';
import SetCurrentData                 from "./SetCurrentData";
import ListData                       from "./ListData";
import $                              from "jquery";

@inject('mainStore') @observer
class Main extends Component {

    constructor(props){
        super(props);
        this.store = this.props.mainStore;
    }

    chooseGender(e){
        $('.gender button.current').removeClass('current');
        $(e.target).addClass('current');
        this.store.current_gender = e.target.id;
    }

    chooseReason(e){
        $('.reason button.current').removeClass('current');
        $(e.target).addClass('current');
        this.store.current_reason = e.target.id;
    }

    chooseAge(e){
        $('.age button.current').removeClass('current');
        $(e.target).addClass('current');
        this.store.current_age = e.target.id;
    }

    addElement(e){
        e.preventDefault();
        this.store.addElement(e.target.days.value);
        e.target.reset();
        $('.days-text-field .mdc-floating-label--float-above').removeClass('mdc-floating-label--float-above');
    }

    clearData(){
        if(confirm('Очистить данные?')){
            this.store.clearElements();
        }
    }

    setIncidentsAmount(reason, gender, index){
        return this.store.elements_list.filter(element => {
            if (element.reason === reason && element.gender === gender){
                return element
            }
        }).length + this.store.old_incidents_amount[index];
    }

    setDaysCount(reason, gender, index){
        return this.store.elements_list.reduce((accumulator, element) => {
            if (element.reason === reason && element.gender === gender){
                return accumulator += parseInt(element.days);
            } else {
                return accumulator;
            }
        }, 0) + this.store.old_days_count[index];
    }

    setAgeIncidentsAmount(reason, gender, age, index){
        return this.store.elements_list.filter(element => {
            if (element.reason === reason && element.gender === gender && element.age === age){
                return element
            }
        }).length + this.store.old_ages_count[age.replace(/\D+/g,"")][index];
    }

    openOldDataDialog(){
        this.store.set_old_data_dialog.open();
    }

    openListDataDialog(){
        this.store.list_data_dialog.open();
    }

    render() {
        return (
            <Fragment>
                <div className="list-elements-button-container">
                    <button onClick={this.openListDataDialog.bind(this)} className="mdc-fab list-elements mdc-fab--extended" aria-label="List">
                        <div className="mdc-fab__ripple"/>
                        <span className="mdc-fab__icon material-icons">list</span>
                        <span className="mdc-fab__label">Список данных</span>
                    </button>
                </div>
                <div className="set-previous-data-container">
                    <button onClick={this.openOldDataDialog.bind(this)} className="mdc-fab set-data mdc-fab--extended" aria-label="List">
                        <div className="mdc-fab__ripple"/>
                        <span className="mdc-fab__icon material-icons">add</span>
                        <span className="mdc-fab__label">Внести существующие данные</span>
                    </button>
                </div>
                <div className="choose-container gender">
                    <button onClick={this.chooseGender.bind(this)} id={0} className="mdc-button mdc-button--raised current"><span className="mdc-button__ripple"/>Женщины</button>
                    <button onClick={this.chooseGender.bind(this)} id={1} className="mdc-button mdc-button--raised"><span className="mdc-button__ripple"/>Мужчины</button>
                </div>
                <div className="choose-container reason">
                    <button onClick={this.chooseReason.bind(this)} id={0} className="mdc-button mdc-button--raised current"><span className="mdc-button__ripple"/>Заболевание</button>
                    <button onClick={this.chooseReason.bind(this)} id={1} className="mdc-button mdc-button--raised"><span className="mdc-button__ripple"/>Травма</button>
                    <button onClick={this.chooseReason.bind(this)} id={2} className="mdc-button mdc-button--raised"><span className="mdc-button__ripple"/>Уход за больным</button>
                </div>
                <div className="choose-container age">
                    {this.store.ages.map((element, index) => {
                        if (index === 0){
                            return <button onClick={this.chooseAge.bind(this)} key={index} id={index} className="mdc-button mdc-button--raised current"><span className="mdc-button__ripple"/>{element}</button>
                        } else {
                            return <button onClick={this.chooseAge.bind(this)} key={index} id={index} className="mdc-button mdc-button--raised"><span className="mdc-button__ripple"/>{element}</button>
                        }
                    })}
                </div>
                <div className="days-container">
                    <form onSubmit={this.addElement.bind(this)}>
                        <div className="mdc-text-field first days-text-field">
                            <input required type="number" autoComplete="off" className="mdc-text-field__input" id="days" name="days"/>
                            <div className="mdc-line-ripple"/>
                            <label htmlFor="days" className="mdc-floating-label">Кол-во дней болезни</label>
                        </div>
                        <div>
                            <button type="submit" className="mdc-button mdc-button--raised"><span className="mdc-button__ripple"/>Добавить</button>
                        </div>
                    </form>
                </div>
                <div className="info-container">
                    <div className="title mdc-typography--headline5">Информация</div>
                    <table className="fl-table">
                        <thead>
                            <tr>
                                <th key={0}>Причина</th>
                                <th key={1}>Пол</th>
                                <th key={2}>Число случаев</th>
                                <th key={3}>ВН дней</th>
                                {this.store.ages.map((element, index) => {
                                    return <th key={index + 3}>{element}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Заболевание</td>
                            <td>М</td>
                            <td>{this.setIncidentsAmount('Заболевание', 'Мужчины', 0)}</td>
                            <td>{this.setDaysCount('Заболевание', 'Мужчины', 0)}</td>
                            {this.store.ages.map((element, index) => {
                                return <td key={index}>{this.setAgeIncidentsAmount('Заболевание', 'Мужчины', element, 0)}</td>
                            })}
                        </tr>
                        <tr>
                            <td/>
                            <td>Ж</td>
                            <td>{this.setIncidentsAmount('Заболевание', 'Женщины', 1)}</td>
                            <td>{this.setDaysCount('Заболевание', 'Женщины', 1)}</td>
                            {this.store.ages.map((element, index) => {
                                return <td key={index}>{this.setAgeIncidentsAmount('Заболевание', 'Женщины', element, 1)}</td>
                            })}
                        </tr>
                        <tr>
                            <td>Травма</td>
                            <td>М</td>
                            <td>{this.setIncidentsAmount('Травма', 'Мужчины', 2)}</td>
                            <td>{this.setDaysCount('Травма', 'Мужчины', 2)}</td>
                            {this.store.ages.map((element, index) => {
                                return <td key={index}>{this.setAgeIncidentsAmount('Травма', 'Мужчины', element, 2)}</td>
                            })}
                        </tr>
                        <tr>
                            <td/>
                            <td>Ж</td>
                            <td>{this.setIncidentsAmount('Травма', 'Женщины', 3)}</td>
                            <td>{this.setDaysCount('Травма', 'Женщины', 3)}</td>
                            {this.store.ages.map((element, index) => {
                                return <td key={index}>{this.setAgeIncidentsAmount('Травма', 'Женщины', element, 3)}</td>
                            })}
                        </tr>
                        <tr>
                            <td>Уход за больными</td>
                            <td>М</td>
                            <td>{this.setIncidentsAmount('Уход за больным', 'Мужчины', 4)}</td>
                            <td>{this.setDaysCount('Уход за больным', 'Мужчины', 4)}</td>
                            {this.store.ages.map((element, index) => {
                                return <td key={index}>{this.setAgeIncidentsAmount('Уход за больным', 'Мужчины', element, 4)}</td>
                            })}
                        </tr>
                        <tr>
                            <td/>
                            <td>Ж</td>
                            <td>{this.setIncidentsAmount('Уход за больным', 'Женщины', 5)}</td>
                            <td>{this.setDaysCount('Уход за больным', 'Женщины', 5)}</td>
                            {this.store.ages.map((element, index) => {
                                return <td key={index}>{this.setAgeIncidentsAmount('Уход за больным', 'Женщины', element, 5)}</td>
                            })}
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="clear-data">
                    <button onClick={this.clearData.bind(this)} className="mdc-button mdc-button--raised"><span className="mdc-button__ripple"/>Очистить данные</button>
                </div>
                <SetCurrentData />
                <ListData />
            </Fragment>
        );
    }

    componentDidMount() {
        const daysField = new MDCTextField(document.querySelector('.days-text-field'));
        const fabList = new MDCRipple(document.querySelector('.mdc-fab.list-elements'));
        const fabSet = new MDCRipple(document.querySelector('.mdc-fab.set-data'));

        this.store.set_old_data_dialog  = new MDCDialog(document.querySelector('.mdc-dialog.set-old-data-dialog'));
        this.store.list_data_dialog  = new MDCDialog(document.querySelector('.mdc-dialog.list-data-dialog'));
    }
}

export default Main;