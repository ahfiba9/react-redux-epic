import * as React from 'react';
import {Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {GlobalState} from "../redux/globalStates";
import {updateSearchLocation} from "./redux/autoCompleteSearchState";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {SearchSuggestions} from "./SearchSuggestions";
import './autoComplete.css'
import {HistorySuggestions} from "./HistorySuggestions";

interface Props {

};

export const AutoCompleteSearch = (props: Props) => {
    const dispatch = useDispatch()
    const searchLocation = useSelector((state: GlobalState) => state.autoCompleteSearch.searchLocation)

    const [isMyInputFocused, setIsMyInputFocused] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateSearchLocation({searchLocation: e.target.value}))
    }

    return (
        <div className={''}>
            <Input
                className={'search-container'}
                name="category"
                onChange={handleChange}
                value={searchLocation}
                placeholder="Search for a type of business..."
                onBlur={() => setTimeout(() => setIsMyInputFocused(false),200)}
                onFocus={() => setIsMyInputFocused(true)}
            />
            <div className={'suggestion-container'}>
                {!!searchLocation ? <SearchSuggestions/> : isMyInputFocused ? <HistorySuggestions/> : null}
            </div>
        </div>
    );
};
