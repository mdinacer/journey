import Container from '@/components/modules/sheet/container';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`mx-auto  min-h-screen  w-screen  overflow-auto p-5  lg:container ${montserrat.className}`}
    >
      <Container />
    </main>
  );
}
