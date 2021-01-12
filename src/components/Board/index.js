import React, {useState} from 'react';
import {loadLists} from '../../services/API';
import produce from 'immer';

import BoardContext from './context'

import { Container } from './styles';
import List from '../List';

const data = loadLists();

export default function Board() {
    const [lists, setLists] = useState(data);

    function move(fromList, toList, from, to) {
        setLists(produce(lists, draft => {
            const dragged = draft[fromList].cards[from];

            draft[fromList].cards.splice(from, 1);
            draft[toList].cards.splice(to, 0, dragged)
        }))
    }

    function moveToList(fromList, toList, from) {
        setLists(produce(lists, draft => {
            const dragged = draft[fromList].cards[from];

            draft[fromList].cards.splice(from, 1);
            draft[toList].cards.push(dragged)
        }))
    }

    return (
        <BoardContext.Provider value={{lists, move, moveToList}}>
            <Container>
                {lists.map((list, index) => <List key={list.title} listIndex={index} data={list }/>)}
            </Container>
        </BoardContext.Provider>
    );
}