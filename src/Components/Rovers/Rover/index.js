import React, { useEffect, useState } from "react";
import "./Rover.scss";

import { observer } from "mobx-react";
import { useRoverStore } from "../../../Stores/roverStore/roverContext"
import { Button, notification, Modal } from 'antd';

export const Rover = observer(() => {
    const roverStore = useRoverStore();

    useEffect(() => {
        roverStore.takeFromLocalStorage();
        roverStore.updateFullTable();
        return () => {

        }
    }, []);

    const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);
    const [isStartModalVisible, setIsStartModalVisible] = useState(false);

    const showHistoryModal = () => {
        setIsHistoryModalVisible(true);
    };

    const showStartModal = () => {
        setIsStartModalVisible(true);
    };

    const handleHistoryModalCancel = () => {
        setIsHistoryModalVisible(false);
    };

    const handleStartModalCancel = () => {
        setIsStartModalVisible(false);
    };

    const handleStartModalOk = () => {
        if (confirm('Внести новые данные?\nЭто приведет к полной очистке уществующий информации без возможности восстановления!')){
            roverStore.clearData();
            let jindex = 0;
            for (let el of roverStore.temp_table){
                let amount = el[0];
                let days = el[1];
                let parts = [];
                let one_part = (days - days % amount) / amount;
                for (let index in el){
                    if (index > 1 && el[index] > 0){
                        for (let k = 0; k < el[index]; k++){
                            parts.push({
                                value: one_part,
                                index: index
                            });
                        }
                    }
                }
                if (days - (amount * one_part) > 0){
                    parts[parts.length - 1].value = one_part + (days - (amount * one_part));
                }
                for (let part of parts){
                    roverStore.addItemSilent({
                        gender: jindex % 2,
                        type: jindex - (jindex % 2),
                        age: part.index - 2,
                        value: part.value
                    })
                }
                jindex++;
            }
            roverStore.seveToLocalStorage();
            roverStore.takeFromLocalStorage();
            setIsStartModalVisible(false);
        }
    };

    const handleStartModalLoadData = () => {
        roverStore.temp_table = JSON.parse(JSON.stringify(roverStore.table));
    };

    const updateTempTable = (e) => {
        let [ , row, col] = e.currentTarget.id.split('_');
        roverStore.temp_table[row][col] = e.currentTarget.value;
    }

    const dictionary = {
        age: {
            '0': '15-19',
            '1': '20-24',
            '2': '25-29',
            '3': '30-34',
            '4': '35-39',
            '5': '40-44',
            '6': '45-49',
            '7': '50-54',
            '8': '55-59',
            '9': '60 и старше',
        },
        gender: {
            '0': 'мужской',
            '1': 'женский'
        },
        type: {
            '0': 'Заболевание',
            '2': 'Травма',
            '4': 'Уход за больным',
            '6': 'Санитарно-курортное'
        }
    }

    const cancelAddConfirm = (e) => {
        if (confirm('Удалить запись?\nДанные нельзя будет восстановить!')){
            if (e.currentTarget.id && !Number.isNaN(parseInt(e.currentTarget.id))) {
                let id = parseInt(e.currentTarget.id);
                roverStore.cancelAdd(id);
            }
        }
    }

    const cancelAdd = (e) => {
        if (e.currentTarget.id && !Number.isNaN(parseInt(e.currentTarget.id))) {
            let id = parseInt(e.currentTarget.id);
            roverStore.cancelAdd(id);
            notification.close(id)
        }
    }

    const add = (e) => {
        e.preventDefault();
        let item = {
            value: e.target.count.value,
            gender: roverStore.gender,
            age: roverStore.age,
            type: roverStore.type
        }
        let index = roverStore.addItem(item);
        if (index > -1) {
            e.target.reset();
            notification.open({
                key: index,
                message: 'Добавлено',
                description: <div>Пол: {dictionary.gender[item.gender]}<br />
                    Причина: {dictionary.type[item.type]}<br />
                    Возраст: {dictionary.age[item.age]}</div>,
                duration: 5,
                placement: 'bottomLeft',
                style: {
                    background: '#28a745',
                    color: '#FFFFFF'
                },
                btn: (
                    <Button type="primary" size="small" id={index} onClick={cancelAdd}>
                        Отменить добавление
                    </Button>
                )
            });
        }
    }

    const resetClasses = (e) => {
        for (let element of e.currentTarget.parentNode.children) {
            if (element.classList.contains('selected')) {
                element.classList.remove('selected');
            }
        }
        e.currentTarget.classList.add('selected');
    }

    const selectAge = (e) => {
        roverStore.setAge(parseInt(e.currentTarget.id));
        resetClasses(e);
    }

    const selectGender = (e) => {
        roverStore.setGender(parseInt(e.currentTarget.id));
        resetClasses(e);
    }

    const selectType = (e) => {
        roverStore.setType(parseInt(e.currentTarget.id));
        resetClasses(e);
    }

    const clearData = (e) => {
        if (confirm('Очистить таблицу?\nДанные невозможно будет восстановить!')) {
            roverStore.clearData();
            notification.open({
                message: 'Таблица очищена',
                duration: 2
            });
        }
    }

    return (
        <div className="grid">
            <div>
                <h3>Пол</h3>
                <div className="buttons-line">
                    <Button id="0" onClick={selectGender}>Мужской</Button>
                    <Button id="1" onClick={selectGender}>Женский</Button>
                </div>
            </div>
            <div>
                <h3>Причина</h3>
                <div className="buttons-line">
                    <Button id="0" onClick={selectType}>Заболевание</Button>
                    <Button id="2" onClick={selectType}>Травма</Button>
                    <Button id="4" onClick={selectType}>Уход за больным</Button>
                    <Button id="6" onClick={selectType}>Санитарно-курортное</Button>
                </div>
            </div>
            <div>
                <h3>Возраст</h3>
                <div className="buttons-line">
                    <Button id="0" onClick={selectAge}>15-19</Button>
                    <Button id="1" onClick={selectAge}>20-24</Button>
                    <Button id="2" onClick={selectAge}>25-29</Button>
                    <Button id="3" onClick={selectAge}>30-34</Button>
                    <Button id="4" onClick={selectAge}>35-39</Button>
                    <Button id="5" onClick={selectAge}>40-44</Button>
                    <Button id="6" onClick={selectAge}>45-49</Button>
                    <Button id="7" onClick={selectAge}>50-54</Button>
                    <Button id="8" onClick={selectAge}>55-59</Button>
                    <Button id="9" onClick={selectAge}>60 и старше</Button>
                </div>
            </div>
            <div>
                <h3>Кол-во дней</h3>
                <form onSubmit={add}>
                    <input type="number" required={true} name="count" />
                    <input type="submit" value="Добавить" className="ant-btn ant-btn-primary ant-btn-success" />
                </form>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Причина</th>
                            <th>Пол</th>
                            <th>Число случаев</th>
                            <th>ВН дней</th>
                            <th>15-19</th>
                            <th>20-24</th>
                            <th>25-29</th>
                            <th>30-34</th>
                            <th>35-39</th>
                            <th>40-44</th>
                            <th>45-49</th>
                            <th>50-54</th>
                            <th>55-59</th>
                            <th>60 и старше</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Заболевание</td>
                            <td>М</td>
                            {roverStore.table[0].map((el, index) => {
                                return <td key={`0_${index}`}>{el}</td>
                            })}
                        </tr>
                        <tr>
                            <td></td>
                            <td>Ж</td>
                            {roverStore.table[1].map((el, index) => {
                                return <td key={`1_${index}`}>{el}</td>
                            })}
                        </tr>
                        <tr>
                            <td>Травма</td>
                            <td>М</td>
                            {roverStore.table[2].map((el, index) => {
                                return <td key={`2_${index}`}>{el}</td>
                            })}
                        </tr>
                        <tr>
                            <td></td>
                            <td>Ж</td>
                            {roverStore.table[3].map((el, index) => {
                                return <td key={`3_${index}`}>{el}</td>
                            })}
                        </tr>
                        <tr>
                            <td>Уход за больным</td>
                            <td>М</td>
                            {roverStore.table[4].map((el, index) => {
                                return <td key={`4_${index}`}>{el}</td>
                            })}
                        </tr>
                        <tr>
                            <td></td>
                            <td>Ж</td>
                            {roverStore.table[5].map((el, index) => {
                                return <td key={`5_${index}`}>{el}</td>
                            })}
                        </tr>
                        <tr>
                            <td>Санитарно-курортное</td>
                            <td>М</td>
                            {roverStore.table[6].map((el, index) => {
                                return <td key={`6_${index}`}>{el}</td>
                            })}
                        </tr>
                        <tr>
                            <td></td>
                            <td>Ж</td>
                            {roverStore.table[7].map((el, index) => {
                                return <td key={`7_${index}`}>{el}</td>
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex-buttons">
                <div>
                    <button onClick={clearData} className="ant-btn ant-btn-primary ant-btn-dangerous">Очистить таблицу</button>
                </div>
                <div>
                    <button onClick={showHistoryModal} className="ant-btn ant-btn-primary ant-btn-info">Открыть историю</button>
                </div>
                <div>
                    <button onClick={showStartModal} className="ant-btn ant-btn-primary ant-btn-info">Ввести начальные данные</button>
                </div>
            </div>
            <Modal 
                title="История больничных" 
                key="modal_history"
                visible={isHistoryModalVisible} 
                style={{ top: 20 }}
                onCancel={handleHistoryModalCancel}
                footer={[
                    <Button key="hostiry_modal_cancel" onClick={handleHistoryModalCancel}>
                        Закрыть
                    </Button>
                ]}
            >
                {roverStore.data.length === 0 && <h3>История пока что пуста</h3>}
                {roverStore.data.length > 0 && roverStore.data.map((element, index) => {
                    return <div className="history-block" key={`history_${index}`}>
                        <div>Пол: {dictionary.gender[element.gender]}</div>
                        <div>Причина: {dictionary.type[element.type]}</div>
                        <div>Возраст: {dictionary.age[element.age]}</div>
                        <div>Кол-во дней: {element.value}</div>
                        <div className="buttons">
                            <button onClick={cancelAddConfirm} id={index} className="ant-btn ant-btn-primary ant-btn-dangerous">Удалить</button>
                        </div>
                    </div>
                }).reverse()}
            </Modal>
            <Modal 
                title="Внести начальные данные" 
                visible={isStartModalVisible} 
                key="modal_start"
                onCancel={handleStartModalCancel}
                style={{ top: 20 }}
                width={1000}
                footer={[
                    <Button key="start_modal_ok" onClick={handleStartModalOk}>
                        Сохранить
                    </Button>,
                    <Button key="start_modal_cancel" onClick={handleStartModalCancel}>
                        Закрыть
                    </Button>,
                    <Button key="start_modal_load_data" onClick={handleStartModalLoadData}>
                        Отобразить текущие данные
                    </Button>
                ]}
            >
                <div>
                <table>
                    <thead>
                        <tr>
                            <th>Причина</th>
                            <th>Пол</th>
                            <th>Число случаев</th>
                            <th>ВН дней</th>
                            <th>15-19</th>
                            <th>20-24</th>
                            <th>25-29</th>
                            <th>30-34</th>
                            <th>35-39</th>
                            <th>40-44</th>
                            <th>45-49</th>
                            <th>50-54</th>
                            <th>55-59</th>
                            <th>60 и старше</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Заболевание</td>
                            <td>М</td>
                            {roverStore.temp_table[0].map((el, index) => {
                                return <td key={`modal_0_${index}`}><input id={`modal_0_${index}`} required onChange={updateTempTable} value={el} type="number"/></td>
                            })}
                        </tr>
                        <tr>
                            <td></td>
                            <td>Ж</td>
                            {roverStore.temp_table[1].map((el, index) => {
                                return <td key={`modal_1_${index}`}><input id={`modal_1_${index}`} required onChange={updateTempTable} value={el} type="number"/></td>
                            })}
                        </tr>
                        <tr>
                            <td>Травма</td>
                            <td>М</td>
                            {roverStore.temp_table[2].map((el, index) => {
                                return <td key={`modal_2_${index}`}><input id={`modal_2_${index}`} required onChange={updateTempTable} value={el} type="number"/></td>
                            })}
                        </tr>
                        <tr>
                            <td></td>
                            <td>Ж</td>
                            {roverStore.temp_table[3].map((el, index) => {
                                return <td key={`modal_3_${index}`}><input id={`modal_3_${index}`} required onChange={updateTempTable} value={el} type="number"/></td>
                            })}
                        </tr>
                        <tr>
                            <td>Уход за больным</td>
                            <td>М</td>
                            {roverStore.temp_table[4].map((el, index) => {
                                return <td key={`modal_4_${index}`}><input id={`modal_4_${index}`} required onChange={updateTempTable} value={el} type="number"/></td>
                            })}
                        </tr>
                        <tr>
                            <td></td>
                            <td>Ж</td>
                            {roverStore.temp_table[5].map((el, index) => {
                                return <td key={`modal_5_${index}`}><input id={`modal_5_${index}`} required onChange={updateTempTable} value={el} type="number"/></td>
                            })}
                        </tr>
                        <tr>
                            <td>Санитарно-курортное</td>
                            <td>М</td>
                            {roverStore.temp_table[6].map((el, index) => {
                                return <td key={`modal_6_${index}`}><input id={`modal_6_${index}`} required onChange={updateTempTable} value={el} type="number"/></td>
                            })}
                        </tr>
                        <tr>
                            <td></td>
                            <td>Ж</td>
                            {roverStore.temp_table[7].map((el, index) => {
                                return <td key={`modal_7_${index}`}><input id={`modal_7_${index}`} required onChange={updateTempTable} value={el} type="number"/></td>
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>
            </Modal>
        </div >
    );
})
