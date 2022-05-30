import { Button, Modal, Table } from 'antd'
import React, { useState } from 'react'
import { getPlanet } from '../helpers/getPlanet';
import { DivDescriptionStyled, DivFeatureStyled } from '../styles/styles';

const Tablecharacters = ( { characters = { results: [] }, page, setPage, load } ) => {
  // Estados
  const [visible, setVisible] = useState(false);
  const [char, setChar] = useState({})
  const [platet, setPlatet] = useState({})

  // Configuracion de las columnas de la tabla
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      filterSearch: true,
      width: '30%',
      sorter: (a, b) => a.name.localeCompare(b.name),
      // onFilter: (value, record) => record.address.startsWith(value)
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      filters: [{ text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
      { text: 'N/A', value: 'n/a' }],
      onFilter: (value, record) => record.gender.indexOf(value) === 0,
      filterMode: 'menu',
      width: '15%',
    },
    {
      title: 'Hair Color',
      dataIndex: 'hair_color',
      filterSearch: true,
      width: '15%',
    },
    {
      title: 'Birth Year',
      dataIndex: 'birth_year',
      sorter: (a, b) => a.birth_year.localeCompare(b.birth_year),
      width: '15%',
    },
    {
      title: 'Action',
      key: 'operation',
      width: '15%',
      fixed: 'rigth',
      render: (data) => <Button onClick={()=>{
        setChar( data )
        console.log( data );
        getPlanet( data.homeworld ).then( (planet)=> {
          setPlatet( planet )
          setVisible( true )
        } )
      }}>More</Button>,
    }

  ]
  // Le ponemos una key a cada elemento
  const dataSource = characters.results.map(( v, i )=> ({
    key: i, 
    ...v
  }))

  // Nos permite poner en mayusculas la letra capital de una palabra
  const capitalize = ( str ) => {
    const lower = str?.toLowerCase()
    return str?.charAt(0)?.toUpperCase() + lower?.slice(1)
  }

  return (
    <>
      <div style={{ width: '80%', margin: '1.5rem auto'}}>
        {/* Tabla */}
        <Table
          columns={columns}
          dataSource={dataSource}
          size='small'
          tableLayout='auto'
          pagination={{
            current: page,
            total: 82,
            showSizeChanger: false,
            // Cambio de la pagina
            onChange: page => setPage(page),
            position: ['bottomCenter'],
            disabled: load ? true : false
          }}
          ></Table>
      </div>
      {/* Modal que se abre al momento de dar click en el boton de More */}
      <Modal
        title={char?.name}
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width="80%"
        footer={false}
      >
        <h3>Features</h3>
        <DivDescriptionStyled>
          <DivFeatureStyled><i className="ri-cake-2-fill ri-xl"></i> {char?.birth_year}</DivFeatureStyled>
          <DivFeatureStyled><i className="ri-eye-fill ri-xl"></i> {capitalize(char?.eye_color)}</DivFeatureStyled>
          <DivFeatureStyled><i className="ri-line-height ri-xl"></i> {char?.height}</DivFeatureStyled>
          { char?.gender === 'male' 
          ? (<DivFeatureStyled><i className="ri-men-fill ri-xl"></i> {capitalize(char?.gender)}</DivFeatureStyled>)
          : char?.gender === 'female' ? (<DivFeatureStyled><i className="ri-women-fill ri-xl"></i> {capitalize(char?.gender)}</DivFeatureStyled>)
          :(<DivFeatureStyled><i className="ri-genderless-fill ri-xl"></i>{char?.gender}</DivFeatureStyled>)
          }
          <DivFeatureStyled><i className="ri-scales-2-fill ri-xl"></i> {char?.mass}</DivFeatureStyled>
          <DivFeatureStyled><i className="ri-emotion-2-fill ri-xl"></i> {capitalize(char?.skin_color)}</DivFeatureStyled>
        </DivDescriptionStyled>
        <br />
        <h3>Planet</h3>
        <DivDescriptionStyled>
        <DivFeatureStyled><i className="ri-earth-line ri-xl"></i> { platet?.name }</DivFeatureStyled>
        <DivFeatureStyled><i className="ri-compasses-2-fill ri-xl"></i> { platet?.diameter }</DivFeatureStyled>
        <DivFeatureStyled><i className="ri-drop-fill ri-xl"></i> { capitalize(platet?.climate) }</DivFeatureStyled>
        <DivFeatureStyled><i className="ri-road-map-fill ri-xl"></i> { capitalize(platet?.terrain) }</DivFeatureStyled>
        </DivDescriptionStyled>
        <br />
      </Modal>
    </>
  )
}


export default Tablecharacters