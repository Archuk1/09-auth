// app/notes/filter/@sidebar/default.tsx
import Link from "next/link";
import css from "./SidebarNotes.module.css"

const NotesSidebar = async () => {
  const tags = ["Work", "Personal", "Shopping", "Todo"];
  return (  
  <ul className={css.menuList}>
         <li className={css.menuItem}>
              <Link href={`/notes/filter/all`} className={css.menuLink}>All notes</Link>
          </li>
        {tags.map(tag => {
          return (
            <li key={tag} className={css.menuItem}>
              <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                {tag}
              </Link>
            </li>)})}
            
  </ul>
)
};

export default NotesSidebar;
