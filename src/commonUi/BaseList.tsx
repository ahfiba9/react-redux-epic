import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {GlobalState} from "../redux/globalStates";
import { Location } from './../../src/autoCompleteSearch/redux/autoCompleteSearchState'
import './commonUi.css'

interface Props {
    data: Location[]
    onClick: (item: Location) => void
    icon?: any
};

export const BaseList = (props: Props) => {
    const handleClick = (item: Location) => {
        props.onClick(item)
    }

    const list = props.data.map(item => {
        return (
            <div
                className={'suggestion-list'}
                key={item.place_id}
                onClick={() => handleClick(item)}
            >
                {props.icon ? <div className={'row'}>
                    {props.icon}
                </div> : null}
                <div className={'row'}>
                    {item.description}
                </div>
            </div>
        )
    })

    return (
        <div className={'suggestion'}>
            {list}
        </div>
    );
};
