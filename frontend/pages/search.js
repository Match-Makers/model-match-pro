import SearchBar from '@/components/SearchBar';
import Header from '@/components/Header';
import ModelList from '@/components/ModelList';
import Responses from '@/components/Responses';

export default function Search() {
  return (
    <>
      <Header />
      <SearchBar />
      <div className="flex">
        <ModelList />
        <Responses />
      </div>
    </>
  );
}
