function Navigation({ navTitles, selected, setSelected }) {

  function renderNavItem(title) {
    const active = title === selected;
    return (
      <button key={title} className={active ? 'active' : ''} disabled={active} onClick={() => setSelected(title)}>{title}</button>
    );
  }

  return (
    <nav className="Navigation">
      {navTitles.map(renderNavItem)}
    </nav>
  )
}

export default Navigation
