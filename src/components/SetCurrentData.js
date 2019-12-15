import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject('mainStore') @observer
class SetCurrentData extends Component {

    constructor(props){
        super(props);
        this.store = this.props.mainStore;
    }

    close(){
        this.store.set_old_data_dialog.close();
    }

    setOldData(e){
        e.preventDefault();
        this.store.old_days_count = [
            parseInt(e.target.days0.value),
            parseInt(e.target.days1.value),
            parseInt(e.target.days2.value),
            parseInt(e.target.days3.value),
            parseInt(e.target.days4.value),
            parseInt(e.target.days5.value)
        ];

        this.store.old_ages_count = {
            '1519': [
                parseInt(e.target.ageCount_0_1519.value),
                parseInt(e.target.ageCount_1_1519.value),
                parseInt(e.target.ageCount_2_1519.value),
                parseInt(e.target.ageCount_3_1519.value),
                parseInt(e.target.ageCount_4_1519.value),
                parseInt(e.target.ageCount_5_1519.value)
            ],
            '2014': [
                parseInt(e.target.ageCount_0_2014.value),
                parseInt(e.target.ageCount_1_2014.value),
                parseInt(e.target.ageCount_2_2014.value),
                parseInt(e.target.ageCount_3_2014.value),
                parseInt(e.target.ageCount_4_2014.value),
                parseInt(e.target.ageCount_5_2014.value)
            ],
            '2529': [
                parseInt(e.target.ageCount_0_2529.value),
                parseInt(e.target.ageCount_1_2529.value),
                parseInt(e.target.ageCount_2_2529.value),
                parseInt(e.target.ageCount_3_2529.value),
                parseInt(e.target.ageCount_4_2529.value),
                parseInt(e.target.ageCount_5_2529.value)
            ],
            '3034': [
                parseInt(e.target.ageCount_0_3034.value),
                parseInt(e.target.ageCount_1_3034.value),
                parseInt(e.target.ageCount_2_3034.value),
                parseInt(e.target.ageCount_3_3034.value),
                parseInt(e.target.ageCount_4_3034.value),
                parseInt(e.target.ageCount_5_3034.value)
            ],
            '3539': [
                parseInt(e.target.ageCount_0_3539.value),
                parseInt(e.target.ageCount_1_3539.value),
                parseInt(e.target.ageCount_2_3539.value),
                parseInt(e.target.ageCount_3_3539.value),
                parseInt(e.target.ageCount_4_3539.value),
                parseInt(e.target.ageCount_5_3539.value)
            ],
            '4044': [
                parseInt(e.target.ageCount_0_4044.value),
                parseInt(e.target.ageCount_1_4044.value),
                parseInt(e.target.ageCount_2_4044.value),
                parseInt(e.target.ageCount_3_4044.value),
                parseInt(e.target.ageCount_4_4044.value),
                parseInt(e.target.ageCount_5_4044.value)
            ],
            '4549': [
                parseInt(e.target.ageCount_0_4549.value),
                parseInt(e.target.ageCount_1_4549.value),
                parseInt(e.target.ageCount_2_4549.value),
                parseInt(e.target.ageCount_3_4549.value),
                parseInt(e.target.ageCount_4_4549.value),
                parseInt(e.target.ageCount_5_4549.value)
            ],
            '5054': [
                parseInt(e.target.ageCount_0_5054.value),
                parseInt(e.target.ageCount_1_5054.value),
                parseInt(e.target.ageCount_2_5054.value),
                parseInt(e.target.ageCount_3_5054.value),
                parseInt(e.target.ageCount_4_5054.value),
                parseInt(e.target.ageCount_5_5054.value)
            ],
            '5559': [
                parseInt(e.target.ageCount_0_5559.value),
                parseInt(e.target.ageCount_1_5559.value),
                parseInt(e.target.ageCount_2_5559.value),
                parseInt(e.target.ageCount_3_5559.value),
                parseInt(e.target.ageCount_4_5559.value),
                parseInt(e.target.ageCount_5_5559.value)
            ],
            '60': [
                parseInt(e.target.ageCount_0_60.value),
                parseInt(e.target.ageCount_1_60.value),
                parseInt(e.target.ageCount_2_60.value),
                parseInt(e.target.ageCount_3_60.value),
                parseInt(e.target.ageCount_4_60.value),
                parseInt(e.target.ageCount_5_60.value)
            ],
        };
        this.store.old_incidents_amount = [];
        let keys = Object.keys(this.store.old_ages_count);
        for (let index = 0; index < 6; index++){
            let number = 0;
            keys.map(key => {
                if (this.store.old_ages_count[key].hasOwnProperty(index)){
                    number += this.store.old_ages_count[key][index];
                }
            });
            this.store.old_incidents_amount.push(number);
        }

        this.close();
    }

    render() {
        return (
            <div className="mdc-dialog set-old-data-dialog"
                 role="alertdialog"
                 aria-modal="true"
                 aria-labelledby="my-dialog-title"
                 aria-describedby="my-dialog-content">
                <div className="mdc-dialog__container">
                    <form onSubmit={this.setOldData.bind(this)}>
                        <div className="mdc-dialog__surface">
                            <h2 className="mdc-dialog__title" id="my-dialog-title">Внести существующие данные</h2>
                            <div className="mdc-dialog__content" id="my-dialog-content">
                                <table className="fl-table">
                                    <thead>
                                    <tr>
                                        <th key={0}>Причина</th>
                                        <th key={1}>Пол</th>
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
                                        <td><input defaultValue={0} type="number" name="days0"/></td>
                                        {this.store.ages.map((element, index) => {
                                            return <td key={index}><input defaultValue={0} type="number" name={`ageCount_0_${element.replace(/\D+/g,"")}`}/></td>
                                        })}
                                    </tr>
                                    <tr>
                                        <td/>
                                        <td>Ж</td>
                                        <td><input defaultValue={0} type="number" name="days1"/></td>
                                        {this.store.ages.map((element, index) => {
                                            return <td key={index}><input defaultValue={0} type="number" name={`ageCount_1_${element.replace(/\D+/g,"")}`}/></td>
                                        })}
                                    </tr>
                                    <tr>
                                        <td>Травма</td>
                                        <td>М</td>
                                        <td><input defaultValue={0} type="number" name="days2"/></td>
                                        {this.store.ages.map((element, index) => {
                                            return <td key={index}><input defaultValue={0} type="number" name={`ageCount_2_${element.replace(/\D+/g,"")}`}/></td>
                                        })}
                                    </tr>
                                    <tr>
                                        <td/>
                                        <td>Ж</td>
                                        <td><input defaultValue={0} type="number" name="days3"/></td>
                                        {this.store.ages.map((element, index) => {
                                            return <td key={index}><input defaultValue={0} type="number" name={`ageCount_3_${element.replace(/\D+/g,"")}`}/></td>
                                        })}
                                    </tr>
                                    <tr>
                                        <td>Уход за больными</td>
                                        <td>М</td>
                                        <td><input defaultValue={0} type="number" name="days4"/></td>
                                        {this.store.ages.map((element, index) => {
                                            return <td key={index}><input defaultValue={0} type="number" name={`ageCount_4_${element.replace(/\D+/g,"")}`}/></td>
                                        })}
                                    </tr>
                                    <tr>
                                        <td/>
                                        <td>Ж</td>
                                        <td><input defaultValue={0} type="number" name="days5"/></td>
                                        {this.store.ages.map((element, index) => {
                                            return <td key={index}><input defaultValue={0} type="number" name={`ageCount_5_${element.replace(/\D+/g,"")}`}/></td>
                                        })}
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <footer className="mdc-dialog__actions">
                                <button type="button" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="no">
                                    <span className="mdc-button__label">Отмена</span>
                                </button>
                                <button type="submit" className="mdc-button mdc-dialog__button">
                                    <span className="mdc-button__label">Добавить</span>
                                </button>
                            </footer>
                        </div>
                    </form>
                </div>
                <div className="mdc-dialog__scrim"/>
            </div>
        );
    }
}

export default SetCurrentData;