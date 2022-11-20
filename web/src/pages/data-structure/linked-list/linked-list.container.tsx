import { useState } from 'react';
import LinkedListUI from './linked-list.presenter';
import LinkedList from './linked-list';
import Node from './node';

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

  const renderLinkedList = (NODE: Node, length: number) => {
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
