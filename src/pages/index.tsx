import Cell from '@/components/modules/cell/cell';
import Container from '@/components/modules/sheet/container';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`container mx-auto flex min-h-screen w-screen p-24 ${inter.className}`}
    >
      <Container></Container>
    </main>
  );
}
