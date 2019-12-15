import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import InlineSVG            from "svg-inline-react";
import DeleteIcon           from '../icons/delete.svg';
import $                    from 'jquery';

@inject('mainStore') @observer
class ListData extends Component {

    constructor(props){
        super(props);
        this.store = this.props.mainStore;
    }

    deleteElement(e){
        if (confirm('Удалить элемент?')){
            let id = $(e.target).parents('i').attr('id');
            this.store.elements_list.splice(id, 1);
            this.store.saveElements();
        }
    }

    showElements(){
        let elements = [],
            i = 0;
        for (let index in this.store.elements_list){
            if (this.store.elements_list.hasOwnProperty(index)){
                elements.push(<tr key={i} className="mdc-data-table__row">
                    <td className="mdc-data-table__cell delete">{this.store.elements_list[index].gender}</td>
                    <td className="mdc-data-table__cell delete">{this.store.elements_list[index].reason}</td>
                    <td className="mdc-data-table__cell delete">{this.store.elements_list[index].age}</td>
                    <td className="mdc-data-table__cell delete">{this.store.elements_list[index].days}</td>
                    <td className="mdc-data-table__cell delete"><InlineSVG id={index} onClick={this.deleteElement.bind(this)} src={DeleteIcon} /></td>
                </tr>);
                i++;
            }
        }
        return elements;
    }

    render() {
        return (
            <div className="mdc-dialog list-data-dialog"
                 role="alertdialog"
                 aria-modal="true"
                 aria-labelledby="my-dialog-title"
                 aria-describedby="my-dialog-content">
                <div className="mdc-dialog__container">
                    <div className="mdc-dialog__surface">
                        <h2 className="mdc-dialog__title" id="my-dialog-title">Список внесенных данных</h2>
                        <div className="mdc-dialog__content" id="my-dialog-content">
                            <div className="mdc-data-table elements-table">
                                <table className="mdc-data-table__table" aria-label="elements tab">
                                    <thead>
                                    <tr className="mdc-data-table__header-row">
                                        <th className="mdc-data-table__header-cell mdc-typography--headline6" role="columnheader" scope="col">Пол</th>
                                        <th className="mdc-data-table__header-cell mdc-typography--headline6" role="columnheader" scope="col">Причина</th>
                                        <th className="mdc-data-table__header-cell mdc-typography--headline6" role="columnheader" scope="col">Возраст</th>
                                        <th className="mdc-data-table__header-cell mdc-typography--headline6" role="columnheader" scope="col">ВН дней</th>
                                        <th className="mdc-data-table__header-cell mdc-typography--headline6" role="columnheader" scope="col"/>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {this.showElements()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <footer className="mdc-dialog__actions">
                            <button type="button" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="no">
                                <span className="mdc-button__label">Закрыть</span>
                            </button>
                        </footer>
                    </div>
                </div>
                <div className="mdc-dialog__scrim"/>
            </div>
        );
    }
}

export default ListData;