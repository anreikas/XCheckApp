/* eslint-disable no-unused-vars,no-irregular-whitespace */
import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux';
import Highlighter from 'react-highlight-words';
import { SET_STATE } from './actions/types';

import { FetchReq, UrlPath, UrlConstructor } from '../../utils';
import { SERVER_URL } from '../../constants';
import 'antd/dist/antd.css';
import {
  Table, Tag, Space, Input, Button, Popconfirm, Form, Switch,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './Reviews.scss';
import './styles.scss';
import { addReview, setState, filter } from './actions';

// TODO relations tables

const textSorter = (a, b) => {
  const nameA = a.author.toLowerCase();
  const nameB = b.author.toLowerCase();

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) return 1;
  return 0; // Никакой сортировки
};
const MAX_ROWS = 5;
const START_PAGE = 1;
const Columns = [
  {
    title: 'Task-Name',
    dataIndex: 'id',
    width: '30%',
    editable: true,
    searched: true,
    sorter: textSorter,
  },
  {
    title: 'Author',
    dataIndex: 'author',
    searched: true,
    sorter: textSorter,
  },
  {
    title: 'Score',
    dataIndex: 'score',
    sorter: (a, b) => a.score - b.score,
  },
  {
    title: 'State',
    dataIndex: 'state',
    sorter: textSorter,
  },
  {
    title: 'Reviewer',
    width: '30%',
    dataIndex: 'reviewer',
    sorter: textSorter,
  },
];

const getReviews = ({ cb, pageNumber = START_PAGE, rowsLimit = MAX_ROWS }) => async (dispatch) => {
  console.log('@ : getReviews >', pageNumber);
  const reviewsUrl = UrlPath(SERVER_URL, 'reviews');
  // _page=7&_limit=20
  const url = UrlConstructor(reviewsUrl, { _page: pageNumber, _limit: rowsLimit });

  const data = await FetchReq(url);
  dispatch(setState(data));

  if (typeof cb === 'function') {
    cb();
  }
};

const Reviews = () => {
  const dataSource = useSelector((item) => item.reviewReducer);
  const dispatch = useDispatch();
  const searchInput = useRef(null);
  const searchState = useRef({
    text: '',
    column: '',
  });
  const [columns, setColumns] = useState(Columns);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const handleReset = useCallback((clearFilters) => {
    clearFilters();

    searchState.current = {
      ...searchState,
      text: '',
    };
  });
  const handleSearch = useCallback((selectedKeys, confirm, dataIndex) => {
    searchState.current = {
      text: selectedKeys[0],
      column: dataIndex,
    };
    confirm();
  });

  const getColumnSearchProps = useCallback(
    (dataIndex) => ({
      filterDropdown: ({
        setSelectedKeys, selectedKeys, confirm, clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={(node) => {
              searchInput.current = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined/>}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small"
                    style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => <SearchOutlined
        style={{ color: filtered ? '#1890ff' : undefined }}/>,
      onFilter: (value, record) => (record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : ''),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current.select(), 100);
        }
      },
      render: (handleText) => {
        const { current: { column, text } } = searchState;

        return (column === dataIndex
          ? (<Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[text]} // [this.state.searchText]
            autoEscape
            textToHighlight={handleText ? handleText.toString() : ''}
          />)
          : handleText);
      },
    }),
    [searchState],
  );

  const handleLoading = useCallback(() => {
    setLoading(!loading);
  }, [loading]);

  useEffect(() => {
    const columnsWithProps = columns.map((column) => {
      const { searched } = column;

      if (searched) {
        return {
          ...column,
          ...getColumnSearchProps(column.dataIndex),
        };
      }
      return column;
    });

    setLoading(true);

    setColumns(columnsWithProps);
  }, []);

  useEffect(() => {
    console.log(pageNumber);
    setLoading(true);
    dispatch(getReviews({
      pageNumber,
      cb: () => {
        setTimeout(setLoading.bind(false), 200);
      },
    }));
  }, [pageNumber]);

  return (
    <>
      <Form.Item label="loading">
        <Switch checked={loading} onChange={handleLoading} />
      </Form.Item>
      <Table
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        pagination={{
          total: 50,
          current: pageNumber,
          pageSize: MAX_ROWS,
          onChange: setPageNumber,
        }}
      />;
    </>
  );
};

export default Reviews;
