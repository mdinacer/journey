import Container from '@/components/modules/sheet/container';
import SearchBar from '@/components/searchbar/search-bar';
import useSheetResize from '@/hooks/use-resize';
import useSheetData from '@/hooks/use-sheet-data';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function Home() {
  const { containerRef, isMounted } = useSheetResize();
  const { isPolling, busy } = useSheetData();

  return (
    <main
      className={`mx-auto flex h-screen w-screen  flex-col items-stretch  space-y-6  overflow-auto p-5 lg:container  lg:py-24 ${montserrat.className}`}
    >
      <div>
        <h1 className=" text-3xl font-bold">
          Your Personal Staking Calculator
        </h1>
      </div>

      <SearchBar />
      <div
        ref={containerRef}
        className="flex-auto overflow-y-auto overscroll-none pb-5"
      >
        {isMounted && <Container />}
      </div>
    </main>
  );
}
