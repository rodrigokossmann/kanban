import React, {useContext, useRef} from 'react';
import {useDrop} from 'react-dnd';

import BoardContext from '../Board/context'

import { MdAdd} from 'react-icons/md'

import { Container } from './styles';
import Card from '../Card'

export default function List({data, listIndex}) {

    const ref = useRef();
    const {moveToList} = useContext(BoardContext)

    const [, dropRef] = useDrop ({
        accept: 'CARD',
        hover(item) {
            const draggedListIndex = item.listIndex;
            const targetListIndex = listIndex;
            const draggedIndex = item.index;

            if(draggedListIndex === targetListIndex) {
                return;
            }

            moveToList(draggedListIndex, targetListIndex, draggedIndex)

            item.listIndex = targetListIndex;
            item.index = data.cards.length;


        }
    });

    dropRef(ref)
    return (
        <Container done={data.done} ref={ref}>
            <header>
                <h2>{data.title}</h2>
                {data.creatable && (
                    <button type='button'>
                        <MdAdd size={24} color='#FFF'/>
                    </button>
                )}
            </header>

            <ul>
                {data.cards.map((card, index) => <Card key={card.id} index={index} data={card} listIndex={listIndex}/>)}
            </ul>
        </Container>

    );
}