import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {GlobalState} from "../redux/globalStates";
import {selectSearchLocation} from "../GoogleMap/redux/googleMapStates";
import {resetSearchLocation} from "./redux/autoCompleteSearchState";
import './AutoCompleteSearch'
import {HistoryOutlined} from "@ant-design/icons";
import {BaseList} from "../commonUi/BaseList";

interface Props {

};

export const HistorySuggestions = (props: Props) => {
    const dispatch = useDispatch()
    const searchHistoryList = useSelector((state: GlobalState) => state.googleMap.locationHistory)

    const handleClick = (e: any) => {
        dispatch(selectSearchLocation({selectedLocation: e}))
        dispatch(resetSearchLocation())
    }

    return (
        <BaseList data={searchHistoryList} onClick={handleClick} icon={<HistoryOutlined />}/>
    )
};
