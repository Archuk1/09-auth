// components/Header/Header.tsx
'use client'
import { useAuthStore } from "@/lib/store/authStore";
import css from "./Header.module.css";
import Link from "next/link";

export default function Header() {
  const { isAuthenticated } = useAuthStore();

  return (
    <header className={css.header}>
      <Link className={css.headerLink} href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link className={css.headerLink} href="/">
              Home
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link className={css.headerLink} href="/notes/filter/All">
                  Notes
                </Link>
              </li>
              <li>
                <Link className={css.headerLink} href="/profile">
                  Profile
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className={css.headerLink} href="/sign-in">
                  Login
                </Link>
              </li>
              <li>
                <Link className={css.headerLink} href="/sign-up">
                  Sign-up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
