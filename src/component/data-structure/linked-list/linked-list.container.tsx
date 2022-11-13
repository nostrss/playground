import { useState } from 'react';
import LinkedList from './linked-list';
import LinkedListUI from './linked-list.presenter';

export default function LinkedListContainer() {
  const [isValue, setIsValue] = useState(0);
  const [linkedList, setLinkedList] = useState(new LinkedList());

  const onChangeValue = (event: any) => {
    setIsValue(event.target.value);
  };

  const onClickAddNode = () => {
    setLinkedList(linkedList.prepend(isValue));
    setIsValue(0);
  };

  const renderLinkedList = (NODE: any, length: number) => {
    if (length === 0) return false;
    const nextNode = NODE.next;

    return (
      <div>
        <div>{NODE.value}</div>
        {renderLinkedList(nextNode, length - 1)}
      </div>
    );
  };

  return (
    <LinkedListUI
      onChangeValue={onChangeValue}
      onClickAddNode={onClickAddNode}
      isValue={isValue}
      linkedList={linkedList}
      renderLinkedList={renderLinkedList}
    />
  );
}
