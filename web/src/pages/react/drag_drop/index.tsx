import { useEffect, useState } from 'react';
import styled from 'styled-components';

const WrapperBox = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
`;

const Box = styled.li`
  width: 100px;
  height: 100px;
  background-color: pink;
  font-size: 20px;
  line-height: 100px;
  font-weight: bold;
  text-align: center;
  color: white;
  margin-right: 10px;
`;

interface IEventTarget {
  parentNode: any;
  after: any;
  before: any;
}

export default function DragDrop() {
  /**
   * ul 정보
   */
  const [isList, setIsList] = useState<HTMLUListElement | null>(null);
  /**
   * 드래그 선택한 요소
   */
  const [isPicked, setIsPicked] = useState<EventTarget | null>(null);
  /**
   * 드래그 선택한 요소의 index
   */
  const [isIndex, setIsIndex] = useState<number | null>(null);

  useEffect(() => {
    const ulElement: HTMLUListElement | null = document.querySelector('.list');
    setIsList(ulElement);

    isList?.addEventListener('dragstart', (event) => {
      const obj = event.target as typeof event.target & IEventTarget;
      setIsPicked(obj);
      if (obj) {
        setIsIndex([...obj.parentNode.children].indexOf(obj));
      }
    });

    isList?.addEventListener('dragover', (event) => {
      event.preventDefault();
    });

    isList?.addEventListener('drop', (event) => {
      const obj = event.target as typeof event.target & IEventTarget;
      if (obj) {
        const index = [...obj.parentNode.children].indexOf(obj);
        if (isIndex !== null) {
          if (index > isIndex) {
            obj.after(isPicked);
          } else {
            obj.before(isPicked);
          }
        }
      }
    });
  }, [isList, isPicked, isIndex]);

  return (
    <div>
      <WrapperBox className='list'>
        <Box draggable='true'>a</Box>
        <Box draggable='true'>p</Box>
        <Box draggable='true'>p</Box>
        <Box draggable='true'>e</Box>
        <Box draggable='true'>l</Box>
      </WrapperBox>
    </div>
  );
}
