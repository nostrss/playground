interface Props {
  onChangeValue: any;
  onClickAddNode: any;
  isValue: number;
  linkedList: any;
  renderLinkedList: any;
}

export default function LinkedListUI({
  onChangeValue,
  onClickAddNode,
  isValue,
  linkedList,
  renderLinkedList,
}: Props) {
  return (
    <div>
      <input type='number' value={isValue} onChange={onChangeValue} />
      <button type='button' onClick={onClickAddNode}>
        생성
      </button>
      <div>
        {linkedList.length !== 0
          ? renderLinkedList(linkedList.head, linkedList.length)
          : ''}
      </div>
    </div>
  );
}
