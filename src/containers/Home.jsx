import React, { useEffect, useState } from 'react'
import Tablecharacters from '../components/TableCharacters'
import { getData } from '../helpers/getData'
import { DivLoaderStyled } from '../styles/styles'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Home = ({ loader, setLoader }) => {
    const [characters, setCharacters] = useState({})
    const [load, setLoad] = useState(true)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setLoad( true )
        getData(`https://swapi.dev/api/people/?page=${page}`)
        .then( (data) => {
            setCharacters( data )
            setPage(page)
            setTimeout(() => {
                setLoader( false )
                setLoad( false )
            }, 500);
        });

    }, [setLoader, page])

    if (loader) {
        return (
            <DivLoaderStyled>
                <Spin indicator={<LoadingOutlined style={{ fontSize: 80 }} spin />} />
            </DivLoaderStyled>
        )
    } else {
        return (
            <>
                <Tablecharacters load={load} characters={characters} page={page} setPage={setPage}  />
            </>
        )
    }

    
}

export default Home;