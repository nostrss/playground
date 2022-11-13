import { Link } from 'react-router-dom';

export default function DataStructurePage() {
  return (
    <div>
      <ol>
        <Link to={{ pathname: '/data-structure/linked-list' }}>
          <li>Linked List</li>
        </Link>
      </ol>
    </div>
  );
}
