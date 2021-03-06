import React, {useState} from 'react';
import {useTypedSelector} from '../../hooks/useTypedSelector'
import {useActions} from '../../hooks/useActions'
import {ShowWrapper} from './ShowMore.style'

const ShowMore = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const {totalCount, products, category} = useTypedSelector(state => state.product)
  const {showMore} = useActions()

  const showMoreProducts = () => {
    setCurrentPage(currentPage + 1)
    showMore(category, products, currentPage + 1)
  }

  const pages = Math.ceil(totalCount / 12)
  return (
    <>
      {pages > 1 && pages !== currentPage
        && <ShowWrapper onClick={showMoreProducts}>
              Show More ...
          </ShowWrapper>
      }
    </>
  );
};

export default ShowMore;