import { Metadata } from "next";
import css from "./NotFound.module.css"

export const metadata: Metadata = {
  title: 'Page not found ',
  description: 'The page you are looking for does not exist',
  openGraph: {
    title: "Page not found",
    description: "The page you are looking for does not exist",
    url: "https://07-routing-nextjs-beta-henna.vercel.app/page-not-found",
    images: [{
      url:"https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      width: 1200,
      height: 630,
    }]
  }
};

export default function NotFound(){

    return <><h1 className={css.title}>404 - Page not found</h1>
<p className={css.description}>Sorry, the page you are looking for does not exist.</p></>

        
}