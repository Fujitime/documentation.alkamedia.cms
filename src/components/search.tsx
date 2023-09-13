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
      <div className="container bg-gray-200 dark:bg-gray-900 w-full mb-4 border-solid border-2 border-sky-500 flex justify-between">
         <svg width="25" height="25" className="text-indigo-700 mx-5 my-auto" viewBox="0 0 20 20">
          <path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path>
         </svg>
         <SearchBox className="flex-grow" placeholder='Search docs'/>
      </div>
        <div className='max-h-[70vh] h-auto overflow-y-auto'>
          <Hits hitComponent={DefaultHitComponent} />
        </div>
      </InstantSearch>
  </>
)

const DefaultHitComponent: React.FC<{ hit: any }> = ({ hit }) => (
    <div className='flex flex-col w-full'>
      <Link to={`/${hit.menu.replace(/(\w+)\((\w+)\)/g, "$1/$2")}#${hit.fungsional}`}>
        <div className='px-4 py-3.5 w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-100 hover:dark:bg-gray-900 rounded-[0.250rem] my-[0.15rem]'>
            <div className='dark:text-gray-50 flex justify-between'>
                <div className='text-start' >
                <span className='mr-[0.10rem] text-2xl text-indigo-500 dark:text-indigo-400'>#</span>
                <Highlight className='font-semibold ' attribute="fungsional" hit={hit} />
                </div>
                <div className="text-end">
                <svg className="" width="20" height="20" viewBox="0 0 20 20"><g stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><path d="M18 3v4c0 2-2 4-4 4H2"></path><path d="M8 17l-6-6 6-6"></path></g>
                </svg>
                </div>
            </div>
        </div>
      </Link>
    </div>
)

export default Search;
