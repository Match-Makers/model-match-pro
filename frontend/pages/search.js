import SearchBar from '@/components/SearchBar';
import Header from '@/components/Header';
import ModelList from '@/components/ModelList';

export default function Search() {
  return (
    <>
      <Header />
      <SearchBar />
      <div>
        <ModelList />
      </div>
    </>
  );
}
