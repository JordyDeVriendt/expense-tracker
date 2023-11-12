import {FunctionComponent, useState} from 'react';
import { PaginationControl } from 'react-bootstrap-pagination-control';

interface PaginationProps {
    page:number
    setPage: (page:number) => void
    total?: number
    limit?:number
}

const Pagination: FunctionComponent<PaginationProps> = ({page,setPage,total = 30,limit = 10}) => {

    return (
        <PaginationControl
            page={page}
            between={4}
            total={total}
            limit={limit}
            changePage={(page) => {
                setPage(page)
            }}
            ellipsis={1}
        />
    );
};

export default Pagination;
