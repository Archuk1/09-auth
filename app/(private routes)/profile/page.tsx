import Link from 'next/link';
import css from './ProfilePage.module.css'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your personal profile, view account information, and customize your settings in the Notes App.",
  openGraph: {
    title: "Profile",
    description: "Access your profile, manage your account details, and personalize your experience in the Notes App.",
    url: "/profile",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Profile",
      },
    ],
  },
};

export default function Profile(){

    return (<main className={css.mainContent}>
  <div className={css.profileCard}>
      <div className={css.header}>
	     <h1 className={css.formTitle}>Profile Page</h1>
	     <Link href="/profile/edit" className={css.editProfileButton}>
	       Edit Profile
	     </Link>
	   </div>
     <div className={css.avatarWrapper}>
      <img
        src="Avatar"
        alt="User Avatar"
        width={120}
        height={120}
        className={css.avatar}
      />
    </div>
    <div className={css.profileInfo}>
      <p>
        Username: your_username
      </p>
      <p>
        Email: your_email@example.com
      </p>
    </div>
  </div>
</main>
)
}