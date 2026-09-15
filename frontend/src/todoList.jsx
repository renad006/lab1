// TodoList.jsx
import TodoItem from './TodoItem';

export default function TodoList({ todos, loading, onToggle, onRename, onRemove, filter, onFilterChange }) {
    const filterTabs = (
    <div className="filter-tabs">
      <button className={filter === 'all' ? 'active' : ''} onClick={() => onFilterChange('all')}>All</button>
      <button className={filter === 'active' ? 'active' : ''} onClick={() => onFilterChange('active')}>Active</button>
      <button className={filter === 'done' ? 'active' : ''} onClick={() => onFilterChange('done')}>Done</button>
    </div>
  );

  if (loading) return <>{filterTabs}<p className="todo-loading">Loading tasks…</p></>;

  if (todos.length === 0) {
    return <>{filterTabs}<p className="todo-empty">No tasks yet — add one above.</p></>;
  }

  const doneCount = todos.filter(t => t.done).length;

    return (
    <>
      {filterTabs}
      <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggle={onToggle}
            onRename={onRename}
            onRemove={onRemove}
          />
        ))}
      </ul>
      <div className="receipt-footer">
        <span>{todos.length} item{todos.length === 1 ? '' : 's'}</span>
        <span>{doneCount} of {todos.length} done</span>
      </div>
    </>
  );
}
