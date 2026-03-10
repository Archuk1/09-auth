"use client"

import { useRouter } from "next/navigation";
import css from "./EditProfilePage.module.css"
import Image from "next/image";
import {  FormEvent, useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { updateMe } from "@/lib/api/clientApi";

export default function EditProfile() {
    const router = useRouter();

    const { user, setUser } = useAuthStore();
    const [username, setUsername] = useState(user?.username || "");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
        const updatedUser = await updateMe({ username });
        setUser(updatedUser);
        router.push("/profile");
        } catch (error) {
        console.error("Помилка при оновленні профілю:", error);
        }
    };

    const handleCancel = () => {
        router.push("/profile");
    };

    return (
        <>
            <main className={css.mainContent}>
                <div className={css.profileCard}>
                    <h1 className={css.formTitle}>Edit Profile</h1>

                    <Image
                    src={user?.avatar || "Avatar"}
                    alt="User Avatar"
                    width={120}
                    height={120}
                    className={css.avatar}
                    />

                    <form className={css.profileInfo} onSubmit={handleSubmit}>
                    <div className={css.usernameWrapper}>
                        <label htmlFor="username">Username:</label>
                        <input id="username"
                        type="text"
                        className={css.input}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        />
                    </div>

                    <p>Email: {user?.email}</p>
                    
                    {error && <p className={css.error}>{error}</p>}

                    <div className={css.actions}>
                        <button type="submit" className={css.saveButton}>
                        Save
                        </button>
                        <button type="button" className={css.cancelButton} onClick={handleCancel}>
                        Cancel
                        </button>
                    </div>
                    </form>
                </div>
            </main>
        </>
    );
}