import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {GlobalState} from "../redux/globalStates";
import {selectSearchLocation, updateSearchLocationList} from "../GoogleMap/redux/googleMapStates";
import {resetSearchLocation} from "./redux/autoCompleteSearchState";
import './AutoCompleteSearch'
import {SearchOutlined} from "@ant-design/icons";
import {BaseList} from "../commonUi/BaseList";

interface Props {

};

export const SearchSuggestions = (props: Props) => {
    const dispatch = useDispatch()
    const autocompleteData = useSelector((state: GlobalState) => state.autoCompleteSearch.suggestedLocation)


    const handleClick = (e: any) => {
        console.log('handle click search = ', e)
        dispatch(selectSearchLocation({selectedLocation: e}))
        dispatch(updateSearchLocationList(e))
        dispatch(resetSearchLocation())
    }

    return (
        <BaseList data={autocompleteData} onClick={handleClick} icon={<SearchOutlined/>}/>
    )
};
