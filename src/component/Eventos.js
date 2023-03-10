import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Text, Loading } from "@nextui-org/react";
import CardEvent from './CardEvent';
import CardListas from './CardListas';
import { getList } from '../api/getList';
import { useNavigate } from "react-router-dom";
import { getEvent } from '../api/getEvent';
import { addLists, addEvents, addListsAvatar, addEventsAvatar } from '../actions';

function Eventos() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const listsState = useSelector(state => state.user.lists);
  const eventsState = useSelector(state => state.user.events);
  const listsStateAvatar = useSelector(state => state.user.listsAvatars);
  const eventsStateAvatar = useSelector(state => state.user.eventsAvatars);

  const [lists, setLists] = useState([]);
  const [listsEvent, setListsEvent] = useState([]);
  const [listsAvatares, setListsAvatares] = useState([]);
  const [listsAvataresEvent, setListsAvataresEvent] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(false);
  const [loadingListEvent, setLoadingListEvent] = useState(false);
  const [loadingEvent, setLoadingEvent] = useState(false);

  let config = {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  }

  useEffect(() => {
    if (!loadingList) {
      setLoading(true);
      getList(user.user._id, config).then((res) => {
        //cargo el array de imagenes
        let respuesta = res.data[res.data.length - 1]
        setListsAvatares(respuesta);
        //elimino el ultimo elemento del array pq son las imagenes
        let listsMenos = res.data
        listsMenos.pop();
        // setLists(listsMenos);
        dispatch(addLists(listsMenos))
        dispatch(addListsAvatar(respuesta))
        setLoading(false);
        setLoadingList(true);
      })
    }
    if (!loadingListEvent) {
      setLoadingEvent(true);
      getEvent(user.user._id, config).then((res) => {
        //cargo el array de imagenes
        let respuesta = res.data[res.data.length - 1]
        setListsAvataresEvent(respuesta);
        //elimino el ultimo elemento del array pq son las imagenes
        let listsMenos = res.data
        listsMenos.pop();
        
        dispatch(addEvents(listsMenos))
        dispatch(addEventsAvatar(respuesta))
        setLoadingEvent(false);
        setLoadingListEvent(true);
      })
    }
  }, [])

    useEffect(() => {
    if(listsState !== undefined){
      // dispatch(addListsAvatar(listsAvatares))
      setLists(listsState);
      setListsAvatares(listsStateAvatar)
    }
  }, [listsAvatares])

  useEffect(() => {
    if(listsState !== undefined){
      
      // dispatch(addEventsAvatar(listsAvataresEvent))
      setListsEvent(eventsState);
      setListsAvataresEvent(eventsStateAvatar)
    }
  }, [listsAvataresEvent])

  let loadingCond;
  if (loading) {
    loadingCond = <Loading type="points" />
  }
  let loadingCond2;
  if (loadingEvent) {
    loadingCond2 = <Loading type="points" />
  }

  return (
    <div >
      <Text
        h3
        size={30}
        color="black"
        weight="bold"
        style={{ textAlign: 'left', marginLeft: '10px' }}>
        Eventos
      </Text>

      {listsEvent.length > 0 ? (<CardEvent />) : null}

      {loadingCond2}
      <Text
        h3
        size={30}
        color="black"
        weight="bold"
        style={{ textAlign: 'left', marginLeft: '10px' }}>
        Listas
      </Text>

      {lists.length > 0 ? (lists.map((list, i) => (
        <CardListas key={i} infoList={list} avatares={listsAvatares[i]} />
      ))) : null}
      {loadingCond}
    </div>
  )
}

export default Eventos;