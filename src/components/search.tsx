import React from 'react'
import algoliasearch from 'algoliasearch/lite'
import {
  Highlight,
  Hits,
  InstantSearch,
  SearchBox,
} from 'react-instantsearch'
import { Link } from 'gatsby'
import { SearchClient } from '@algolia/client-search'

const originalSearchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APPID!,
  process.env.GATSBY_ALGOLIA_APIKEY!,
)

const searchClient = {
  ...originalSearchClient,
  search(requests: any) {
    if (requests.every(({ params }: { params: { query: string }}) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          page: 0,
          processingTimeMS: 0
        }))
      });
    }

    return originalSearchClient.search(requests);
  }
};

const Search = () => (
  <>
      <InstantSearch
        searchClient={searchClient as SearchClient}
        indexName={process.env.GATSBY_ALGOLIA_INDEXNAME!}
      >
        <SearchBox className="w-full mb-4 border-solid border-2 border-sky-500" placeholder='Search documentation'/>
        <Hits hitComponent={DefaultHitComponent} />
      </InstantSearch>
  </>
)

const DefaultHitComponent: React.FC<{ hit: any }> = ({ hit }) => (
    <div className='flex flex-col w-full'>
      <Link to={`/${hit.menu}#${hit.fungsional}`}>
        <div className='px-4 py-3.5 w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-100 hover:dark:bg-gray-900 rounded-[0.250rem] my-[0.15rem]'>
            <div className='dark:text-gray-50'>
                <span className='mr-[0.10rem] text-2xl text-indigo-500 dark:text-indigo-400'>#</span><Highlight className='font-semibold ' attribute="fungsional" hit={hit} />
            </div>
        </div>
      </Link>
    </div>
)

export default Search;
