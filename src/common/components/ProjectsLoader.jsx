import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import ProjectList from '../../js_modules/projects/ProjectList';
import { isWindow } from '../../utils';
import InfiniteScroll from './InfiniteScroll';
import { ORIGIN_HOST } from '../../utils/variables';

function ProjectsLoader({ articles, itemsPerPage, renderItem, searchQuery, options, count, fetchData, lang }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(router?.query?.page ? Number(router.query.page) : 1);

  const pagePath = options?.pagePath;
  const pathname = router?.pathname || (isWindow ? window?.location?.pathname : '');

  const loadMore = useCallback(async () => {
    if (fetchData) {
      const { data } = await fetchData(lang, currentPage + 1, router.query);
      const results = data?.results.map(
        (l) => ({ ...l, difficulty: l.difficulty?.toLowerCase() || null }),
      );
      console.log('data fetched');
      articles.push(...results);
    }
    setCurrentPage((prevPage) => prevPage + 1);
  }, [currentPage, articles]);
  const pageCount = Math.ceil(count / itemsPerPage);

  const isSearching = searchQuery.length > 0;

  const hasMore = articles.length < count && !isSearching;

  return (
    <div>
      <Head>
        <link rel="canonical" href={`${ORIGIN_HOST}${pagePath}`} />
        {currentPage - 1 > 0 && (
          <link rel="prev" href={`${pathname}?page=${currentPage - 1}`} />
        )}
        {currentPage < pageCount && (
          <link rel="next" href={`${pathname}?page=${currentPage + 1}`} />
        )}
      </Head>

      <InfiniteScroll
        data={articles}
        renderItem={renderItem}
        loadMore={loadMore}
        currentPage={currentPage}
        pageCount={pageCount}
        hasMore={hasMore}
      >
        <ProjectList
          projects={articles}
          {...options}
        />
      </InfiniteScroll>

    </div>
  );
}

ProjectsLoader.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.any])).isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  fetchData: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
  renderItem: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  searchQuery: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  options: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.any])),
};

ProjectsLoader.defaultProps = {
  options: {},
  renderItem: false,
};

export default ProjectsLoader;
