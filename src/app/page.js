import Link from 'next/link'
import Button from '@mui/material/Button';
import homePage from './page.module.scss'; // Import css modules stylesheet as styles

export default function Home() {
  return (
    <main className={homePage.pageContainer}>
      <Link href="/interview-creation/step1">
        <Button className={homePage.startInterview}>Create Interview</Button>
      </Link>
    </main>
  );
}
