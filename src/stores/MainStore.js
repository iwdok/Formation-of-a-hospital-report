import { action, observable } from "mobx";
import Cookies                from 'js-cookie'

class MainStore {
    @observable spinner = false;

    @observable current_gender = 0;
    @observable current_reason = 0;
    @observable current_age = 0;

    @observable old_incidents_amount = Cookies.get('old_incidents_amount') ? JSON.parse( Cookies.get('old_incidents_amount')) : [
        0, 0, 0, 0, 0, 0
    ];

    @observable old_days_count = Cookies.get('old_days_count') ? JSON.parse( Cookies.get('old_days_count')) : [
        0, 0, 0, 0, 0, 0
    ];

    @observable old_ages_count = Cookies.get('old_ages_count') ? JSON.parse( Cookies.get('old_ages_count')) : {
        '1519': [0, 0, 0, 0, 0, 0],
        '2014': [0, 0, 0, 0, 0, 0],
        '2529': [0, 0, 0, 0, 0, 0],
        '3034': [0, 0, 0, 0, 0, 0],
        '3539': [0, 0, 0, 0, 0, 0],
        '4044': [0, 0, 0, 0, 0, 0],
        '4549': [0, 0, 0, 0, 0, 0],
        '5054': [0, 0, 0, 0, 0, 0],
        '5559': [0, 0, 0, 0, 0, 0],
        '60'  : [0, 0, 0, 0, 0, 0]
    };

    @observable ages = [
        '15-19',
        '20-14',
        '25-29',
        '30-34',
        '35-39',
        '40-44',
        '45-49',
        '50-54',
        '55-59',
        '60 и старше'
    ];

    @observable genders = [
        'Женщины',
        'Мужчины'
    ];

    @observable reasons = [
        'Заболевание',
        'Травма',
        'Уход за больным'
    ];

    @observable elements_list = Cookies.get('data') ? JSON.parse( Cookies.get('data')) : [];

    @action saveElements(){
        Cookies.set('data', JSON.stringify(this.elements_list));
    }

    @action saveOldData(){
        Cookies.set('old_incidents_amount', JSON.stringify(this.old_incidents_amount));
        Cookies.set('old_days_count', JSON.stringify(this.old_days_count));
        Cookies.set('old_ages_count', JSON.stringify(this.old_ages_count));
    }

    @action addElement(days){
        this.elements_list.push({
            gender: this.genders[this.current_gender],
            reason: this.reasons[this.current_reason],
            age: this.ages[this.current_age],
            days: days
        });
        Cookies.set('data', JSON.stringify(this.elements_list));
    }

    @action clearElements(){
        this.elements_list = [];
        Cookies.set('data', JSON.stringify([]));
        this.saveOldData();
        this.old_ages_count = {
            '1519': [0, 0, 0, 0, 0, 0],
            '2014': [0, 0, 0, 0, 0, 0],
            '2529': [0, 0, 0, 0, 0, 0],
            '3034': [0, 0, 0, 0, 0, 0],
            '3539': [0, 0, 0, 0, 0, 0],
            '4044': [0, 0, 0, 0, 0, 0],
            '4549': [0, 0, 0, 0, 0, 0],
            '5054': [0, 0, 0, 0, 0, 0],
            '5559': [0, 0, 0, 0, 0, 0],
            '60': [0, 0, 0, 0, 0, 0]
        };
        this.old_days_count = [
            0, 0, 0, 0, 0, 0
        ];
        this.old_incidents_amount = [
            0, 0, 0, 0, 0, 0
        ];
    }
}


const store = new MainStore();
export default store;