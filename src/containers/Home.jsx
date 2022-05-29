import React, { useEffect, useState } from 'react'
import Tablecharacters from '../components/TableCharacters'
import { getData } from '../helpers/getData'
import { DivLoaderStyled } from '../styles/styles'
import { Spin } from 'antd';

const Home = ({ loader, setLoader }) => {
    const [characters, setCharacters] = useState({})

    useEffect(() => {

        getData()
        .then( (data) => {
            setCharacters( data )
            setTimeout(() => {
                // setLoader( false )
            }, 500);
        });

    }, [setLoader])
    

    if (loader) {
        return (
            <DivLoaderStyled>
                <Spin />
            </DivLoaderStyled>
        )
    } else {
        return (
            <>
                <Tablecharacters characters={characters.results} />
            </>
        )
    }

    
}

export default Home;